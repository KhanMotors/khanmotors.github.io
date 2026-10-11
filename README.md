# Khan Motors and Property Dealer: website (version 1)

A static website with no build step and no backend. Open it in a browser or upload the folder to any web host.

## 1. Preview or run it

- **Quickest:** open `index.html` in a browser. Everything works offline except the Google fonts.
- **Local server (optional):** from this folder run `python3 -m http.server 8080`, then open http://localhost:8080.
- **Going live:** upload the whole folder to any static host (Netlify, Cloudflare Pages, GitHub Pages, or ordinary cPanel hosting). There is nothing to install.

Pages use hash links (`#vehicles`, `#properties`, `#contact` and so on), so the site works on any host with no server rules.

## 2. Where to update things

| What | File |
|---|---|
| Phone, WhatsApp, email, hours, address, Maps link, WhatsApp message templates | `config.js` |
| Vehicle and property listings | `listings.js` |
| Button labels and messages created by the script (ready for translation) | `i18n.js` |
| Page copy (headings, About text, services) | `index.html` |
| Colours, fonts, spacing | top of `styles.css` (`:root` tokens) |
| Logo files | `logo.svg`, `favicon.svg` |

**Adding a real listing:** copy an entry in `listings.js`, give it a new `id`, set `demo: false`, and put photo paths in `images: [...]`, for example `"images/vehicles/corolla-front.webp"`. Use WebP or JPEG about 1600px wide, ideally under 250 KB each. Set `featured: true` to show it on the home page; the first three featured listings of each kind appear there.

**Removing the demo notices:** delete the demo entries and set `showDemoNotice: false` in `config.js`.


## 3. To confirm before launch

1. **Email address.** It was supplied as `clickhassankhan@gmailcom` and is shown provisionally as `clickhassankhan@gmail.com`. Confirm it, then set `emailConfirmed: true`.
2. **Street address.** The Google Maps share link could not be read while building, so the site shows "Abbottabad, Pakistan". Add the full address to `streetAddress` in `config.js` once confirmed. The "Open in Google Maps" button already uses the supplied link.
3. **Opening days.** Only the hours (9:00 AM to 8:00 PM PKT) were supplied. Add the days to `hours.days` when confirmed, for example `"Monday to Saturday"`.
4. **Real inventory and photos.** Every listing and image is a labelled demo. Replace them with real stock and photos you own or are licensed to use.
5. **Domain.** Once you have one, add `<link rel="canonical">` and an `og:image` in `index.html`.
6. **Enquiry form.** There is no backend. The form opens WhatsApp with the enquiry filled in, and the customer still has to press Send. No message says the enquiry was received. If you later want form submissions by email, add a form service and update the form handler in `app.js`.

## Urdu and right-to-left later

The layout uses CSS logical properties and `KM_CONFIG.dir`. To add Urdu, translate `i18n.js` (add a `ur` block) and the copy in `index.html`, then set `locale: "ur"` and `dir: "rtl"`. There is no language switcher yet, because an inactive one would only confuse visitors.

## Accessibility and performance notes

- Skip link, semantic headings, labelled form fields, visible focus outlines, and keyboard support throughout. Listing details open in a native dialog: Esc closes it, the arrow keys change images, and focus returns to the button that opened it.
- Respects "reduce motion" settings.
- Listing images load lazily. Placeholder images are tiny inline SVGs. There are no frameworks or tracking scripts.

## Changes in version 1.1

- Fixed: the "No vehicles/properties match these filters" boxes and the enquiry-form status box were showing all the time. They now appear only when needed.
- Fixed: choosing a minimum price, year or area that is higher than the maximum gave zero results. The two values are now swapped automatically.
- Removed the large focus outline that appeared around page headings after navigating (keyboard focus rings on buttons, links and fields are unchanged).
- Price and area dropdowns now say "Any" so they no longer cut off on tablets.
- Brighter backdrop on demo car images so black and dark-grey cars are clearly visible.
- Single-file preview rebuilt with these fixes.
- Tested at desktop (1366px), tablet (820px) and phone (375-390px) sizes: all six pages, filters, sorting, listing details, gallery, enquiry form and WhatsApp/phone/email/Maps links work with no script errors.
