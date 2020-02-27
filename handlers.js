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

const handleCountById = (req, res) => {
  const { wordId } = req.params;
  const [{ letterCount }] = words.filter(word => {
    if (word.id === wordId) {
      return word.letterCount;
    }
  });
  res.status(200).json({ letterCount });
};

const handleGuess = (req, res) => {
  const { wordId, letter } = req.params;
  const { word } = words.find(word => word.id === wordId);
  let guesses = [];
  console.log(word);
  const wordToArray = word.split("");
  const letterCount = word.length;
  wordToArray.forEach(char => {
    if (char === letter) {
      guesses.push(true);
    } else {
      guesses.push(false);
    }
  });
  const trueIndexes = guesses
    .map((guess, index) => {
      if (guess) {
        return index;
      }
    })
    .filter(val => val !== undefined);
  res.status(200).json({ guesses, letterCount, trueIndexes });
};

module.exports = {
  handleClient,
  handleWords,
  handleGuess,
  handleCountById
};
