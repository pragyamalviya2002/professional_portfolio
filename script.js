// Mobile navigation: opens and closes the menu on smaller screens.
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#navLinks");

// Project filtering: lets visitors quickly view UI/UX, frontend, backend, or API work.
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

// Small feedback surface for interactions that should feel responsive.
const toast = document.querySelector("#toast");
const revealItems = document.querySelectorAll(".reveal");
const magneticButtons = document.querySelectorAll(".magnetic");
const designFingerprint = document.querySelector("#designFingerprint");

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navLinks.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter ?? "all";

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const categories = card.dataset.category ?? "";
      card.hidden = filter !== "all" && !categories.includes(filter);
    });

    showToast(filter === "all" ? "Showing all projects" : `Showing ${filter.toUpperCase()} work`);
  });
});

// Scroll reveal: adds motion only when content enters the viewport.
let revealObserver = null;

if ("IntersectionObserver" in window) {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
}

revealItems.forEach((item) => {
  if (revealObserver) {
    revealObserver.observe(item);
  } else {
    item.classList.add("visible");
  }
});

// Magnetic buttons: subtle pointer-follow animation for a more premium UI feel.
magneticButtons.forEach((button) => {
  button.addEventListener("mousemove", (event) => {
    const bounds = button.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    button.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });
});

// Originality shield: creates a lightweight visible fingerprint for the custom portfolio.
if (designFingerprint) {
  const fingerprintSource = "Pragya Malviya|Rangat Kala|GitHub Search|Dance Academy|UIUX|2026";
  let hash = 0;

  for (let index = 0; index < fingerprintSource.length; index += 1) {
    hash = (hash << 5) - hash + fingerprintSource.charCodeAt(index);
    hash |= 0;
  }

  designFingerprint.textContent = `PM-${Math.abs(hash).toString(16).toUpperCase()}-UI`;
}

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}
const form = document.getElementById("contactForm");
const result = document.getElementById("result");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  result.innerHTML = "Sending message...";

  const formData = new FormData(form);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      result.innerHTML = "✅ Message sent successfully!";
      result.style.color = "#16a34a";

      form.reset();
    } else {
      console.log(data);

      result.innerHTML = "❌ Something went wrong!";
      result.style.color = "#dc2626";
    }

  } catch (error) {
    console.log(error);

    result.innerHTML = "❌ Network error!";
    result.style.color = "#dc2626";
  }
});
/* PASTE THIS INTO YOUR SCRIPT.JS FILE */

document.addEventListener("mousemove", (e) => {
  document.documentElement.style.setProperty("--x", `${e.clientX}px`);
  document.documentElement.style.setProperty("--y", `${e.clientY}px`);
});