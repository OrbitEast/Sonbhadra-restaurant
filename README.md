# Sonbhadra Restaurant — Website Prototype

A polished, responsive, multi-page restaurant website prototype built with plain HTML, CSS, and JavaScript. No build step or framework required.

## Pages
- `index.html` — Landing page, menu category filters, gallery, location preview, reservation modal.
- `about.html` — Restaurant story.
- `kitchen.html` — Kitchen and food philosophy.
- `team.html` — Owner, chef, and service team profile placeholders.

## Run locally
Open `index.html` in a browser, or serve the folder with any static web server. The website is suitable for static hosting such as Firebase Hosting or GitHub Pages.

## Before launch
1. **Set the restaurant WhatsApp number:** open `app.js` and replace the empty `WHATSAPP_NUMBER` value with the restaurant's international number using digits only. Example format: `91XXXXXXXXXX`. Until then, the booking form opens WhatsApp's recipient picker with a pre-filled message; it cannot automatically know the restaurant's chat.
2. Replace sample menu items and add real prices.
3. Replace preview/stock photographs with photos supplied by the restaurant.
4. Add the verified address, working hours, and exact Google Maps pin.
5. Replace role placeholders with the owner's approved names, photos, and details.
6. Test the WhatsApp booking flow on Android, iOS, and desktop.

## Booking flow
The "Reserve a Table" and "Book your table" buttons open a form asking for name, phone, date, time, and number of guests. On submit, the website constructs a WhatsApp message containing those details and redirects to WhatsApp. No booking data is stored by this static prototype, and no reservation is automatically confirmed.

## Assets & implementation
- Google Fonts: DM Sans and Playfair Display.
- Photos: remote Unsplash image URLs used as temporary preview photography.
- Styling and motion are custom CSS; JavaScript handles navigation, reveal-on-scroll, category filters, modal accessibility, and WhatsApp message generation.
- No API keys, external database, or framework dependency is required for this prototype.

## Deployment
Firebase Hosting can serve this static project directly. Add the Firebase project configuration and deploy when ready.
