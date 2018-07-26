"use strict"

const express = require("express");
const serveStatic = require("serve-static");

let app = express();
app.use(serveStatic(__dirname + "/dist")); /*Anything with two underscores in it amkes it a global variable within thenode envionrment. dirnmae spits out location(or file path) of the directory where the current the code is in. For example, in this case, spits out the directory for the file path for server.js.*/
/*index.html, and build.js are static files.
If we want index.html to be found, have to move index.html in the dist folder.*/

let port = process.env.PORT || 3000;
 /*Does not have to match the server in the app.js file.*/

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/')
}) /*Anytime anyone makes any request send them to index.html*/
app.listen(port)
