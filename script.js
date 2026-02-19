// Theme Switch
let lightmode = localStorage.getItem("lightmode");
const themeSwitch = document.getElementById("theme-switch");

const enableLightmode = () => {
  document.body.classList.add("lightmode");
  localStorage.setItem("lightmode", "active");
};

const disableLightmode = () => {
  document.body.classList.remove("lightmode");
  localStorage.setItem("lightmode", null);
};

if (lightmode === "active") enableLightmode();

themeSwitch.addEventListener("click", () => {
  lightmode = localStorage.getItem("lightmode");
  if (lightmode !== "active") {
    enableLightmode();
  } else {
    disableLightmode();
  }
});

// Scroll Progress Bar
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;

  const documentHeight = document.documentElement.scrollHeight;

  const windowHeight = window.innerHeight;

  const scrollableHeight = documentHeight - windowHeight;

  const scrollPercentage = (scrollTop / scrollableHeight) * 100;

  document.querySelector(".scroll-progress").style.width =
    scrollPercentage + "%";
});

// Hamburguer Menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("active");
});

const links = document.querySelectorAll(".nav-links a");

links.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.classList.remove("active");
  });
});

hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("active");

  if (navLinks.classList.contains("active")) {
    hamburger.textContent = "✕";
  } else {
    hamburger.textContent = "☰";
  }
});
