var express = require("express");
var async = require("async");
var router = express.Router();
var db = require("../models");

// GET - return the user's boards page
router.get("/", function(req, res) {
    db.board.findAll().then(function(boards){
		res.render("boards/all", {boards: boards});
	});
});

// POST - create new board and add it to the boards table in the database
router.post("/", function(req, res) {
    db.board.create(req.body).then(function(createdBoard) {
	    res.redirect("/boards/" + createdBoard.id);
    }).catch(function(err){
		res.status(status).send("uh oh!", err);
	});
});

//DELETE - delete selected board and delete it from the boards table in the database
router.delete("/:id", function(req, res) {
	console.log("Delete route. ID = ", req.params.id);
	db.board.destroy({
		where: {id: req.params.id}
	}).then(function(deleted){
		console.log("deleted = ", deleted);
		res.send("success");
	}).catch(function(err){
		console.log("An error happened.", err);
		res.send("fail");
	});
});

//GET - render the page for the selected cryptocurrency
router.get("/:id", function(req, res) {
	db.board.findOne({
		where: {id: req.params.id}
	}).then(function(board){
		res.render("boards/single", {board: board});
	});
});

//GET - render the page for the for the selected board
router.get("/:title", function(req, res) {
	db.board.findOne({
		// where: {userId matches}
	}).then(function(board){
		res.render("home", {boards: boards});
	});
});

module.exports = router;