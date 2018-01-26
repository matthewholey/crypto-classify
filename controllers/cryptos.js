var express = require("express");
var async = require("async");
var router = express.Router();
var db = require("../models");

// POST - post selected crypto to an existing board and add it to the cryptos table in the database
router.post("/boards/:id", function(req, res) {
    db.crypto.create(req.body).then(function() {
	    res.redirect("/boards/:id");
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

//DELETE - delete selected crypto and delete it from the cryptos table in the database
router.delete("/:id", function(req, res) {
	console.log("Delete route. ID = ", req.params.id);
	db.crypto.destroy({
		where: {id: req.params.id}
	}).then(function(deleted){
		console.log("deleted = ", deleted);
		res.send("success");
	}).catch(function(err){
		console.log("An error happened.", err);
		res.send("fail");
	});
});

module.exports = router;