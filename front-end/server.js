"use strict"

const express = require("express");
const serveStatic = require("serve-static");

let app = express();
app.use(serveStatic(__dirname + "/dist")); /*Anything with two underscores in it makes it a global variable within the node envionrment. dirnmae spits out location(or file path) of the directory where the current the code is in. For example, in this case, spits out the directory for the file path for server.js.*/
/*index.html, and build.js are static files.
If we want index.html to be found, have to move index.html in the dist folder.*/

let port = process.env.PORT || 5000;
app.listen(port)
