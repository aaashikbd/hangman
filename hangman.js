const keys = document.querySelector(".keys");
const display = document.querySelector(".display");
const displayHint = document.getElementById("hint-text");
const category = document.getElementById("cat-text");
const displayLife = document.getElementById("life-counter");
const Result = document.getElementById("result");
const Try = document.getElementById("try");
let myWord = "";
let guessedWord = [];
let life = 10;
const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const items = [
  {
    name: "nun",
    cat: "film",
    hint: "best american horror movie prequel of conjuring",
  },
  {
    name: "conjuring",
    cat: "film",
    hint: "superhit horror based on true story",
  },
  {
    name: "crash landing on you",
    cat: "Series",
    hint: "A South korean women accidently fall in North Korea.",
  },
];

// random word generator

function randomWord() {
  const choose = Math.floor(Math.random() * items.length);
  myWord = items[choose].name;
  const hint = items[choose].hint;
  const cat = items[choose].cat;
  // display hint
  displayHint.textContent = '"' + hint + '"';

  //category

  category.textContent = cat;

  // display life
  displayLife.textContent = life;

  // create black space
  Array.from(myWord).forEach((l) => {
    if (l === " ") {
      display.innerHTML += "<span class='char'>" + l + "</span>";
    } else {
      display.innerHTML += "<span class='char'>_</span>";
    }
  });
} // random function end

randomWord();

// click action
keys.addEventListener("click", (e) => {
  const k = e.target;
  const guess = k.textContent;
  const displayedWord = display.textContent;
  const ele = document.querySelector(".display");
  let myWordArr = myWord.match(/[a-z]/g).join("").split("").length;

  if (life > 0) {
    if (k.matches("button")) {
      if (myWord.includes(guess)) {
        for (let i = 0; i < myWord.length; i++) {
          if (myWord[i] === guess) {
            ele.children[i].textContent = guess;
            k.disabled = true;
            k.classList.add("marked");
            guessedWord.push(guess);
            if (guessedWord.length === myWordArr) {
              Result.textContent = "Correct!";
              Result.style.color = "green";
              display.style.color = "green";
              Try.classList.remove("hide");
              Try.textContent = "Play Again";
            }
          }
        }
      } else {
        // if user put wrong letter
        k.disabled = true;
        k.classList.add("marked");
        life--;
        displayLife.textContent = life;
        if (life < 1) {
          Result.textContent = "You Failed!";
          Result.style.color = "red";
          Try.classList.remove("hide");
          Try.textContent = "Try Again";
        }
      }
    } // button click
  }
});

// generate keys
function keyGenerator() {
  for (let i = 0; i < letters.length; i++) {
    const key = document.createElement("button");
    key.setAttribute("class", "key");
    key.textContent = letters[i];
    keys.appendChild(key);
  }
}
keyGenerator();

// Try again button

Try.addEventListener("click", (e) => {
  window.location.reload();
});
