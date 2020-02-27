// here I am extracting a random ID so, I can later use it for the guesses as well as generate divs

const boxesWrapper = document.getElementById("boxes-wrapper");

const randomId = Math.round(Math.random() * (130 - 120) + 120).toString();

const arrValues = new Array();

const generateDivs = async randomId => {
  const response = await fetch(`/hangman/${randomId}`);
  const { letterCount } = await response.json();
  for (i = 0; i < letterCount; i++) {
    const div = document.createElement("div");
    div.classList.add("letter-box");
    boxesWrapper.appendChild(div);
  }
};

generateDivs(randomId);

const handleSubmit = async () => {
  event.preventDefault();
  const letter = document.getElementById("letter").value;
  const response = await fetch(`/hangman/guess/${randomId}/${letter}`);
  const { trueIndexes, letterCount } = await response.json();
  if (trueIndexes.length !== 0) {
    for (let i of trueIndexes) {
      arrValues[i] = true;
    }
  }
  // console.log(arrValues);
  checkWin(letterCount);
  // if (checkWin()) {
  //   console.log("YAY!!! YOU MADE IT!!");
  // }
};

const checkWin = letterCount => {
  let isWinner = false;
  const isAllTrue = currentValue => currentValue === true;
  if (arrValues.length === letterCount) {
    console.log("HERE. START CHECKING");
    isWinner = arrValues.every(isAllTrue);
  }
  if (isWinner) {
    console.log("YAY!!! YOU GOT IT!!!!!!!!");
  }
};
