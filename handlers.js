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

const handleCountById = (req, res, next) => {
  const { wordId } = req.params;
  const isValidId = words.filter(word => word.id === wordId);
  if (isValidId.length > 0) {
    const [{ letterCount, hint }] = isValidId;
    res.status(200).json({ letterCount, hint });
  } else {
    res.status(404).json({ error: "Please, enter a valid ID" });
  }
};

const handleGuess = (req, res) => {
  const { wordId, letter } = req.params;
  const { word } = words.find(word => word.id === wordId);
  let guesses = [];
  //   console.log(word);
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
  res.status(200).json({ letterCount, trueIndexes });
};

module.exports = {
  handleClient,
  handleWords,
  handleGuess,
  handleCountById
};
