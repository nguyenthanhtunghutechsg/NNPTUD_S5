var express = require('express');
var router = express.Router();

//hostname:port/users
router.use('/users', require('./users'));
//hostname:port/api/v1/books
router.use('/api/v1/books', require('./books'));

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
module.exports = router;
