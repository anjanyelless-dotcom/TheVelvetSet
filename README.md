# TheVelvetSet

A complete responsive decor-rental and home-styling website using your seven supplied photographs and the supplied TheVelvetSet burgundy-and-gold logo.

## Open the website
Unzip this folder and double-click index.html. No install or build is needed. All assets are local; the design and animations work offline. For a local server, run `python3 -m http.server 8000` in this folder and open http://localhost:8000.

## Connect enquiries
Edit config.js and set whatsappNumber to your actual business number, in international digits without + or spaces (India: country code 91 plus the 10-digit number). When configured, the enquiry modal offers a WhatsApp link with the customer's completed details. The visitor must send that message themselves.
Until configured, the form produces a copyable/downloadable enquiry. No messages are sent, no booking is confirmed and no form details are uploaded or stored by this website. There is no payment system, availability database or backend.

## Included
- Brighter ivory, blush, jewel-burgundy and champagne-gold design built around the supplied logo; mobile navigation.
- Real-time Three.js hero sculpture made from layered extruded petals, metal materials, lights, torus orbit rings, gold particles, pointer motion and scroll drift. It pauses offscreen and falls back quietly if the CDN is unavailable.
- CSS 3D sculptural flower with layered petals, animated rotation and depth; pointer-responsive hero photo; canvas gold motes.
- Scroll reveals, reduced-motion support and offscreen particle pausing.
- Seven decor sets with category filters, accessible detail dialogs and enquiry selection.
- Date and required-field validation; copy/download enquiry; configurable WhatsApp handoff.
- Fixed bottom-right contact widget with WhatsApp and call actions for Srikanth M and Anjan.
- Service, process and FAQ sections.
- Original supplied images, displayed with CSS cropping to exclude phone UI and black borders. Image bytes have not been regenerated or retouched.

## Edit
styles.css: palette, responsive layouts and animation.
app.js: collection names, descriptions, category, photo crop offsets and enquiry behaviour. Collection names and VS identifiers are editorial website labels, not verified business SKUs.
index.html: page copy and structure.
assets/: original images renamed for the website, the supplied `thevelvetset-logo.png`, and favicon.

## Before launching publicly
Add your business WhatsApp number. Confirm your real service areas, rates, rental duration, delivery charges, deposit/cancellation terms and final prop inclusions. Pricing and testimonials were deliberately not invented. Replace photos with higher-resolution originals when available; these supplied photos are 712 pixels wide. Add your own business contact and privacy information as appropriate.

## Hosting
Upload index.html, styles.css, app.js, three-hero.js, config.js and assets/ together to any static website host. Keep the directory structure intact. The hero uses Three.js from jsDelivr at runtime; the rest of the site is local and has a graceful fallback when the CDN cannot load.

## Deploy on Vercel

Import the `TheVelvetSet` folder into Vercel as a static site. Use the project root containing `index.html` and `assets/`; no build command is required. If Vercel asks for an output directory, leave it empty for the root build (or use `dist/` if deploying the prepared `dist` folder directly). Keep `config.js` beside `index.html` so the contact numbers load correctly.
