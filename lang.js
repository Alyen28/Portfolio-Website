/**
 * Portfolio Website - Language & Translation Module
 * Manages multi-language support (English/Portuguese)
 */

const LANG_JSON_PATH = "lang.json";

// DOM elements for translation
const langButton = document.getElementById("lang-switch");
const translatableTextEls = document.querySelectorAll("[data-translate]");
const translatablePlaceholderEls = document.querySelectorAll("[data-translate-placeholder]");
const translatableAltEls = document.querySelectorAll("[data-translate-alt]");
const translatableAriaEls = document.querySelectorAll("[data-translate-aria]");

// State management
let translations = null;
let currentLang = localStorage.getItem("language") || "en";
const original = {};

// ===================================
// TRANSLATION DATA CAPTURE & STORAGE
// ===================================

/**
 * Captures original text content and attributes for fallback
 * when translations are not available
 */
function captureOriginals() {
  // Capture text content
  translatableTextEls.forEach((el) => {
    const key = el.getAttribute("data-translate");
    if (!original[key]) original[key] = {};
    original[key].text = el.textContent.trim();
  });

  // Capture placeholder attributes
  translatablePlaceholderEls.forEach((el) => {
    const key = el.getAttribute("data-translate-placeholder");
    if (!original[key]) original[key] = {};
    original[key].placeholder = el.getAttribute("placeholder") || "";
  });

  // Capture alt attributes
  translatableAltEls.forEach((el) => {
    const key = el.getAttribute("data-translate-alt");
    if (!original[key]) original[key] = {};
    original[key].alt = el.getAttribute("alt") || "";
  });

  // Capture aria-label attributes
  translatableAriaEls.forEach((el) => {
    const key = el.getAttribute("data-translate-aria");
    if (!original[key]) original[key] = {};
    original[key].aria = el.getAttribute("aria-label") || "";
  });
}

// ===================================
// TRANSLATION APPLICATION
// ===================================

/**
 * Helper function to get translated value or fallback to original
 */
function getTranslatedValue(key, prop, lang) {
  if (lang === "en") {
    return original[key]?.[prop] || "";
  }
  
  const translated = translations?.[lang]?.[key];
  return translated || original[key]?.[prop] || "";
}

/**
 * Applies language translation to all elements in the page
 * Supports text, placeholders, alt attributes, and ARIA labels
 */
function applyLanguage(lang) {
  // Apply text content translations
  translatableTextEls.forEach((el) => {
    const key = el.getAttribute("data-translate");
    el.textContent = getTranslatedValue(key, "text", lang);
  });

  // Apply placeholder translations
  translatablePlaceholderEls.forEach((el) => {
    const key = el.getAttribute("data-translate-placeholder");
    el.setAttribute("placeholder", getTranslatedValue(key, "placeholder", lang));
  });

  // Apply alt attribute translations
  translatableAltEls.forEach((el) => {
    const key = el.getAttribute("data-translate-alt");
    el.setAttribute("alt", getTranslatedValue(key, "alt", lang));
  });

  // Apply aria-label translations
  translatableAriaEls.forEach((el) => {
    const key = el.getAttribute("data-translate-aria");
    el.setAttribute("aria-label", getTranslatedValue(key, "aria", lang));
  });

  // Update language button display
  updateLangButton(lang);

  // Persist language preference
  localStorage.setItem("language", lang);
  currentLang = lang;
}

/**
 * Updates the language switch button text
 */
function updateLangButton(lang) {
  if (!langButton) return;
  langButton.textContent = lang === "en" ? "PT" : "EN";
}

// ===================================
// TRANSLATION FILE LOADING
// ===================================

/**
 * Fetches translation data from lang.json
 * @returns {Promise} resolves when translations are loaded
 */
function initTranslations() {
  if (langButton) langButton.disabled = true;

  return fetch(LANG_JSON_PATH)
    .then((resp) => {
      if (!resp.ok) throw new Error(`Failed to load translations: ${resp.status}`);
      return resp.json();
    })
    .then((data) => {
      translations = data;
    })
    .catch((err) => {
      console.warn("Translations could not be loaded. Using defaults:", err.message);
      translations = null;
    })
    .finally(() => {
      if (langButton) langButton.disabled = false;
    });
}

// ===================================
// INITIALIZATION
// ===================================

/**
 * Initializes translation system on DOM ready
 * Captures originals, loads translations, and applies current language
 */
document.addEventListener("DOMContentLoaded", async () => {
  // Step 1: Capture original content for fallback
  captureOriginals();

  // Step 2: Fetch and load translations
  await initTranslations();

  // Step 3: Apply current language
  applyLanguage(currentLang);

  // Step 4: Set up language button listener
  if (langButton) {
    langButton.addEventListener("click", () => {
      const nextLang = currentLang === "en" ? "pt" : "en";
      applyLanguage(nextLang);
    });
  }
});
