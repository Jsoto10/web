// Initialize Animations (AOS)
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    once: true,
    offset: 50,
  });

  // Check for saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.setAttribute("data-theme", "light");
    document
      .querySelector(".theme-toggle i")
      .classList.replace("fa-moon", "fa-sun");
  }
});

// Toggle Menu (Mobile)
function toggleMenu() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("active");
}

// Close mobile menu when clicking a link
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    const nav = document.querySelector("nav");
    nav.classList.remove("active");
  });
});

// Theme Toggle Logic
const themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", () => {
  const body = document.body;
  const icon = themeBtn.querySelector("i");

  if (body.getAttribute("data-theme") === "light") {
    body.removeAttribute("data-theme");
    icon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "dark");
  } else {
    body.setAttribute("data-theme", "light");
    icon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "light");
  }
});

// Carousel Logic
let currentSlide = 0;
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-slide");

function moveSlide(direction) {
  if (!track) return; // Guard clause if carousel missing

  const totalSlides = slides.length;
  currentSlide += direction;

  if (currentSlide >= totalSlides) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  }

  const offset = -currentSlide * 100; // %
  track.style.transform = `translateX(${offset}%)`;
}

// Auto Play Carousel
setInterval(() => {
  moveSlide(1);
}, 5000);

// Active Scroll Spy
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a:not(.btn-outline)"); // Exclude CV button

// Throttle helper
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(
        function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan),
      );
    }
  };
}

window.addEventListener(
  "scroll",
  throttle(() => {
    let current = "";
    const offset = 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - offset) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  }, 100),
);
