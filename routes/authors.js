var express = require('express');
var router = express.Router();
var responseReturn = require('../helper/ResponseHandle');
var authorModel = require('../schemas/author');

router.get('/', async function (req, res, next) {
  var authors = await authorModel.find({}).populate('published').exec();
  responseReturn.ResponseSend(res, true, 200, authors)
});

router.get('/:id', async function (req, res, next) {
  try {
    let author = await authorModel.find({ _id: req.params.id });
    responseReturn.ResponseSend(res, true, 200, author)
  } catch (error) {
    responseReturn.ResponseSend(res, false, 404, error)
  }
});

router.post('/', async function (req, res, next) {
  try {
    var newAuthor = new authorModel({
      name: req.body.name,
    })
    await newAuthor.save();
    responseReturn.ResponseSend(res, true, 200, newAuthor)
  } catch (error) {
    responseReturn.ResponseSend(res, true, 404, error)
  }
})

router.put('/:id', async function (req, res, next) {
  try {
    let book = await bookModel.findByIdAndUpdate(req.params.id, req.body,
      {
        new: true
      });
    responseReturn.ResponseSend(res, true, 200, book)
  } catch (error) {
    responseReturn.ResponseSend(res, true, 404, error)
  }
})
router.delete('/:id', async function (req, res, next) {
  try {
    let book = await bookModel.findByIdAndUpdate(req.params.id, {
      isDelete: true
    }, {
      new: true
    });
    responseReturn.ResponseSend(res, true, 200, book)
  } catch (error) {
    responseReturn.ResponseSend(res, true, 404, error)
  }
})

module.exports = router;
