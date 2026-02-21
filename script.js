/**
 * Portfolio Website - Main JavaScript Module
 * Handles theme switching, scroll progress bar, and mobile menu
 */

// ===================================
// THEME SWITCHING FUNCTIONALITY
// ===================================

/** Track current light mode state from localStorage */
let lightmode = localStorage.getItem("lightmode");
const themeSwitch = document.getElementById("theme-switch");

/**
 * Enable light mode by adding class and updating localStorage
 */
const enableLightmode = () => {
  document.body.classList.add("lightmode");
  localStorage.setItem("lightmode", "active");
};

/**
 * Disable light mode by removing class and clearing localStorage
 */
const disableLightmode = () => {
  document.body.classList.remove("lightmode");
  localStorage.setItem("lightmode", null);
};

// Apply saved theme preference on page load
if (lightmode === "active") {
  enableLightmode();
}

// Toggle theme on button click
if (themeSwitch) {
  themeSwitch.addEventListener("click", () => {
    lightmode = localStorage.getItem("lightmode");
    if (lightmode !== "active") {
      enableLightmode();
    } else {
      disableLightmode();
    }
  });
}

// ===================================
// SCROLL PROGRESS BAR
// ===================================

/**
 * Update scroll progress bar width based on scroll position
 */
window.addEventListener("scroll", () => {
  const scrollPercentage =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  
  const progressBar = document.querySelector(".scroll-progress");
  if (progressBar) {
    progressBar.style.width = scrollPercentage + "%";
  }
});

// ===================================
// MOBILE HAMBURGER MENU
// ===================================

const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

// Toggle menu visibility on hamburger button click
if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks?.classList.toggle("active");
  });
}

// Close menu when a navigation link is clicked
document.querySelectorAll(".nav-list a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger?.classList.remove("active");
    navLinks?.classList.remove("active");
  });
});
