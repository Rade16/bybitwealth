const burgerCheckbox = document.getElementById("burger-checkbox");
const burgerList = document.querySelector(".header__list");
const navLinks = document.querySelectorAll(".header__list a");
const header = document.querySelector(".header");
const languageSelector = document.querySelector(".header__select");

function isMobile() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function handleBurgerMenu() {
  if (burgerCheckbox.checked) {
    burgerList.style.display = "flex";
    languageSelector.style.display = "block";
    header.style.position = "fixed";
    header.classList.add("header__active");
  } else {
    burgerList.style.display = "none";
    languageSelector.style.display = "none";
    header.style.position = "absolute";
    header.classList.remove("header__active");
  }
}

function handleNavLinks() {
  burgerCheckbox.checked = false;
  burgerList.style.display = "none";
  languageSelector.style.display = "none";
  header.style.position = "absolute";
  header.classList.remove("header__active");
}

if (isMobile()) {
  burgerCheckbox.addEventListener("change", handleBurgerMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavLinks);
  });
}

window.addEventListener("resize", function () {
  if (!isMobile()) {
    burgerCheckbox.checked = false;
    burgerList.style.display = "";
    header.style.position = "";
    languageSelector.style.display = "";
    header.classList.remove("header__active");
  }
});
