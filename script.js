// ===================================================
// Beatriz Gonçalves — script.js
// ===================================================

(function () {
  "use strict";

  // --- HEADER SCROLL ---
  const header = document.getElementById("header");
  let lastScroll = 0;

  window.addEventListener(
    "scroll",
    () => {
      const current = window.scrollY;
      if (current > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
      lastScroll = current;
    },
    { passive: true },
  );

  // --- MENU HAMBÚRGUER ---
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  hamburger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Fechar menu ao clicar em um link
  nav.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  // Fechar menu ao clicar fora
  document.addEventListener("click", (e) => {
    if (
      nav.classList.contains("open") &&
      !nav.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      nav.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });

  // --- SCROLL SUAVE (fallback para browsers sem suporte nativo) ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerH = header.offsetHeight;
        const top =
          target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // --- INTERSECTION OBSERVER — reveal animations ---
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!prefersReduced) {
    const revealEls = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Se o usuário prefere movimento reduzido, mostrar tudo imediatamente
    document
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("visible"));
  }

  // --- ACTIVE NAV LINK (highlight conforme scroll) ---
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const active = document.querySelector(
            `.nav__link[href="#${entry.target.id}"]`,
          );
          if (active) active.classList.add("active");
        }
      });
    },
    { threshold: 0.4 },
  );

  sections.forEach((sec) => sectionObserver.observe(sec));

  // --- HOVER SCALE nas imagens de resultado ---
  // (feito via CSS :hover, mas garantindo suavidade)
  document.querySelectorAll(".result-card__img").forEach((img) => {
    img.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
  });
})();
