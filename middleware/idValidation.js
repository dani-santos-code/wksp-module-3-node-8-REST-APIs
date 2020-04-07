const { words } = require("../data/words");

const idValidation = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const { wordId } = req.params;
  if (words.filter(word => word.id === wordId).length < 0) {
    res.status(404).json({ error: "Please enter a valid ID" });
  }
  next();
};

module.exports = { idValidation };
