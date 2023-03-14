const header = document.querySelector("header");
const intro = document.querySelector("#home");
window.addEventListener("scroll", function () {
  if (window.scrollY > intro.clientHeight) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});
const toggleButton = document.querySelector(".bar");
const navLinks = document.querySelector(".nav-links");
const navLink = document.querySelectorAll(".linkk");

toggleButton.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

navLink.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});
