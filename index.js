require("dotenv").config();
var bodyParser = require("body-parser");
var express = require("express");
var request = require("request");
var ejsLayouts = require("express-ejs-layouts");
var flash = require("connect-flash");
var isLoggedIn = require("./middleware/isLoggedIn");
var passport = require("./config/passportConfig");
var session = require("express-session");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});

app.get("/", function(req, res) {
	var coinMktCapURL = "https://api.coinmarketcap.com/v1/ticker/?limit=250";
	var symbolArr = []; //extracting coin symbols to pull from cryptoCompareURL
	request(coinMktCapURL, function(error, response, body) {
		var cryptoArr = JSON.parse(body);
		//using the key of "symbol" to retrieve each coin's symbol -the value as a string- and push it to symbolArr
		cryptoArr.forEach(function(crypto) {
			var symbol = crypto.symbol;
			symbolArr.push(symbol);
		});
		var cryptoCompareURL = "https://min-api.cryptocompare.com/data/all/coinlist";
		var cryptoDataArr = [];
		request(cryptoCompareURL, function(error, response, body) {
			var baseImageURL = JSON.parse(body).BaseImageUrl;
			var allDataObj = JSON.parse(body).Data;
			for (var i = 0; i < symbolArr.length; i++) {
				var symbol = symbolArr[i];
				if (allDataObj.hasOwnProperty(symbol)) {
					var cryptoData = Object.getOwnPropertyDescriptor(allDataObj, symbol).value;
					cryptoDataArr.push(cryptoData); 
				}
			}
			res.render("home", {cryptoArr: cryptoArr, cryptoDataArr: cryptoDataArr, baseImageURL: baseImageURL});
		});
	});
});

app.get("/profile", isLoggedIn, function(req, res) {
	res.render("profile");
});

app.use("/boards", require("./controllers/boards"));

app.use("/cryptos", require("./controllers/cryptos"));

app.use(express.static(__dirname + "/public"));

app.use("/auth", require("./controllers/auth"));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;