const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  header.classList.toggle("nav-open", !expanded);
});

navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navToggle.setAttribute("aria-expanded", "false");
    header.classList.remove("nav-open");
  }
});

const closeLightbox = () => {
  if (lightbox.open) {
    lightbox.close();
  }
  document.body.classList.remove("lightbox-open");
};

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.dataset.title;
    lightboxTitle.textContent = item.dataset.title;
    lightboxCaption.textContent = item.dataset.caption;

    if (typeof lightbox.showModal === "function") {
      lightbox.showModal();
      document.body.classList.add("lightbox-open");
    }
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("close", () => {
  document.body.classList.remove("lightbox-open");
});
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
    navToggle.setAttribute("aria-expanded", "false");
    header.classList.remove("nav-open");
  }
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

