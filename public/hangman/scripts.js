// here I am extracting a random ID so, I can later use it for the guesses as well as generate divs

const boxesWrapper = document.getElementById("boxes-wrapper");
const modalDiv = document.getElementById("modal");
const randomId = Math.round(Math.random() * (130 - 120) + 120).toString();

const arrValues = new Array();
const word = [];
const generateDivs = async randomId => {
  const response = await fetch(`/hangman/${randomId}`);
  const { letterCount } = await response.json();
  for (i = 0; i < letterCount; i++) {
    const div = document.createElement("div");
    div.classList.add("letter-box");
    div.setAttribute("id", i);
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
      word[i] = letter;
      document.getElementById(i).innerText = letter;
    }
  }
  checkWin(letterCount);
};

const checkWin = letterCount => {
  let isWinner = false;
  console.log(arrValues);
  const isAllTrue = currentValue => currentValue === true;
  if (arrValues.length === letterCount && !arrValues.includes(undefined)) {
    console.log("HERE. START CHECKING");
    isWinner = arrValues.every(isAllTrue);
  }
  if (isWinner) {
    console.log("YAY!!! YOU GOT IT!!!!!!!!");
    const capitalizeFirst = word[0].toUpperCase();
    const lowerCase = word.slice(1).join("");
    modalDiv.style.display = "flex";
    modalDiv.innerText = `${capitalizeFirst + lowerCase} it is! Woohooo!!!!!🌈`;
  }
};
