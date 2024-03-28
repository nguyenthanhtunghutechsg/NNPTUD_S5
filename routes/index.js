var express = require('express');
var router = express.Router();

//hostname:port/users
router.use('/api/v1/users', require('./users'));
router.use('/api/v1/auth', require('./auth'));
//hostname:port/api/v1/books
router.use('/api/v1/books', require('./books'));
router.use('/api/v1/authors', require('./authors'));
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
module.exports = router;
