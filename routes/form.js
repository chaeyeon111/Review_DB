var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('form', {
        name: 'Park Chae Yeon'
    });
});

module.exports = router;

