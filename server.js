"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { idValidation } = require("./middleware/idValidation");

const {
  handleClient,
  handleWords,
  handleGuess,
  handleCountById
} = require("./handlers");

const PORT = process.env.PORT || 8000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .get("/clients", handleClient)
  // endpoints
  .get("/", (req, res) => {
    res.redirect("/hangman");
  })
  .get("/hangman/words", handleWords)
  .use("/hangman/:wordId", idValidation)
  .get("/hangman/:wordId", handleCountById)
  .get("/hangman/guess/:wordId/:letter", handleGuess)
  .listen(PORT, () =>
    console.log(`Listening on port ${PORT}. http://www.localhost:${PORT}`)
  );
