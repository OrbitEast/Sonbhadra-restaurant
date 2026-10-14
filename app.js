/* Sonbhadra Restaurant prototype. Add the restaurant's WhatsApp number before launch. */
(function () {
  "use strict";
  var WHATSAPP_NUMBER = ""; // International digits only, e.g. 91XXXXXXXXXX. Keep blank for WhatsApp's recipient picker.
  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".main-nav");
  var toggle = document.querySelector(".menu-toggle");
  var modal = document.getElementById("booking-modal");
  var form = document.getElementById("booking-form");
  var dateInput = document.getElementById("booking-date");
  var toast = document.getElementById("site-toast");
  var lastFocused = null;
  var toastTimer;

  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });

  function localDateString(date) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, "0");
    var d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }
  if (dateInput) {
    var today = localDateString(new Date());
    dateInput.min = today;
    dateInput.value = today;
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.classList.remove("is-visible"); }, 3600);
  }

  function openModal() {
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    window.setTimeout(function () {
      var first = modal.querySelector("input");
      if (first) first.focus();
    }, 80);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  document.querySelectorAll(".js-book").forEach(function (button) {
    button.addEventListener("click", openModal);
  });
  document.querySelectorAll("[data-close-modal]").forEach(function (element) {
    element.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal && modal.classList.contains("is-open")) closeModal();
  });

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      var dateValue = String(data.get("date") || "");
      var dateLabel = dateValue;
      if (dateValue) {
        var parsed = new Date(dateValue + "T12:00:00");
        dateLabel = parsed.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
      }
      var guestCount = Number(data.get("guests") || 1);
      var message = [
        "Hello Sonbhadra Restaurant, I'd like to reserve a table.",
        "",
        "Name: " + String(data.get("guestName") || "").trim(),
        "Phone: " + String(data.get("guestPhone") || "").trim(),
        "Date: " + dateLabel,
        "Preferred time: " + String(data.get("time") || ""),
        "Guests: " + guestCount,
        "",
        "Please let me know if the table is available. Thank you!"
      ].join("\n");
      var destination = WHATSAPP_NUMBER ? "https://wa.me/" + WHATSAPP_NUMBER.replace(/\D/g, "") : "https://wa.me/";
      var whatsappUrl = destination + "?text=" + encodeURIComponent(message);
      closeModal();
      showToast(WHATSAPP_NUMBER ? "Opening WhatsApp to send your reservation request…" : "Opening WhatsApp. Choose the restaurant chat to send your request.");
      window.setTimeout(function () { window.location.href = whatsappUrl; }, 280);
    });
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealItems = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) { observer.observe(item); });
  }

  var filterButtons = document.querySelectorAll("[data-filter]");
  var dishes = document.querySelectorAll(".dish-card[data-category]");
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var category = button.getAttribute("data-filter");
      filterButtons.forEach(function (candidate) {
        var selected = candidate === button;
        candidate.classList.toggle("is-active", selected);
        candidate.setAttribute("aria-pressed", String(selected));
      });
      dishes.forEach(function (dish) {
        dish.hidden = category !== "all" && dish.getAttribute("data-category") !== category;
      });
    });
  });
})();