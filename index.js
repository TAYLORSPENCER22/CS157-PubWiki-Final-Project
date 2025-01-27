const express = require("express");
const database = require("./database.js");
const mongoose = require("mongoose");
const wikiRoutes = require("./routes/wiki.js");

const app = express();

app.use(express.static("./public"));
app.use(express.json({limit: '5mb'}));

app.use("/api/wiki", wikiRoutes);

app.listen(9000, () => console.log("Server Started on port 9000."));