// Lightmode / Theme Switch
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

// Progress Bar
const progressBars = document.querySelectorAll(".progress");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalWidth = target.getAttribute("data-progress") + "%";
        target.style.width = finalWidth;
        observer.unobserve(target); // animate only once
      }
    });
  },
  { threshold: 0.2 }
);

progressBars.forEach((bar) => observer.observe(bar));
