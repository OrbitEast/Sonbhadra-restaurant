/* Sonbhadra Restaurant: booking requests open directly in the restaurant WhatsApp chat. */
(function () {
  "use strict";
  var WHATSAPP_NUMBER = "919181779995";
  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".main-nav");
  var toggle = document.querySelector(".menu-toggle");
  var modal = document.getElementById("booking-modal");
  var form = document.getElementById("booking-form");
  var dateInput = document.getElementById("booking-date");
  var toast = document.getElementById("site-toast");
  var lastFocused = null;
  var toastTimer;

  document.querySelectorAll("[data-year]").forEach(function (node) { node.textContent = new Date().getFullYear(); });
  function localDateString(date) {
    var y = date.getFullYear(); var m = String(date.getMonth() + 1).padStart(2, "0"); var d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }
  if (dateInput) { var today = localDateString(new Date()); dateInput.min = today; dateInput.value = today; }
  function showToast(message) {
    if (!toast) return; toast.textContent = message; toast.classList.add("is-visible"); window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.classList.remove("is-visible"); }, 3600);
  }
  function openModal() {
    if (!modal) return; lastFocused = document.activeElement; modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false"); document.body.classList.add("modal-open");
    window.setTimeout(function () { var first = modal.querySelector("input"); if (first) first.focus(); }, 80);
  }
  function closeModal() {
    if (!modal) return; modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); document.body.classList.remove("modal-open");
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }
  document.querySelectorAll(".js-book").forEach(function (button) { button.addEventListener("click", openModal); });
  document.querySelectorAll("[data-close-modal]").forEach(function (element) { element.addEventListener("click", closeModal); });
  document.addEventListener("keydown", function (event) { if (event.key === "Escape" && modal && modal.classList.contains("is-open")) closeModal(); });
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); if (!form.reportValidity()) return;
      var data = new FormData(form); var dateValue = String(data.get("date") || ""); var dateLabel = dateValue;
      if (dateValue) { var parsed = new Date(dateValue + "T12:00:00"); dateLabel = parsed.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }); }
      var guestCount = Number(data.get("guests") || 1);
      var message = ["Hello Sonbhadra Restaurant, I'd like to reserve a table.", "", "Name: " + String(data.get("guestName") || "").trim(), "Phone: " + String(data.get("guestPhone") || "").trim(), "Date: " + dateLabel, "Preferred time: " + String(data.get("time") || ""), "Guests: " + guestCount, "", "Please let me know if the table is available. Thank you!"].join("\n");
      var destination = "https://wa.me/" + WHATSAPP_NUMBER.replace(/\D/g, "");
      closeModal(); showToast("Opening WhatsApp to send your reservation request…");
      window.setTimeout(function () { window.location.href = destination + "?text=" + encodeURIComponent(message); }, 280);
    });
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () { var isOpen = nav.classList.toggle("is-open"); toggle.setAttribute("aria-expanded", String(isOpen)); toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation"); });
    nav.querySelectorAll("a").forEach(function (link) { link.addEventListener("click", function () { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Open navigation"); }); });
  }
  function onScroll() { if (header) header.classList.toggle("is-scrolled", window.scrollY > 12); }
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealItems = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  else {
    var observer = new IntersectionObserver(function (entries, currentObserver) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); currentObserver.unobserve(entry.target); } }); }, { threshold: 0.12 });
    revealItems.forEach(function (item) { observer.observe(item); });
  }

  var menuChoices = document.querySelectorAll("[data-menu-choice]");
  var menuPanels = document.querySelectorAll("[data-menu-panel]");
  var restaurantToolbar = document.querySelector("[data-restaurant-toolbar]");
  var filterButtons = document.querySelectorAll("[data-filter]");
  var dishes = document.querySelectorAll(".dish-card[data-category]");
  var menuGrid = document.querySelector("[data-menu-panel=restaurant] .menu-grid");
  var menuExpandButton = null;

  function ensureMenuExpandButton() {
    if (!menuGrid || menuExpandButton) return;
    menuExpandButton = document.createElement("button");
    menuExpandButton.type = "button";
    menuExpandButton.className = "menu-expand-button";
    menuExpandButton.setAttribute("aria-expanded", "false");
    menuExpandButton.innerHTML = '<span>VIEW FULL MENU</span><b aria-hidden="true">+</b>';
    menuGrid.insertAdjacentElement("afterend", menuExpandButton);
    menuExpandButton.addEventListener("click", function () {
      var expanded = menuExpandButton.getAttribute("aria-expanded") === "true";
      menuExpandButton.setAttribute("aria-expanded", String(!expanded));
      menuExpandButton.classList.toggle("is-expanded", !expanded);
      menuExpandButton.querySelector("span").textContent = expanded ? "VIEW FULL MENU" : "SHOW LESS";
      menuExpandButton.querySelector("b").textContent = expanded ? "+" : "−";
      applyFilter(document.querySelector(".filter-tab.is-active")?.getAttribute("data-filter") || "all");
    });
  }
  function applyFilter(category) {
    var expanded = menuExpandButton && menuExpandButton.getAttribute("aria-expanded") === "true";
    var visibleMatches = [];
    dishes.forEach(function (dish) {
      var matches = category === "all" || dish.getAttribute("data-category") === category;
      if (matches) visibleMatches.push(dish);
      dish.hidden = !matches;
      dish.classList.remove("menu-collapsed-item");
    });
    if (menuExpandButton) {
      var shouldCollapse = visibleMatches.length > 4 && !expanded;
      visibleMatches.forEach(function (dish, index) { if (index >= 4 && shouldCollapse) dish.hidden = true; });
      menuExpandButton.hidden = visibleMatches.length <= 4;
    }
  }
  function selectMenu(name) {
    menuChoices.forEach(function (choice) { var selected = choice.getAttribute("data-menu-choice") === name; choice.classList.toggle("is-active", selected); choice.setAttribute("aria-pressed", String(selected)); });
    menuPanels.forEach(function (panel) { var selected = panel.getAttribute("data-menu-panel") === name; panel.hidden = !selected; panel.classList.toggle("is-active", selected); });
    if (restaurantToolbar) restaurantToolbar.hidden = name !== "restaurant";
    if (name === "restaurant") {
      filterButtons.forEach(function (button) { var selected = button.getAttribute("data-filter") === "all"; button.classList.toggle("is-active", selected); button.setAttribute("aria-pressed", String(selected)); });
      if (menuExpandButton) { menuExpandButton.setAttribute("aria-expanded", "false"); menuExpandButton.classList.remove("is-expanded"); menuExpandButton.querySelector("span").textContent = "VIEW FULL MENU"; menuExpandButton.querySelector("b").textContent = "+"; }
      applyFilter("all");
    }
  }
  ensureMenuExpandButton();
  menuChoices.forEach(function (choice) { choice.addEventListener("click", function () { selectMenu(choice.getAttribute("data-menu-choice")); }); });
  document.querySelectorAll("[data-open-bar-menu]").forEach(function (link) { link.addEventListener("click", function () { selectMenu("bar"); }); });
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var category = button.getAttribute("data-filter");
      filterButtons.forEach(function (candidate) { var selected = candidate === button; candidate.classList.toggle("is-active", selected); candidate.setAttribute("aria-pressed", String(selected)); });
      applyFilter(category);
    });
  });
  applyFilter("all");
})();