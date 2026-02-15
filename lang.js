const LANG_JSON_PATH = "lang.json";

// DOM elements
const langButton = document.getElementById("lang-switch");
const translatableTextEls = document.querySelectorAll("[data-translate]");
const translatablePlaceholderEls = document.querySelectorAll(
  "[data-translate-placeholder]",
);
const translatableAltEls = document.querySelectorAll("[data-translate-alt]");
const translatableAriaEls = document.querySelectorAll("[data-translate-aria]");

//
let translations = null;
let currentLang = localStorage.getItem("language") || "en";
const original = {};

//
function captureOriginals() {
  // Text content
  translatableTextEls.forEach((el) => {
    const key = el.getAttribute("data-translate");
    if (!original[key]) original[key] = {};
    original[key].text = el.textContent.trim();
  });

  // Placeholders
  translatablePlaceholderEls.forEach((el) => {
    const key = el.getAttribute("data-translate-placeholder");
    if (!original[key]) original[key] = {};
    original[key].placeholder = el.getAttribute("placeholder") || "";
  });

  // Alt attributes
  translatableAltEls.forEach((el) => {
    const key = el.getAttribute("data-translate-alt");
    if (!original[key]) original[key] = {};
    original[key].alt = el.getAttribute("alt") || "";
  });

  // Aria-label
  translatableAriaEls.forEach((el) => {
    const key = el.getAttribute("data-translate-aria");
    if (!original[key]) original[key] = {};
    original[key].aria = el.getAttribute("aria-label") || "";
  });
}

//
function applyLanguage(lang) {
  // Text content
  translatableTextEls.forEach((el) => {
    const key = el.getAttribute("data-translate");
    const translated =
      (translations && translations[lang] && translations[lang][key]) || null;
    el.textContent =
      lang === "en"
        ? (original[key] && original[key].text) || ""
        : translated || (original[key] && original[key].text) || "";
  });

  // Placeholders
  translatablePlaceholderEls.forEach((el) => {
    const key = el.getAttribute("data-translate-placeholder");
    const translated =
      (translations && translations[lang] && translations[lang][key]) || null;
    el.setAttribute(
      "placeholder",
      lang === "en"
        ? (original[key] && original[key].placeholder) || ""
        : translated || (original[key] && original[key].placeholder) || "",
    );
  });

  // Alt attributes
  translatableAltEls.forEach((el) => {
    const key = el.getAttribute("data-translate-alt");
    const translated =
      (translations && translations[lang] && translations[lang][key]) || null;
    el.setAttribute(
      "alt",
      lang === "en"
        ? (original[key] && original[key].alt) || ""
        : translated || (original[key] && original[key].alt) || "",
    );
  });

  // Aria-label
  translatableAriaEls.forEach((el) => {
    const key = el.getAttribute("data-translate-aria");
    const translated =
      (translations && translations[lang] && translations[lang][key]) || null;
    el.setAttribute(
      "aria-label",
      lang === "en"
        ? (original[key] && original[key].aria) || ""
        : translated || (original[key] && original[key].aria) || "",
    );
  });

  // Update button
  langButtonUpdate(lang);

  localStorage.setItem("language", lang);
  currentLang = lang;
}

function langButtonUpdate(lang) {
  if (!langButton) return;
  langButton.textContent = lang === "en" ? "PT" : "EN";
}

// Fetch translations and initialize
function initTranslations() {
  if (langButton) langButton.disabled = true;

  return fetch(LANG_JSON_PATH)
    .then((resp) => {
      if (!resp.ok) throw new Error("Failed to load translations");
      return resp.json();
    })
    .then((data) => {
      translations = data;
    })
    .catch((err) => {
      console.warn("Translations could not be loaded:", err);
      translations = null;
    })
    .finally(() => {
      if (langButton) langButton.disabled = false;
    });
}

// Initialize everything on DOMContentLoaded
document.addEventListener("DOMContentLoaded", async () => {
  captureOriginals();

  await initTranslations();

  applyLanguage(currentLang);

  if (langButton) {
    langButton.addEventListener("click", () => {
      const next = currentLang === "en" ? "pt" : "en";
      applyLanguage(next);
    });
  }
});
