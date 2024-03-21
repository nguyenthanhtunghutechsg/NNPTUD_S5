var express = require('express');
var router = express.Router();
var responseReturn = require('../helper/ResponseHandle');
const book = require('../schemas/book');
var bookModel = require('../schemas/book');

function GenID(length) {
  var result = "";
  var source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz0123456789"
  for (let index = 0; index < length; index++) {
    var random = Math.floor(Math.random() * source.length);
    result += source[random];
  }
  return result;
}

// var books = [{
//   id: 1,
//   name: "Toan lop 1"
// }, {
//   id: 2,
//   name: "Tieng viet lop 1"
// }, {
//   id: 3,
//   name: "Dao duc lop 1"
// }]


// 1 2 3    4 5 6     7 8 9    10
//limit =3 page =2->  skip 3*(2-1) = 3
//limit = 4 page =3 -> skip 4*(3-1)=
router.get('/', async function (req, res, next) {
  var queries = {};
  var arrayExclude=["limit","sort","page"];
  for (const [key,value] of Object.entries(req.query)) {
    if(!arrayExclude.includes(key)){
      queries[key] = new RegExp(value,'i');
    }
  }
  queries.isDelete = false;
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 5;
  var sort = req.query.sort?req.query.sort:{}
  var books = await bookModel.find(queries).skip(limit * (page - 1)).sort(sort).limit(limit).exec();
  responseReturn.ResponseSend(res, true, 200, books)
});

router.get('/:id', async function (req, res, next) {
  try {
    let book = await bookModel.find({ _id: req.params.id });
    responseReturn.ResponseSend(res, true, 200, book)
  } catch (error) {
    responseReturn.ResponseSend(res, false, 404, error)
  }
});

router.post('/', async function (req, res, next) {
  try {
    var newbook = new bookModel({
      name: req.body.name,
      price: req.body.price,
      author: req.body.author
    })
    await newbook.save();
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
