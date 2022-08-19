document.querySelector(".controlButton span").onclick = () => {
  let userName = prompt("What's your name ?");

  if (userName == null || userName == "") {
    document.querySelector(
      ".mainContainer .info-container .name span"
    ).innerHTML = "Unknown";
  } else {
    document.querySelector(
      ".mainContainer .info-container .name span"
    ).innerHTML = userName;
  }

  document.querySelector(".controlButton").remove();

  setTimeout(() => {
    document.querySelector(".time").classList.remove("hide");
    let Rbtn = document.getElementById("reload");
    Rbtn.onclick = () => {
      location.reload();
    };
  }, 1000 * 60);
};

let duration = 1000;
let cardsContainer = document.querySelector(".cards");

let cards = Array.from(document.querySelectorAll(".cards .card"));

let orderArr = [...Array(cards.length).keys()];

orderArr = shuffle(orderArr);

cards.forEach((card, index) => {
  card.style.order = orderArr[index];

  card.addEventListener("click", () => {
    flibCard(card);
  });
});

// flib card function

function flibCard(selectedCard) {
  selectedCard.classList.add("isFlipped");

  let allflippedCards = cards.filter((flibbedCard) =>
    flibbedCard.classList.contains("isFlipped")
  );

  if (allflippedCards.length === 2) {
    stopClicking();
    checkMatchedCards(allflippedCards[0], allflippedCards[1]);
  }
}

// stop clicking funCtion

function stopClicking() {
  cardsContainer.classList.add("no-clicking");

  setTimeout(() => {
    cardsContainer.classList.remove("no-clicking");
  }, duration);
}

// check card match

function checkMatchedCards(firstCard, secondCard) {
  let triesElement = document.querySelector(".tries span");

  if (firstCard.dataset.app === secondCard.dataset.app) {
    firstCard.classList.remove("isFlipped");
    secondCard.classList.remove("isFlipped");

    firstCard.classList.add("hasMatched");
    secondCard.classList.add("hasMatched");
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstCard.classList.remove("isFlipped");
      secondCard.classList.remove("isFlipped");
    }, duration);
  }
}

// shuffle function

function shuffle(arr) {
  let curr = arr.length,
    temp,
    random;

  while (curr > 0) {
    random = Math.floor(Math.random() * curr);
    curr--;

    temp = arr[curr];
    arr[curr] = arr[random];
    arr[random] = temp;
  }

  return arr;
}
