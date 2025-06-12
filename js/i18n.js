const availableLangs = ["en", "ru", "tr"];
const languageNames = {
  en: "EN",
  ru: "RU",
  tr: "TU",
};

let currentTranslations = {};
let currentLang = "en";

async function loadTranslations(lang) {
  try {
    const response = await fetch(`/lang/${lang}.json`);
    return await response.json();
  } catch (error) {
    console.error("Error loading translations:", error);
    return {};
  }
}

async function setLanguage(lang) {
  try {
    currentTranslations = await loadTranslations(lang);
    currentLang = lang;
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    applyTranslations();
  } catch (error) {
    console.error("Language switch failed:", error);
  }
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const keys = el.dataset.i18n.split(".");
    const value =
      keys.reduce((acc, key) => acc?.[key], currentTranslations) || "";
    el.textContent = value;
    const selectButtonText = document.getElementById("languageSelectorText");
    if (selectButtonText) {
      selectButtonText.textContent = languageNames[currentLang];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const keys = el.dataset.i18nPlaceholder.split(".");
    const value =
      keys.reduce((acc, key) => acc?.[key], currentTranslations) || "";
    el.placeholder = value;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const keys = el.dataset.i18nHtml.split(".");
    const value =
      keys.reduce((acc, key) => acc?.[key], currentTranslations) || "";
    el.innerHTML = value;
  });

  document.querySelectorAll("[data-i18n-src]").forEach((img) => {
    img.src = img.dataset.i18nSrc.replace("{lang}", currentLang);
  });

  document.querySelectorAll("[data-i18n-href]").forEach((a) => {
    const keys = a.dataset.i18nHref.split(".");
    const value =
      keys.reduce((acc, key) => acc?.[key], currentTranslations) || "#";
    a.href = value;
  });
}

function initializeLanguageSelector() {
  const langOptionsContainer = document.getElementById("languageOptions");
  const selectButton = document.getElementById("languageSelector");
  langOptionsContainer.innerHTML = "";

  availableLangs.forEach((lang) => {
    const option = document.createElement("div");
    option.className = "header__lang-option";
    option.dataset.lang = lang;
    option.textContent = languageNames[lang];
    langOptionsContainer.appendChild(option);
  });

  selectButton.addEventListener("click", (e) => {
    e.stopPropagation();
    langOptionsContainer.classList.toggle("show");
  });

  document.addEventListener("click", () => {
    langOptionsContainer.classList.remove("show");
  });

  langOptionsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("header__lang-option")) {
      const lang = e.target.dataset.lang;
      setLanguage(lang);
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const savedLang = localStorage.getItem("lang") || "en";
  await setLanguage(savedLang);
  initializeLanguageSelector();
});
