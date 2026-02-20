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
  const scrollPercentage =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  document.querySelector(".scroll-progress").style.width =
    scrollPercentage + "%";
});

// Hamburger Menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-list a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});
