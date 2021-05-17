const express=require ('express')
const router=express.Router() ;
const users=require('../controllers/users')
const User = require('../models/user');


router.route('/')
// show all the users
.get(users.index)
// request for creating user
.post(users.createUser)
 
// create a new user
router.get('/new', users.renderNewForm)

router.route('/:id')
// show a particular user
.get(users.showUser)
// request for editing user
.put( users.editUser)
// request for deleting user
.delete( users.deleteUser)


// edit info about a particular user
router.get('/:id/edit', users.renderEditForm)
// delete a particular user
module.exports=router