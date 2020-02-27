"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const {
  handleClient,
  handleWords,
  handleGuess,
  handleCountById
} = require("./handlers");
const PORT = process.env.PORT || 8000;

express()
  .use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .get("/clients", handleClient)

  // endpoints
  .get("/hangman/words", handleWords)
  .get("/hangman/:wordId", handleCountById)
  .get("/hangman/guess/:wordId/:letter", handleGuess)
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
