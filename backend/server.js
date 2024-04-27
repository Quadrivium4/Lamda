const express = require("express");
const app = express();
const fs = require("fs");
const https = require("https");
const path = require("path")
const options = {
	key: fs.readFileSync(path.join(__dirname, './cert/key.pem')),
	cert: fs.readFileSync(path.join(__dirname, './cert/cert.pem'))
}

app.use(express.static("../frontend"))
const server = https.createServer(options, app);
server.listen(3000, ()=>{
	console.log("Server Listening on port 3000");
})

