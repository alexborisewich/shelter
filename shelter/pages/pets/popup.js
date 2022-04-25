"use strict";
import { pets } from "./pets.js";
const popupBody = document.getElementsByClassName("popup__body");
const popup = document.createElement("div");
popup.classList.add("popup");
let script = document.querySelector("script");
document.body.insertBefore(popup, script);

function popupChange(indexOfPets) {
  popup.innerHTML = `<div class="popup__body">
    <div class="popup__image">
      <img src= "../../assets/images/pets-${pets[
        indexOfPets
      ].name.toLowerCase()}.png" alt="${pets[indexOfPets].name}" />
    </div>
    <div class="popup__content">
      <h3 class="popup__name">${pets[indexOfPets].name}</h3>
      <h4 class="popup__type-breed">${pets[indexOfPets].type} - ${
    pets[indexOfPets].breed
  }</h4>
      <h5 class="popup__description">
      ${pets[indexOfPets].description}
      </h5>
      <ul class="popup__properties">
        <li class="popup__info"><span>Age:</span> ${pets[indexOfPets].age}</li>
        <li class="popup__info"><span>Inoculations:</span> ${
          pets[indexOfPets].inoculations
        }</li>
        <li class="popup__info"><span>Diseases:</span> ${
          pets[indexOfPets].diseases
        }</li>
        <li class="popup__info"><span>Parasites:</span> ${
          pets[indexOfPets].parasites
        }</li>
      </ul>
    </div>
    <div class="popup__button">
      <span></span>
    </div>
  </div>`;
}

let cardContainer = document.querySelector(".pets__cards-container");
cardContainer.addEventListener("click", function (e) {
  let targetItem = e.target;
  if (targetItem.closest(".pets__card")) {
    let petName = targetItem.closest(".pets__card").getAttribute("data-target");
    popupOpen(petName);
  }
});

function popupOpen(petName) {
  let indexOfPets = pets.findIndex((pet) => pet.name === petName);
  popupChange(indexOfPets);
  const popupButton = document.getElementsByClassName("popup__button");
  if (popupButton) {
    popupButton[0].addEventListener("click", function (e) {
      popupClose(popupButton[0].closest(".popup"));
    });
  }
  popupBody[0].onmouseover = function () {
    popupButton[0].classList.remove("hover");
  };
  popupBody[0].onmouseout = function () {
    popupButton[0].classList.add("hover");
  };
  bodyLock();
  popup.classList.add("open");
  popup.addEventListener("click", function (e) {
    if (!e.target.closest(".popup__body")) {
      popupClose(e.target.closest(".popup"));
    }
  });
}

function popupClose() {
  popup.classList.remove("open");
  bodyUnlock();
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
  document.body.style.paddingRight = lockPaddingValue;
  document.body.classList.add("no-scroll");
}

function bodyUnlock() {
  setTimeout(() => {
    document.body.style.paddingRight = "0px";
    document.body.classList.remove("no-scroll");
  }, 500);
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const popupActive = document.querySelector(".popup.open");
    popupClose(popupActive);
  }
});
