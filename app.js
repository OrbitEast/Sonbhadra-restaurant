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

  // Privacy-friendly language preference: save only English/Hindi choice on this device.
  var enToHi = {"GOOD FOOD · BIG CRAVINGS · GOOD TIMES":"अच्छा खाना · बड़ी क्रेविंग्स · अच्छे पल","SONBHADRA · UTTAR PRADESH":"सोनभद्र · उत्तर प्रदेश","Explore Menus":"मेन्यू देखें","Our Story":"हमारी कहानी","Gallery":"गैलरी","Find Us":"हमसे मिलें","Book a Table":"टेबल बुक करें","COME HUNGRY · LEAVE HAPPY":"भूख लेकर आएँ · खुश होकर जाएँ","Big flavours.":"ज़बरदस्त स्वाद।","Happy cravings.":"हर क्रेविंग का जवाब।","From satisfying food favourites and crispy bites to refreshing drinks, find something that hits the spot—then make a table of it.":"मनपसंद खाने और कुरकुरे स्नैक्स से लेकर ताज़ा ड्रिंक्स तक—अपनी पसंद चुनें और टेबल बुक करें।","Find your craving":"अपनी पसंद चुनें","01 — YOUR NEXT CRAVING STARTS HERE":"01 — आपकी अगली क्रेविंग यहीं से शुरू","SEE THE MENU":"मेन्यू देखें","COME":"आइए","HUNGRY":"भूख के साथ","& HAPPY":"और खुश होकर","Find your favourite":"अपनी पसंद चुनें","Indian meals, hearty plates & quick bites":"भारतीय भोजन, भरपूर प्लेटें और झटपट स्नैक्स","Something to sip":"कुछ ताज़ा पिएँ","Refreshing drinks and bar favourites":"ताज़ा ड्रिंक्स और बार की पसंद","Make it a meal":"इसे पूरा भोजन बनाएँ","Pick your dishes, then book a table":"डिश चुनें और टेबल बुक करें","WHAT SOUNDS GOOD?":"आज क्या खाने का मन है?","Something delicious":"कुछ स्वादिष्ट","is calling.":"आपको बुला रहा है।","Start with a dish you love, add a drink or two, and book a table when you’re ready.":"अपनी पसंद की डिश चुनें, साथ में ड्रिंक लें और तैयार हों तो टेबल बुक करें।","01 / THE KITCHEN":"01 / रसोई से","Restaurant Menu":"रेस्टोरेंट मेन्यू","Indian favourites, hearty plates & casual bites.":"भारतीय पसंदीदा डिश, भरपूर भोजन और हल्के स्नैक्स।","EXPLORE FOOD MENU":"खाने का मेन्यू देखें","02 / THE BAR":"02 / बार","Bar Menu":"बार मेन्यू","Signature drinks, refreshing coolers & small plates.":"खास ड्रिंक्स, ताज़ा कूलर्स और छोटी प्लेटें।","EXPLORE DRINKS MENU":"ड्रिंक्स का मेन्यू देखें","All favourites":"सभी पसंदीदा","Vegetarian":"शाकाहारी","Non-vegetarian":"मांसाहारी","Quick bites":"झटपट स्नैक्स","PREVIEW MENU · DETAILS TO CONFIRM":"मेन्यू प्रीव्यू · विवरण की पुष्टि बाकी","VEGETARIAN":"शाकाहारी","NON-VEG":"मांसाहारी","FAST BITES":"झटपट स्नैक्स","Silky tomato gravy, warming spices, a finish of cream.":"मुलायम टमाटर की ग्रेवी, खुशबूदार मसाले और क्रीम।","Slow-simmered comfort with a deep, aromatic masala.":"धीमी आँच पर पका मसालेदार और खुशबूदार स्वाद।","Crisp base, colourful toppings, and a generous melt.":"कुरकुरा बेस, रंगीन टॉपिंग और भरपूर चीज़।","A comforting spread of seasonal favourites and sides.":"मौसमी पसंदीदा डिश और साथ में स्वादिष्ट साइड्स।","Crunchy, savoury, and made for sharing at the table.":"कुरकुरे, चटपटे और सबके साथ बाँटकर खाने के लिए।","Toasted until golden, layered with a fresh, hearty filling.":"सुनहरा टोस्ट, ताज़ा और भरपूर फिलिंग के साथ।","Sample dishes and prices are for design preview only. Final items and prices will be confirmed with the restaurant.":"डिश और कीमतें केवल वेबसाइट प्रीव्यू के लिए हैं। अंतिम मेन्यू और कीमतों की पुष्टि रेस्टोरेंट से होगी।","01 · SIGNATURE SERVE":"01 · खास ड्रिंक","02 · ZERO PROOF":"02 · बिना अल्कोहल","03 · HOUSE FAVOURITE":"03 · हाउस फेवरेट","04 · CLASSIC STYLE":"04 · क्लासिक अंदाज़","05 · REFRESHING":"05 · ताज़गी भरा","06 · TO SHARE":"06 · सबके साथ बाँटें","Bright citrus, botanical notes and a fresh finish.":"सिट्रस की ताज़गी और हल्की हर्बल खुशबू।","Fresh mint, lime and a clean, cooling finish.":"ताज़ा पुदीना, नींबू और ठंडक भरा स्वाद।","A sparkling, fruit-forward serve for slow evenings.":"शाम के लिए फलदार और हल्का स्पार्कलिंग ड्रिंक।","A rich, spirit-forward classic with a citrus aroma.":"सिट्रस की खुशबू वाला क्लासिक ड्रिंक।","Tropical fruit notes with a bright, refreshing finish.":"ट्रॉपिकल फलों का स्वाद और ताज़गी भरा एहसास।","A sample selection of crunchy, savoury bites.":"कुरकुरे और चटपटे स्नैक्स का नमूना चयन।","· sample price":"· नमूना कीमत","Illustrative menu only. Drinks, prices and availability must be confirmed. Alcohol service is subject to applicable local laws and age requirements.":"यह केवल नमूना मेन्यू है। ड्रिंक्स, कीमत और उपलब्धता की पुष्टि बाकी है। अल्कोहल की बिक्री स्थानीय कानून और आयु-सीमा के अधीन है।","Pick your mood. We’ll take care of the table.":"अपना मूड चुनें, टेबल की तैयारी हम करेंगे।","THE ART OF MAKING ROOM":"आपका स्वागत, हमारी पहचान","SONBHADRA, INDIA":"सोनभद्र, भारत","A LITTLE ABOUT US":"हमारे बारे में","Come for the food.":"खाने के लिए आइए।","Stay for the feeling.":"यादगार एहसास लेकर जाइए।","The best meals bring people together. Pick a favourite, order something new for the table, and settle in for good food and easy conversation.":"अच्छा खाना लोगों को साथ लाता है। अपनी पसंद चुनें, कुछ नया ऑर्डर करें और स्वादिष्ट खाने व अच्छी बातचीत का आनंद लें।","Sonbhadra Restaurant brings the menu, the drinks and the company together in one welcoming place.":"सोनभद्र रेस्टोरेंट में स्वादिष्ट भोजन, ड्रिंक्स और अपनों के साथ बिताए पल एक जगह मिलते हैं।","Get to know us":"हमारे बारे में जानें","LOOKS GOOD. TASTES BETTER.":"दिखने में शानदार, स्वाद में बेहतरीन।","Which one are you":"आप किस चीज़ के","craving?":"दीवाने हैं?","A preview of the kind of food and moments this website is designed to celebrate.":"यह वेबसाइट खाने और साथ बिताए अच्छे पलों की एक झलक दिखाती है।","THE FIRST BITE":"पहला निवाला","FRESHLY MADE":"ताज़ा तैयार","MADE TO SHARE":"सबके साथ बाँटें","Preview photography only. Actual restaurant photos can be added before launch.":"ये केवल प्रीव्यू तस्वीरें हैं। लॉन्च से पहले रेस्टोरेंट की असली तस्वीरें जोड़ी जा सकती हैं।","GOOD FOOD IS BETTER TOGETHER":"अच्छा खाना, अपनों के साथ और बेहतर","Got a craving?":"कुछ स्वादिष्ट खाने का मन है?","Make a plan.":"तो प्लान बनाइए।","Lunch, dinner or an evening with your favourite people—choose your moment and reserve a table for it.":"लंच, डिनर या अपनों के साथ शाम—अपना समय चुनें और टेबल रिज़र्व करें।","A BETTER KIND OF GATHERING · 02":"बेहतरीन साथ · 02","YOUR NEXT GOOD EVENING":"आपकी अगली यादगार शाम","Find your way":"अपना रास्ता खोजें","to the table.":"अपनी टेबल तक।","Come for a meal, stay for a drink—or make a whole evening of it. Tap below for directions. We’ll replace this temporary area with the restaurant’s exact Google Maps link before launch.":"खाने के लिए आएँ, ड्रिंक के साथ रुकें या पूरी शाम बिताएँ। रास्ता देखने के लिए नीचे टैप करें। सही लोकेशन मिलने पर यह अस्थायी लिंक बदला जाएगा।","TEMPORARY AREA · TO BE CONFIRMED":"अस्थायी क्षेत्र · पुष्टि बाकी","Robertsganj, Sonbhadra, Uttar Pradesh":"रॉबर्ट्सगंज, सोनभद्र, उत्तर प्रदेश","Get Directions":"रास्ता देखें","This opens Google Maps for an approximate town-level destination, not the restaurant’s verified address.":"यह Google Maps पर शहर की अनुमानित लोकेशन खोलेगा, रेस्टोरेंट का सत्यापित पता नहीं।","OPEN IN GOOGLE MAPS":"GOOGLE MAPS में खोलें","Robertsganj":"रॉबर्ट्सगंज","UTTAR PRADESH, INDIA":"उत्तर प्रदेश, भारत","GET DIRECTIONS":"रास्ता देखें","RESTAURANT & BAR":"रेस्टोरेंट और बार","Thoughtful food.":"स्वादिष्ट भोजन।","Warm welcomes.":"दिल से स्वागत।","Room for everyone.":"सबके लिए जगह।","EXPLORE":"एक्सप्लोर करें","ORDER ONLINE":"ऑनलाइन ऑर्डर","Search on Zomato ↗":"Zomato पर खोजें ↗","Search on Swiggy ↗":"Swiggy पर खोजें ↗","CONTACT & VISIT":"संपर्क और लोकेशन","Phone / WhatsApp":"फोन / WhatsApp","To be confirmed":"पुष्टि बाकी","Address":"पता","Temporary area only":"अस्थायी लोकेशन","Opening hours":"खुलने का समय","Get directions ↗":"रास्ता देखें ↗","YOUR TABLE IS CALLING":"आपकी टेबल आपका इंतज़ार कर रही है","Make your next meal a moment to remember.":"अपने अगले भोजन को यादगार पल बनाएँ。","MADE FOR GOOD GATHERINGS":"अच्छे पलों के लिए बनाया गया","BACK TO TOP ↑":"ऊपर जाएँ ↑","Website preview · Sample menu, prices, photos and approximate location must be confirmed before launch.":"वेबसाइट प्रीव्यू · लॉन्च से पहले मेन्यू, कीमत, तस्वीरों और लोकेशन की पुष्टि ज़रूरी है।","A PLACE FOR YOU":"आपके लिए एक जगह","Let's save you":"आइए, आपके लिए","a table.":"टेबल बुक करें।","Share a few details. We'll prepare a WhatsApp message for the restaurant so you can confirm your reservation directly.":"कुछ जानकारी भरें। हम रेस्टोरेंट के लिए WhatsApp संदेश तैयार करेंगे ताकि आप सीधे बुकिंग की पुष्टि कर सकें।","Your name":"आपका नाम","Phone number":"फोन नंबर","Date":"तारीख","Preferred time":"पसंदीदा समय","Choose a time":"समय चुनें","12:00 PM":"दोपहर 12:00","12:30 PM":"दोपहर 12:30","1:00 PM":"दोपहर 1:00","1:30 PM":"दोपहर 1:30","2:00 PM":"दोपहर 2:00","6:00 PM":"शाम 6:00","6:30 PM":"शाम 6:30","7:00 PM":"शाम 7:00","7:30 PM":"शाम 7:30","8:00 PM":"रात 8:00","8:30 PM":"रात 8:30","9:00 PM":"रात 9:00","Number of guests":"मेहमानों की संख्या","1 guest":"1 मेहमान","2 guests":"2 मेहमान","3 guests":"3 मेहमान","4 guests":"4 मेहमान","5 guests":"5 मेहमान","6 guests":"6 मेहमान","7 guests":"7 मेहमान","8 guests":"8 मेहमान","9 guests":"9 मेहमान","10 guests":"10 मेहमान","Send on WhatsApp":"WhatsApp पर भेजें","Your booking is confirmed directly with the restaurant on WhatsApp.":"आपकी बुकिंग की पुष्टि रेस्टोरेंट WhatsApp पर सीधे करेगा।","Let's find you a seat.":"आइए, आपके लिए सीट ढूँढें।","Book Now":"अभी बुक करें","The Menu":"मेन्यू","DINING · BAR · GOOD COMPANY.":"डाइनिंग · बार · अच्छा साथ","Switch language to Hindi":"भाषा हिंदी में बदलें","Switch language to English":"भाषा अंग्रेज़ी में बदलें"};
  var hiToEn = Object.keys(enToHi).reduce(function (out, key) { out[enToHi[key]] = key; return out; }, {});
  var languageToggle = document.querySelector("[data-language-toggle]");
  var currentLanguage = "en";
  var originalTextNodes = new WeakMap();
  function translatePage(language) {
    currentLanguage = language === "hi" ? "hi" : "en";
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      if (languageToggle && languageToggle.contains(node)) return;
      if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
      var original = originalTextNodes.get(node);
      var trimmed = original.trim();
      if (!trimmed) return;
      var translated = currentLanguage === "hi" ? (enToHi[trimmed] || trimmed) : trimmed;
      var startSpace = original.match(/^\s*/)[0];
      var endSpace = original.match(/\s*$/)[0];
      node.nodeValue = startSpace + translated + endSpace;
    });
    document.documentElement.lang = currentLanguage === "hi" ? "hi" : "en";
    if (languageToggle) {
      languageToggle.textContent = currentLanguage === "hi" ? "English" : "हिन्दी";
      languageToggle.setAttribute("aria-label", currentLanguage === "hi" ? "Switch language to English" : "Switch language to Hindi");
      languageToggle.setAttribute("aria-pressed", String(currentLanguage === "hi"));
    }
    document.querySelectorAll("[placeholder]").forEach(function (element) {
      if (!element.hasAttribute("data-original-placeholder")) element.setAttribute("data-original-placeholder", element.getAttribute("placeholder"));
      var originalPlaceholder = element.getAttribute("data-original-placeholder");
      element.setAttribute("placeholder", currentLanguage === "hi" ? (enToHi[originalPlaceholder] || originalPlaceholder) : originalPlaceholder);
    });
    var expander = document.querySelector(".menu-expand-button");
    if (expander) {
      var expanded = expander.getAttribute("aria-expanded") === "true";
      expander.querySelector("span").textContent = currentLanguage === "hi" ? (expanded ? "कम दिखाएँ" : "पूरा मेन्यू देखें") : (expanded ? "SHOW LESS" : "VIEW FULL MENU");
    }
  }
  try {
    var savedLanguage = window.localStorage.getItem("sonbhadra-language");
    currentLanguage = savedLanguage === "hi" || savedLanguage === "en" ? savedLanguage : ((navigator.language || "").toLowerCase().startsWith("hi") ? "hi" : "en");
  } catch (error) {
    currentLanguage = ((navigator.language || "").toLowerCase().startsWith("hi") ? "hi" : "en");
  }
  if (languageToggle) languageToggle.addEventListener("click", function () {
    currentLanguage = currentLanguage === "hi" ? "en" : "hi";
    try { window.localStorage.setItem("sonbhadra-language", currentLanguage); } catch (error) {}
    translatePage(currentLanguage);
  });

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
      menuExpandButton.querySelector("span").textContent = currentLanguage === "hi" ? (expanded ? "पूरा मेन्यू देखें" : "कम दिखाएँ") : (expanded ? "VIEW FULL MENU" : "SHOW LESS");
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
      if (menuExpandButton) { menuExpandButton.setAttribute("aria-expanded", "false"); menuExpandButton.classList.remove("is-expanded"); menuExpandButton.querySelector("span").textContent = currentLanguage === "hi" ? "पूरा मेन्यू देखें" : "VIEW FULL MENU"; menuExpandButton.querySelector("b").textContent = "+"; }
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
  translatePage(currentLanguage);
})();