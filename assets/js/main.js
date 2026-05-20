(function () {
  "use strict";

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.innerHTML = isOpen ? '<i class="bi bi-x"></i>' : '<i class="bi bi-list"></i>';
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = '<i class="bi bi-list"></i>';
      });
    });
  }

  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function updateActiveLink() {
    let current = null;
    sections.forEach((section) => {
      if (section.offsetTop <= window.scrollY + 160) {
        current = section;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", current && link.getAttribute("href") === `#${current.id}`);
    });
  }

  updateActiveLink();
  document.addEventListener("scroll", updateActiveLink, { passive: true });
})();
