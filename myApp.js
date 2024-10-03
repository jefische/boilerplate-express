let express = require('express');
let app = express();

console.log('Hello World');

// app.get("/", (req, res) => {
// 	res.send("Hello Express");
// })

// Serve an HTML file
app.get("/", (req, res) => {
	var absolutePath = __dirname + '/views/index.html';
	res.sendFile(absolutePath);
})

// Serve Static Assets
// app.use(express.static(__dirname + "/public"));
// express.static is a middleware function or method that needs to be mounted using app.use()
app.use("/public", express.static(__dirname + "/public"));

// Serve JSON on a Specific Route



























 module.exports = app;
