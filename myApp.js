let express = require('express');
let app = express();
require('dotenv').config(); // use the .env File
let bodyParser = require('body-parser');

// FCC backend tutorial
// https://www.freecodecamp.org/learn/back-end-development-and-apis

console.log('Hello World');

// (7) Implement a root-level request logger middleware
// Middleware are functions that intercept route handlers to add information, and they need to be mounted with app.use or app.<http verb>
// app.use() will execute for all requests (unless a path is provided) or you can also set more specific conditions 
// (i.e. execute only for POST requests using app.post(<mware-function>))
app.use(function middleware(req, res, next) {
	console.log(req.method + " " + req.path + " - " + req.ip);
	next();
})

// (2) Start a working express server to serve a string via the http GET method, using a function handler.
// app.get("/", (req, res) => {
// 	res.send("Hello Express");
// })

// (3) Serve an HTML file
app.get("/", (req, res) => {
	var absolutePath = __dirname + '/views/index.html';
	res.sendFile(absolutePath);
})

// (4) Serve Static Assets
// app.use(express.static(__dirname + "/public"));
// express.static is a middleware function or method that needs to be mounted using app.use()
app.use("/public", express.static(__dirname + "/public"));


// (5) Serve JSON on a Specific Route
// (6) Additionally, use an environment variable to add a conditional uppercase to the message.
app.get("/json", (req, res) => {
	if (process.env.MESSAGE_STYLE == "uppercase") {
		res.json({"message": "HELLO JSON"});
		
	} else {
		res.json({"message": "Hello json"});
	}
	
});

// (8) Chain middleware to create a time server
app.get("/now", function(req, res, next) {
	req.time = new Date().toString();
	next();
}, function(req,res) {
	res.send({time: req.time});
})

// (9) Get route parameter input from the client
// Build an echo server, mounted at the route "GET /:word/echo"
app.get("/:word/echo", (req, res) => {
	res.send({echo: req.params.word});
})

// (10) Get query parameter input form the client
app.get("/name", (req, res) => {
	var firstName = req.query.first;
	var lastName = req.query.last; 
	// OR
	var { first: firstName, last: lastName } = req.query;

	res.json({name: `${firstName} ${lastName}`});
});

// (11) Use body-parser to parse POST requests (mounting this middleware at the root (via app.use) means this function is executed for all route requests.)
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json()); I'm not sure how this statement is used.

// (12) Get data from POST requests
app.post("/name", (req, res) => {
	var string = req.body.first + " " + req.body.last
	res.json({name: string});
})

// Combining (10) and (12) together. This makes for cleaner code by chaining method calls together for the same route.
app.route("/name").get((req, res) => {
	var { first: firstName, last: lastName } = req.query;
	res.json({name: `${firstName} ${lastName}`});
}).post((req, res) => {
	var string = req.body.first + " " + req.body.last;
	res.json({name: string});
});
















 module.exports = app;
