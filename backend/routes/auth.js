const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const selectFields = '_id firstname lastname email password usertype';
const { check, validationResult } = require('express-validator');

const User = require('../models/user');

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});


//  @route POST api/auth
// @desc  Auth user and get token
// @access PUblic
router.post(
  '/',
  [
    check('email', 'Please include a valid emial').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


// @route     PUT api/auth/:id
// @desc     Update User
// @access   Private
router.put('/:id', auth, async (req, res) => {
  const{firstname,lastname,email,password,usertype}=req.body
   const userFields = {};
  if (firstname) userFields.firstname = firstname;
  if (lastname) userFields.lastname = lastname;
  if (email) userFields.email = email;
  if (password) userFields.password = password;
  if (usertype) userFields.usertype = usertype;

  try {
    let  user = await User.findById(req.params.id) ;
    if (!user) return res.status(404).json({msg: 'User not found'});
    user = await User.findByIdAndUpdate(
      req.params.id,
      {$set: userFields},
      {new: true},
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    Delete api/auth/:id
// @desc     delete user 
// @access   Public
router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({msg: 'User not found'});

    await User.findByIdAndRemove(req.params.id);

    res.json({msg: 'User removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//  @route GET api/auth/customers
// @desc  Get customers
// @access Private
router.get('/customers', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    // restrict features to staff only
    if (user.usertype !== 'staff' && user.usertype !== 'admin') {
            return res.status(500).json({ message: `Unable to perform action, you have to be staff member!` });
        }
        else {
          // get all customers from database
            User.find({ usertype: "customer" })
                .select(selectFields)
                .exec()
                .then(customers => {
                    // wrap and return customer objects in response
                    const response = {
                        customers: customers.map(customer => {
                            return {
                                id: customer._id,
                                firstname: customer.firstname,
                                lastname: customer.lastname,
                                email: customer.email
                            }
                        })
                    }
                    res.status(200).json(response);
                })
                .catch(error => {
                    // return error if there's any
                    res.status(500).json({ message: `Unable to GET all customers!`, error: error });
                });
        }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});


module.exports = router;