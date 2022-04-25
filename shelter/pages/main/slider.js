"use strict";
import { pets } from "./pets.js";
const petsCards = document.getElementsByClassName("pets__slider-item");

const petsSlides = document.getElementsByClassName("pets__slider-items");
for (let i = petsSlides.length - 1; i >= 0; i--) {
  petsSlides[i].remove();
}

const petsSlider = document.getElementsByClassName("pets__slider-wrapper");

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

let nextStartSlideIndex = 0;
let slidesAmount;
let moveWidth;
if (
  window.matchMedia("(min-width: 768px)").matches &&
  window.matchMedia("(max-width: 1279px)").matches
) {
  slidesAmount = 1;
  moveWidth = 580;
} else if (window.matchMedia("(max-width: 767px)").matches) {
  slidesAmount = 0;
  moveWidth = 300;
} else {
  slidesAmount = 2;
  moveWidth = 1080;
}

const nextSlides = function (position) {
  let endSlideIndex = nextStartSlideIndex + slidesAmount;
  const newSlide = document.createElement("div");
  newSlide.classList.add("pets__slider-items");
  for (
    let i = nextStartSlideIndex;
    i >= nextStartSlideIndex && i <= endSlideIndex;
    i++
  ) {
    const newCard = document.createElement("div");
    newCard.classList.add("pets__slider-item");
    newCard.setAttribute("data-target", `${pets[noRepeatNumbers[i]].name}`);
    newCard.innerHTML = `<div class="pets__image">
  <img src = "../../assets/images/pets-${pets[
    noRepeatNumbers[i]
  ].name.toLowerCase()}.png" alt = ${pets[noRepeatNumbers[i]].name} />
</div>
<h4 class="pets__name">${pets[noRepeatNumbers[i]].name}</h4>
<button class="pets__item-button button">Learn more</button>`;
    newSlide.append(newCard);
    if (i == 7) {
      if (
        window.matchMedia("(min-width: 768px)").matches &&
        window.matchMedia("(max-width: 1279px)").matches
      ) {
        nextStartSlideIndex = -2;
      } else if (window.matchMedia("(max-width: 767px)").matches) {
        nextStartSlideIndex = -1;
      } else {
        i = -1;
        if (nextStartSlideIndex == 6) {
          nextStartSlideIndex = -2;
          endSlideIndex = 0;
        } else if (nextStartSlideIndex == 7) {
          nextStartSlideIndex = -1;
          endSlideIndex = 1;
        } else {
          i = -5;
          nextStartSlideIndex = -3;
          endSlideIndex = 2;
        }
      }
    }
  }
  petsSlider[0].insertAdjacentElement(position, newSlide);
};

nextSlides("beforeend");

function showNextSlides() {
  nextButton.setAttribute("disabled", "disabled");
  nextStartSlideIndex = ++nextStartSlideIndex + slidesAmount;
  nextSlides("beforeend");

  for (let card of petsCards) {
    card.style.animation = "left 1.2s";
    card.addEventListener("animationend", AnimationHandler, false);
    function AnimationHandler() {
      card.style.animation = "";
    }
  }

  for (let slide of petsSlides) {
    slide.style.animation = "next 1s";
    slide.addEventListener("animationend", AnimationHandler, false);
    function AnimationHandler() {
      slide.style.transform = `translate(${-moveWidth}px, 0)`;
      slide.style.animation = "";
      nextButton.removeAttribute("disabled");
    }
  }
  if (petsSlides.length > 2) {
    petsSlides[0].remove();
  }
  prevButton.disabled = false;
}

function showPrevSlides() {
  prevButton.setAttribute("disabled", "disabled");
  nextStartSlideIndex = ++nextStartSlideIndex + slidesAmount;
  nextSlides("afterbegin");

  for (let card of petsCards) {
    card.style.animation = "right 1s";
    card.addEventListener("animationend", AnimationHandler, false);
    function AnimationHandler() {
      card.style.animation = "";
    }
  }

  for (let slide of petsSlides) {
    slide.style.animation = "prev 0.8s";
    slide.addEventListener("animationend", AnimationHandler, false);
    function AnimationHandler() {
      slide.style.transform = `translate(0, 0)`;
      slide.style.animation = "";
      prevButton.removeAttribute("disabled");
    }
  }
  if (petsSlides.length > 2) {
    petsSlides[petsSlides.length - 1].remove();
  }
  //
}

const prevButton = document.querySelector('[data-control ="prev"]');
prevButton.addEventListener("click", showPrevSlides);

const nextButton = document.querySelector('[data-control ="next"]');
nextButton.addEventListener("click", showNextSlides);
