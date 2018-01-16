var express = require("express");
var async = require("async");
var router = express.Router();
var db = require("../models");

// POST - post selected crypto to an existing board and add it to the cryptos table in the database
router.post("/", function(req, res) {
    db.crypto.create(req.body).then(function() {
	    res.redirect("/boards/");
    }).catch(function(err){
		res.status(status).send("uh oh!", err);
	});
});

router.get("/:id", function(req, res){
	db.crypto.findOne({
		where: {id: req.params.id},
	}).then(function(board){
		res.render("/cryptos/single", {crypto: crypto});
	});
});

module.exports = router;