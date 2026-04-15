const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const siteNav = document.querySelector("[data-site-nav]");
const yearTarget = document.querySelector("[data-current-year]");
const contactForm = document.querySelector("[data-contact-form]");
const dialogButtons = document.querySelectorAll("[data-dialog-open]");
const closeButtons = document.querySelectorAll("[data-dialog-close]");

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      closeMenu();
    }
  });
}

if (header) {
  const updateHeader = () => {
    header.classList.toggle("site-header--scrolled", window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const brief = String(data.get("brief") || "").trim();

    const subjectName = name || "Portfolio inquiry";
    const lines = [
      `Name: ${name || "-"}`,
      `Email: ${email || "-"}`,
      "",
      "Project brief:",
      brief || "-"
    ];

    const mailto = `mailto:hello@humanarchitect.com?subject=${encodeURIComponent(`Inquiry from ${subjectName}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = mailto;
  });
}

dialogButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const dialogId = button.getAttribute("data-dialog-open");
    const dialog = dialogId ? document.getElementById(dialogId) : null;

    if (dialog && typeof dialog.showModal === "function") {
      dialog.showModal();
    }
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = button.closest("dialog");

    if (dialog) {
      dialog.close();
    }
  });
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const inDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;

    if (!inDialog) {
      dialog.close();
    }
  });
});
