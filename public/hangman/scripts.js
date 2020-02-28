const boxesWrapper = document.getElementById("boxes-wrapper");
const modalDiv = document.getElementById("modal");
const randomId = Math.round(Math.random() * (130 - 120) + 120).toString();
const missesDiv = document.getElementById("misses");
let LIVES = 10;
let misses = [];

document.getElementById("counter").innerText += `Total Tries: ${LIVES}`;

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
  document.getElementById("message").innerText = "";
  const letter = document.getElementById("letter").value.toLowerCase();
  const response = await fetch(`/hangman/guess/${randomId}/${letter}`);
  const { trueIndexes, letterCount } = await response.json();
  if (trueIndexes.length !== 0) {
    for (let i of trueIndexes) {
      arrValues[i] = true;
      word[i] = letter;
      document.getElementById(i).innerText = letter;
    }
  } else {
    if (!misses.includes(letter)) {
      LIVES -= 1;
      misses.push(letter);
      const div = document.createElement("div");
      div.setAttribute("id", `miss${misses.length - 1}`);
      div.classList.add("missed-letter");
      missesDiv.appendChild(div);
      document.getElementById(`miss${misses.length - 1}`).innerText =
        misses[misses.length - 1];
    }
    // console.log(misses);
    document.getElementById("counter").innerText = `Total Tries: ${LIVES}`;
    document.getElementById("message").innerText = "Not really! Try again!";
  }
  checkEnd(letterCount);
  const form = document.getElementById("form");
  form.reset();
  document.getElementById("letter").focus();
};

const checkEnd = letterCount => {
  let isEnd = false;
  // console.log(arrValues);
  // const isAllTrue = currentValue => currentValue === true;
  if (arrValues.length === letterCount && !arrValues.includes(undefined)) {
    // console.log("HERE. START CHECKING");
    // isEnd = arrValues.every(isAllTrue);
    isEnd = true;
  }
  if (LIVES < 1) {
    modalDiv.style.display = "flex";
    modalDiv.innerText = `Holy cow!🐄You Lost All Your Lives!☠️ Better luck, next time!`;
  }
  if (isEnd) {
    // console.log("YAY!!! YOU GOT IT!!!!!!!!");
    const capitalizeFirst = word[0].toUpperCase();
    const lowerCase = word.slice(1).join("");
    modalDiv.style.display = "flex";
    modalDiv.innerText = `${capitalizeFirst + lowerCase} it is! Woohooo!!!!!🌈`;
  }
};
