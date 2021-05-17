const User = require('../models/user');

module.exports.index =  async (req, res) => {
    const users = await User.find({});
    res.json(users)
    // res.render('users/index', { users })
}

module.exports.renderNewForm= async (req, res) => {
    // res.render('users/new');
}

module.exports.createUser=  async (req, res) => {
    const user = new User(req.body.user);
    await user.save();
    // res.redirect(`/users/${user._id}`)
}

module.exports.showUser =  async (req, res,) => {
    const user = await User.findById(req.params.id)
    res.json(user) ;
    // res.render('users/show', { user });
}

module.exports.renderEditForm=async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json(user)
    // res.render('users/edit', { user });
}

module.exports.editUser=async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { ...req.body.user });
    // res.redirect(`/users/${user._id}`)
}

module.exports.deleteUser=async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    // res.redirect('/users');
}