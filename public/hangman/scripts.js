// here I am extracting a random ID so, I can later use it for the guesses as well as generate divs

const boxesWrapper = document.getElementById("boxes-wrapper");

const randomId = Math.round(Math.random() * (130 - 120) + 120).toString();

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
  const resParsed = await response.json();
  console.log(resParsed);
};
