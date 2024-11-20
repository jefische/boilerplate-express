let express = require('express');
let app = express();
require('dotenv').config(); // use the .env File

// FCC backend tutorial
// https://www.freecodecamp.org/learn/back-end-development-and-apis

console.log('Hello World');

// (7) Implement a root-level request logger middleware
// app.use() will execute for all requests (unless a path is provided) but you can set more specific conditions 
// (i.e. execute only for POST requests using app.post(<mware-function>))
app.use(function middleware(req, res, next) {
	console.log(req.method + " " + req.path + " - " + req.ip);
	next();
})
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
	const theWord = req.params;
	// res.send({echo: req.params.word});
	res.json({echo: theWord});
})





















 module.exports = app;
