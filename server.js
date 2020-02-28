"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { words } = require("./data/words");

const {
  handleClient,
  handleWords,
  handleGuess,
  handleCountById
} = require("./handlers");
const PORT = process.env.PORT || 8000;

express()
  //   .use(function(req, res, next) {
  //     res.header("Access-Control-Allow-Origin", "*");
  //     res.header(
  //       "Access-Control-Allow-Headers",
  //       "Origin, X-Requested-With, Content-Type, Accept"
  //     );
  //     next();
  //   })
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
  .use("/hangman/:wordId", (req, res, next) => {
    const { wordId } = req.params;
    if (words.filter(word => word.id === wordId).length < 0) {
      res.status(404).json({ error: "Please enter a valid ID" });
    }
    next();
  })
  .get("/hangman/:wordId", handleCountById)
  .get("/hangman/guess/:wordId/:letter", handleGuess)
  .listen(PORT, () =>
    console.log(`Listening on port ${PORT}. http://www.localhost:${PORT}`)
  );
