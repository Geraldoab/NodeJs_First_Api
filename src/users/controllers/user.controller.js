const UserModel = require('../models/user.model');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/firstApi');
}

exports.getAll = async (req, res) => {
  const userModel = mongoose.model('User', UserModel.userSchema);
  await userModel.find({}, { firstName: 1, lastName: 1, email: 1, password:1, _id: 1 }).then(result => {
    res.status(200).send(result);
  });
}

exports.deleteById = async (req, res) => {
  const userId = req.params.id;
  const userModel = mongoose.model('User', UserModel.userSchema);

  userModel.deleteOne({ id: userId }).then((result)=>{
    res.status(204).send({});
  });
}

exports.insert = async (req, res) => {

    const User = mongoose.model('User', UserModel.userSchema);
    
    const newUser = new User({
        firstName: req.body["firstName"],
        lastName: req.body["lastName"],
        email: req.body["email"],
        password: req.body["password"],
        permissionLevel: 1
    });

    await newUser.save();

    res.status(201).send();
}

exports.update = async (req, res) => {
  
}