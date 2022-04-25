"use strict";
import { pets } from "./pets.js";
const petsStaticCards = document.getElementsByClassName("pets__card");
let pageClean = function () {
  for (let i = petsStaticCards.length - 1; i >= 0; i--) {
    petsStaticCards[i].style.opacity = "0";
    petsStaticCards[i].remove();
  }
};

const petsCardContainer = document.getElementsByClassName(
  "pets__cards-container"
);

const getNoRepeatNumbers = function () {
  let numbers = [];
  for (let i = 0; i <= pets.length - 1; i++) {
    numbers.push(i);
  }
  let noRepeatNumbers = [];
  while (numbers.length > 0) {
    noRepeatNumbers.push(
      numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]
    );
  }
  return noRepeatNumbers;
};

let noRepeatNumbersArr = [];
for (let i = 0; i < 6; i++) {
  noRepeatNumbersArr.push(getNoRepeatNumbers());
}

let order = noRepeatNumbersArr.flat();

let pageCount = 1;

const buttons = document.getElementsByClassName("pets__button");
buttons[0].removeAttribute("disabled");
buttons[1].removeAttribute("disabled");
const firstPageButton = buttons[0];
firstPageButton.addEventListener("click", function () {
  pageClean();
  pageCount = 1;
  showCards();
});
const prevButton = buttons[1];
prevButton.addEventListener("click", function () {
  pageClean();
  pageCount -= 1;
  showCards();
});
const pagePointer = buttons[2];
const nextButton = buttons[3];
nextButton.addEventListener("click", function () {
  pageClean();
  pageCount += 1;
  showCards();
});
const lastPageButton = buttons[4];
lastPageButton.addEventListener("click", function () {
  pageClean();
  pageCount = order.length / display;
  showCards();
});

let display;
if (
  window.matchMedia("(min-width: 768px)").matches &&
  window.matchMedia("(max-width: 1279px)").matches
) {
  display = 6;
} else if (window.matchMedia("(max-width: 767px)").matches) {
  display = 3;
} else {
  display = 8;
}
let lastPage = order.length / display;
function showCards() {
  let currentPage = pageCount;
  let endPageCard = (order.length / lastPage) * currentPage;
  let startPageCard = endPageCard - display;
  for (let i = startPageCard; i >= startPageCard && i < endPageCard; i++) {
    function create() {
      const newCard = document.createElement("div");
      newCard.classList.add("pets__card");
      newCard.setAttribute("data-target", `${pets[order[i]].name}`);
      newCard.innerHTML = `<div class="pets__image">
  <img src = "../../assets/images/pets-${pets[
    order[i]
  ].name.toLowerCase()}.png" alt = ${pets[order[i]].name} />
</div>
<h4 class="pets__name">${pets[order[i]].name}</h4>
<button class="pets__card-button button">Learn more</button>`;
      petsCardContainer[0].insertAdjacentElement("beforeend", newCard);
      newCard.style.opacity = "0";
      setTimeout(() => (newCard.style.opacity = "1"), 300);
    }
    create();
  }
  pagePointer.textContent = `${currentPage}`;
  if (pageCount == 1) {
    firstPageButton.setAttribute("disabled", "disabled");
    prevButton.setAttribute("disabled", "disabled");
  } else {
    firstPageButton.removeAttribute("disabled");
    prevButton.removeAttribute("disabled");
  }
  if (pageCount == lastPage) {
    lastPageButton.setAttribute("disabled", "disabled");
    nextButton.setAttribute("disabled", "disabled");
  } else {
    lastPageButton.removeAttribute("disabled");
    nextButton.removeAttribute("disabled");
  }
}
pageClean();
showCards();
