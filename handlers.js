const { clients } = require("./data/clients");
const { words } = require("./data/words");

const handleClient = (req, res) => {
  const email = req.query.email;
  const user = clients.find(client => client.email === email);
  if (user) {
    res.send(user);
  } else {
    res.send(303, "Email not found on our database. :(");
  }
};

const handleWords = (req, res) => {
  if (!words) {
    res.send(404);
  }
  res.json(words);
};

const handleRandomWordId = (req, res) => {
  const randomId = Math.round(Math.random() * (130 - 120) + 120).toString();
  res.status(200).json({ randomId });
};

const handleGuess = (req, res) => {
  const { wordId, letter } = req.params;
  // query DB by wordId
  const { word } = words.find(word => word.id === wordId);
  let guesses = [];
  const wordToArray = word.split("");
  const letterCount = word.length;
  wordToArray.forEach(char => {
    if (char === letter) {
      guesses.push(true);
    } else {
      guesses.push(false);
    }
  });
  res.status(200).json({ guesses, letterCount });
};

module.exports = { handleClient, handleWords, handleGuess, handleRandomWordId };

// http://localhost:8080/clients?name=daniele

// .get("hello/:name")
// hello/bob?message=bacon
