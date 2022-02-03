function play() {
  let cardAmount = Number(document.querySelector("#cardAmount").value);
  const myNodelist = document.querySelectorAll(".memory-card");
  let i = 0;
  do {
    myNodelist[i].style.visibility = "hidden";
    i++;
  } while (i < myNodelist.length - cardAmount);
}

const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

cards.forEach((card) => card.addEventListener("click", flipCard));

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  } else {
    // second click
    hasFlippedCard = false;
    secondCard = this;
    setTimeout(checkForMatch, 500);
  }

  function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
      //is match

      firstCard.classList.add("hide");
      secondCard.classList.add("hide");
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
      prompt("JEEII, MATCH!");
    } else {
      // not match
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        prompt("TRY AGAIN");
        resetBoard();
      }, 500);
    }
  }
}

/* function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  console.log("you found match");

  isMatch ? disableCards() : unflipCards();
} */

/* function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
} */

/* function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
} */

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();
