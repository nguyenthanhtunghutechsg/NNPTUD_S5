var express = require('express');
var router = express.Router();
var responseReturn = require('../helper/ResponseHandle');
var bookModel = require('../schemas/book');
var authorModel = require('../schemas/author');
require('express-async-errors')

router.get('/', async function (req, res, next) {
  var queries = {};
  var arrayExclude = ["limit", "sort", "page"];
  for (const [key, value] of Object.entries(req.query)) {
    if (!arrayExclude.includes(key)) {
      queries[key] = new RegExp(value, 'i');
    }
  }
  queries.isDelete = false;
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 5;
  var sort = req.query.sort ? req.query.sort : {}
  var books = await bookModel.find(queries).populate({
    path: 'author', select: 'name'
  }).lean()
    .skip(limit * (page - 1)).sort(sort).limit(limit).exec();
  responseReturn.ResponseSend(res, true, 200, books)
});

router.get('/:id', async function (req, res, next) {
  // try {
  //   let book = await bookModel.find({ _id: req.params.id });
  //   responseReturn.ResponseSend(res, true, 200, book)
  // } catch (error) {
  //   responseReturn.ResponseSend(res, false, 404, error)
  // }
  let book = await bookModel.find({ _id: req.params.id });
  responseReturn.ResponseSend(res, true, 200, book)
});

router.post('/', async function (req, res, next) {
  try {
    var newbook = new bookModel({
      name: req.body.name,
      price: req.body.price,
      author: req.body.author
    })
    await newbook.save();
    var author = await authorModel.findByID(req.body.author).exec();
    author.published.push(newbook);
    await author.save();
    responseReturn.ResponseSend(res, true, 200, newbook)
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
