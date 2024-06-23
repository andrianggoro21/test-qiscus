const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
const app = new express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const messages = require("./db.json");

app.get("/messages", (req, res) => {
  res.json(messages.messages);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
