"use strict";
let burgerButton = document.createElement("div");
burgerButton.classList.add("burger__button");

const span = document.createElement("span");
burgerButton.appendChild(span);

const headerLogo = document.querySelector(".header__logo");

const burgerBody = document.querySelector(".header__menu");
burgerBody.classList.add("burger__body");

burgerBody.parentNode.insertBefore(burgerButton, headerLogo.nextSibling);
burgerButton = document.querySelector(".burger__button");

const menuLinks = document.querySelectorAll(".menu__link");
const bodyShadow = document.querySelector(".body__shadow");

if (burgerButton) {
  burgerButton.addEventListener("click", function (e) {
    burgerButton.classList.toggle("active");
    burgerBody.classList.toggle("active");
    bodyShadow.classList.toggle("active");
    headerLogo.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
    if (burgerBody.contains(headerLogo)) {
      burgerBody.parentNode.prepend(headerLogo);
      headerLogo.classList.remove("burger__logo");
      burgerButton.parentNode.classList.remove("hidden");
    } else {
      setTimeout(() => {
        burgerBody.prepend(headerLogo);
        headerLogo.classList.add("burger__logo");
        burgerButton.parentNode.classList.add("hidden");
      }, 50);
    }
    burgerButton.onclick = function () {
      burgerButton.classList.toggle("inactive");
      burgerBody.classList.toggle("inactive");
    };
  });
}

menuLinks.forEach((menuLink) => {
  menuLink.addEventListener("click", onMenuLinkOrBodyShadowClick);
});
bodyShadow.addEventListener("click", onMenuLinkOrBodyShadowClick);
function onMenuLinkOrBodyShadowClick(e) {
  if (burgerBody.classList.contains("active")) {
    document.body.classList.remove("no-scroll");
    burgerButton.classList.remove("active");
    burgerBody.classList.remove("active");
    burgerButton.classList.add("inactive");
    burgerBody.classList.add("inactive");
    bodyShadow.classList.remove("active");
    burgerBody.parentNode.prepend(headerLogo);
    headerLogo.classList.remove("burger__logo");
    headerLogo.classList.remove("active");
    burgerButton.parentNode.classList.remove("hidden");
    menuLinks[1].onclick = function (event) {
      event.preventDefault();
    };
  }
}
