/**
 * QIANFY TRADE - Main JavaScript
 */

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const links = navLinks.querySelectorAll("a");
  const fadeElements = document.querySelectorAll(".fade-in");

  // --- Navbar scroll shadow ---
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // --- Mobile hamburger menu ---
  hamburger.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Close mobile menu on link click
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  // Close mobile menu on outside click
  document.addEventListener("click", function (e) {
    if (!navbar.contains(e.target) && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });

  // --- Scroll-triggered fade-in animations ---
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  // --- Active nav link highlighting ---
  function updateActiveLink() {
    var scrollPos = window.scrollY + 150;
    var currentId = "";

    links.forEach(function (link) {
      var section = document.querySelector(link.getAttribute("href"));
      if (section && section.offsetTop <= scrollPos) {
        currentId = link.getAttribute("href");
      }
    });

    links.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === currentId) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();
});
