var express = require('express');
var router = express.Router();
var userModel = require('../schemas/user')
var ResHelper = require('../helper/ResponseHandle');

router.get('/', async function (req, res, next) {
  let users = await userModel.find({}).exec();
  ResHelper.ResponseSend(res, true,200, users)
});

router.get('/:id', async function (req, res, next) {
  try {
    let user = await userModel.find({ _id: req.params.id }).exec();
    ResHelper.RenderRes(res, true,200, user)
  } catch (error) {
    ResHelper.ResponseSend(res, false,404, error)
  }
});

router.post('/',  async function (req, res, next) {
  try {
    var newUser = new userModel({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    })
    await newUser.save();
    ResHelper.ResponseSend(res, true,200, newUser)
  } catch (error) {
    ResHelper.ResponseSend(res, false,404, error)
  }
});
router.put('/:id', async function (req, res, next) {
  try {
    let user = await userModel.findById
      (req.params.id).exec()
    user.email = req.body.email;
    await user.save()
    ResHelper.ResponseSend(res, true,200, user);
  } catch (error) {
    ResHelper.ResponseSend(res, false,404, error)
  }
});


router.delete('/:id', async function (req, res, next) {
  try {
    let user = await userModel.findByIdAndUpdate
      (req.params.id, {
        status: false
      }, {
        new: true
      }).exec()
    ResHelper.ResponseSend(res, true,200, user);
  } catch (error) {
    ResHelper.ResponseSend(res, false,404, error)
  }
});

module.exports = router;
