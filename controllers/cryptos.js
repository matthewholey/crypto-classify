var express = require('express');
var router = express.Router();
var db = require('../models');

// GET - return the user's board page
router.get('/', function(req, res) {
    db.crypto.findAll().then(function(board){
		res.render("board/pinned-cryptos", {board: board});
	});
});

// POST - receive the name of a crypto and add it to the database
router.post('/board', function(req, res) {
    db.crypto.create(req.body).then(function(req, res) {
	    res.redirect("/board/");
    }).catch(function(err){
		res.status(status).send("uh oh!", err);
	});
});

module.exports = router;