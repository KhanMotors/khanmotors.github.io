/* ==========================================================================
   KHAN MOTORS AND PROPERTY DEALER — SITE SCRIPT
   No frameworks, no build step. Reads business details from js/config.js,
   listings from js/listings.js and interface text from js/i18n.js.
   ========================================================================== */

(function () {
  "use strict";

  const C = window.KM_CONFIG;
  const S = (window.KM_STRINGS[C.locale] || window.KM_STRINGS.en);
  const DATA = window.KM_LISTINGS;
  const IMG = window.KM_PLACEHOLDERS;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.documentElement.lang = C.locale;
  document.documentElement.dir = C.dir;

  /* ---------------------------------------------------------------- utils */

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const group = (n) => new Intl.NumberFormat("en-US").format(n);
  const trim = (n) => String(Number(n.toFixed(2)));
  // Read a min/max pair from a form; if the visitor picks them the wrong way round, swap them.
  function range(f, minName, maxName) {
    let lo = +f.get(minName) || 0, hi = +f.get(maxName) || Infinity;
    if (lo > hi) [lo, hi] = [hi, lo];
    return [lo, hi];
  }

  // PKR in the way people speak about prices locally (lakh / crore), plus the full figure.
  function pkr(n) {
    let short;
    if (n >= 1e7) short = "PKR " + trim(n / 1e7) + " crore";
    else if (n >= 1e5) short = "PKR " + trim(n / 1e5) + " lakh";
    else short = "PKR " + group(n);
    return { short, full: "PKR " + group(n) };
  }

  function waUrl(text) {
    return "https://wa.me/" + C.whatsapp.number + "?text=" + encodeURIComponent(text);
  }
  function listingMessage(title) {
    return C.messages.listing.replace("[TITLE]", title);
  }
  const telHref = () => "tel:" + C.phone.tel;
  const mailHref = () => "mailto:" + C.email;

  const vehicleTitle = (v) => `${v.year} ${v.make} ${v.model} ${v.variant}`.trim();
  const areaMarla = (a) => a.unit === "kanal" ? a.value * 20 : a.value;
  function areaText(a) {
    return a.unit === "kanal" ? S.kanal(a.value) : S.marla(a.value);
  }
  const TYPE_LABEL = { house: "House", plot: "Plot", apartment: "Apartment", commercial: "Commercial" };
  const address = () => (C.streetAddress ? C.streetAddress + ", " : "") + C.city + ", " + C.country;
  function hoursLong() {
    const h = `${C.hours.open} to ${C.hours.close}, ${C.hours.timezoneLabel}`;
    const open = C.hours.days ? `${C.hours.days}, ${h}` : h;
    return C.hours.closedDays ? `${open}. Closed ${C.hours.closedDays}` : open;
  }

  const ICON_PIN = `<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/></svg>`;
  const ICON_WA = `<svg viewBox="0 0 32 32" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm5.9 15.7c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.8 8.8 0 0 1-4.4-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.5 6.5 0 0 0 1.4 3.4 14.6 14.6 0 0 0 5.6 5c2.1.9 2.9 1 4 .8.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5l-.6-.3Z"/></svg>`;
  const ICON_PHONE = `<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" focusable="false"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"/></svg>`;

  /* ------------------------------------------------- business details */

  function bindConfig(root = document) {
    const values = {
      phone: C.phone.display,
      whatsapp: C.whatsapp.display,
      email: C.email,
      hoursShort: `${C.hours.open} to ${C.hours.close}` + (C.hours.closedDays ? ` · Closed ${C.hours.closedDays}` : ""),
      hoursLong: hoursLong(),
      address: address(),
      year: String(new Date().getFullYear())
    };
    $$("[data-bind]", root).forEach(el => { el.textContent = values[el.dataset.bind] ?? ""; });
    $$("[data-tel]", root).forEach(a => { a.href = telHref(); });
    $$("[data-mail]", root).forEach(a => { a.href = mailHref(); });
    $$("[data-maps]", root).forEach(a => { a.href = C.mapsUrl; });
    $$("[data-wa]", root).forEach(a => {
      const msg = C.messages[a.dataset.wa] || C.messages.general;
      a.href = waUrl(msg);
    });
    if (!C.showDemoNotice) $$("[data-demo-note]", root).forEach(el => { el.hidden = true; });
  }

  /* ------------------------------------------------------------ cards */

  function vehicleCard(v) {
    const t = vehicleTitle(v);
    const img = IMG.vehicle(v)[0];
    const p = pkr(v.price);
    return `<article class="card card-motor">
      <div class="card-media">
        <img src="${img.src}" alt="${esc(img.alt)}" width="800" height="500" loading="lazy" decoding="async">
        ${v.demo ? `<div class="tag-row"><span class="tag tag-demo">${S.demoListing}</span></div>` : ""}
      </div>
      <div class="card-body">
        <h3 class="card-title"><button type="button" data-open="vehicle" data-id="${esc(v.id)}">${esc(t)}</button></h3>
        <p class="card-price" title="${esc(p.full)}">${esc(p.short)}</p>
        <dl class="specs">
          <div><dt>Year</dt><dd>${v.year}</dd></div>
          <div><dt>Mileage</dt><dd>${group(v.mileage)} ${S.km}</dd></div>
          <div><dt>Gearbox</dt><dd>${esc(v.transmission)}</dd></div>
        </dl>
        <p class="card-loc">${ICON_PIN}<span>${esc(v.location)}</span></p>
        <div class="card-actions">
          <button type="button" class="btn btn-ghost-light" data-open="vehicle" data-id="${esc(v.id)}" aria-label="${S.viewDetails}: ${esc(t)}">${S.viewDetails}</button>
          <a class="btn btn-wa" href="${waUrl(listingMessage(t))}" target="_blank" rel="noopener" aria-label="${S.enquireWhatsApp}: ${esc(t)}">${ICON_WA}<span>WhatsApp</span></a>
        </div>
      </div>
    </article>`;
  }

  function propertyCard(p) {
    const img = IMG.property(p)[0];
    const price = pkr(p.price);
    const facts = [`<li><strong>${esc(areaText(p.area))}</strong></li>`];
    if (p.bedrooms != null) facts.push(`<li>${S.bedShort(p.bedrooms)}</li>`);
    if (p.bathrooms != null && p.type !== "plot") facts.push(`<li>${S.bathShort(p.bathrooms)}</li>`);
    facts.push(`<li>${TYPE_LABEL[p.type]}</li>`);
    return `<article class="card card-estate">
      <div class="card-media">
        <img src="${img.src}" alt="${esc(img.alt)}" width="800" height="500" loading="lazy" decoding="async">
        <div class="tag-row">
          <span class="tag ${p.purpose === "rent" ? "tag-rent" : "tag-sale"}">${p.purpose === "rent" ? S.forRent : S.forSale}</span>
          ${p.demo ? `<span class="tag tag-demo">${S.demoListing}</span>` : ""}
        </div>
      </div>
      <div class="card-body">
        <h3 class="card-title"><button type="button" data-open="property" data-id="${esc(p.id)}">${esc(p.title)}</button></h3>
        <p class="card-price" title="${esc(price.full)}">${esc(price.short)}${p.purpose === "rent" ? ` <small>${S.perMonth}</small>` : ""}</p>
        <p class="card-loc">${ICON_PIN}<span>${esc(p.location)}</span></p>
        <ul class="facts">${facts.join("")}</ul>
        <div class="card-actions">
          <button type="button" class="btn btn-outline" data-open="property" data-id="${esc(p.id)}" aria-label="${S.viewDetails}: ${esc(p.title)}">${S.viewDetails}</button>
          <a class="btn btn-wa" href="${waUrl(listingMessage(p.title))}" target="_blank" rel="noopener" aria-label="${S.enquireWhatsApp}: ${esc(p.title)}">${ICON_WA}<span>WhatsApp</span></a>
        </div>
      </div>
    </article>`;
  }

  /* ---------------------------------------------------------- filters */

  function options(select, list, keep) {
    const prev = keep ? select.value : "";
    select.innerHTML = list.map(o => `<option value="${esc(o.value)}">${esc(o.label)}</option>`).join("");
    if (keep && list.some(o => String(o.value) === prev)) select.value = prev;
  }
  const uniq = (arr) => Array.from(new Set(arr)).sort((a, b) => String(a).localeCompare(String(b)));
  const priceOpts = (steps, emptyLabel) => [{ value: "", label: emptyLabel }].concat(steps.map(n => ({ value: n, label: pkr(n).short })));

  function sorter(key) {
    return {
      "recent": (a, b) => b.listed.localeCompare(a.listed),
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      "year-desc": (a, b) => b.year - a.year || a.price - b.price,
      "km-asc": (a, b) => a.mileage - b.mileage,
      "area-desc": (a, b) => areaMarla(b.area) - areaMarla(a.area)
    }[key] || ((a, b) => b.listed.localeCompare(a.listed));
  }

  /* Vehicles */
  const VF = $("#vehicle-filters");
  const VEHICLE_PRICES = [2000000, 3000000, 4000000, 5000000, 6000000, 8000000, 10000000, 12500000, 15000000];

  function setupVehicleFilters() {
    const v = DATA.vehicles;
    options($("#vf-make"), [{ value: "", label: S.allMakes }].concat(uniq(v.map(x => x.make)).map(m => ({ value: m, label: m }))));
    syncModels();
    options($("#vf-pmin"), priceOpts(VEHICLE_PRICES, "Any"));
    options($("#vf-pmax"), priceOpts(VEHICLE_PRICES, "Any"));
    const years = v.map(x => x.year);
    const yrs = [];
    for (let y = Math.max(...years); y >= Math.min(...years); y--) yrs.push({ value: y, label: String(y) });
    options($("#vf-ymin"), [{ value: "", label: S.any }].concat(yrs.slice().reverse()));
    options($("#vf-ymax"), [{ value: "", label: S.any }].concat(yrs));
    options($("#vf-fuel"), [{ value: "", label: "Any fuel" }].concat(uniq(v.map(x => x.fuel)).map(f => ({ value: f, label: f }))));

    VF.addEventListener("change", (e) => {
      if (e.target.id === "vf-make") syncModels();
      renderVehicles();
    });
    $("#vf-sort").addEventListener("change", renderVehicles);
    VF.addEventListener("reset", () => setTimeout(() => { syncModels(); renderVehicles(); }, 0));
    VF.addEventListener("submit", (e) => e.preventDefault());
  }

  function syncModels() {
    const make = $("#vf-make").value;
    const sel = $("#vf-model");
    if (!make) {
      options(sel, [{ value: "", label: S.chooseMakeFirst }]);
      sel.disabled = true;
      return;
    }
    sel.disabled = false;
    options(sel, [{ value: "", label: S.allModels }].concat(
      uniq(DATA.vehicles.filter(x => x.make === make).map(x => x.model)).map(m => ({ value: m, label: m }))));
  }

  function renderVehicles() {
    const f = new FormData(VF);
    const make = f.get("make"), model = f.get("model");
    const [pmin, pmax] = range(f, "pmin", "pmax");
    const [ymin, ymax] = range(f, "ymin", "ymax");
    const trans = f.get("trans"), fuel = f.get("fuel");
    const list = DATA.vehicles.filter(v =>
      (!make || v.make === make) && (!model || v.model === model) &&
      v.price >= pmin && v.price <= pmax && v.year >= ymin && v.year <= ymax &&
      (!trans || v.transmission === trans) && (!fuel || v.fuel === fuel)
    ).sort(sorter($("#vf-sort").value));
    $("#vehicle-list").innerHTML = list.map(vehicleCard).join("");
    $("#vehicle-empty").hidden = list.length > 0;
    $("#vehicle-list").hidden = list.length === 0;
    $("#vehicle-count").textContent = S.resultsVehicles(list.length, DATA.vehicles.length);
    observe($("#vehicle-list"));
  }

  /* Properties */
  const PF = $("#property-filters");
  const SALE_PRICES = [5000000, 10000000, 20000000, 30000000, 50000000, 100000000];
  const RENT_PRICES = [25000, 50000, 75000, 100000, 150000, 250000];
  const AREA_STEPS = [3, 5, 7, 10, 20, 40, 80];
  const areaLabel = (m) => m >= 20 ? `${S.kanal(m / 20)} (${m} marla)` : S.marla(m);

  function setupPropertyFilters() {
    const locs = uniq(DATA.properties.map(p => p.location));
    options($("#pf-location"), [{ value: "", label: "All locations" }].concat(locs.map(l => ({ value: l, label: l.replace(/, Abbottabad$/, "") }))));
    options($("#pf-amin"), [{ value: "", label: "Any" }].concat(AREA_STEPS.map(m => ({ value: m, label: areaLabel(m) }))));
    options($("#pf-amax"), [{ value: "", label: "Any" }].concat(AREA_STEPS.map(m => ({ value: m, label: areaLabel(m) }))));
    syncPropertyPrice();
    syncBeds();

    PF.addEventListener("change", (e) => {
      if (e.target.name === "purpose") syncPropertyPrice();
      if (e.target.id === "pf-type") syncBeds();
      renderProperties();
    });
    $("#pf-sort").addEventListener("change", renderProperties);
    PF.addEventListener("reset", () => setTimeout(() => { syncPropertyPrice(); syncBeds(); renderProperties(); }, 0));
    PF.addEventListener("submit", (e) => e.preventDefault());
  }

  function syncPropertyPrice() {
    const purpose = PF.querySelector("input[name=purpose]:checked").value;
    const min = $("#pf-pmin"), max = $("#pf-pmax");
    if (!purpose) {
      options(min, [{ value: "", label: "Any" }]);
      options(max, [{ value: "", label: "Any" }]);
      min.disabled = max.disabled = true;
      $("#pf-price-hint").textContent = S.pricePickPurpose;
      return;
    }
    const steps = purpose === "rent" ? RENT_PRICES : SALE_PRICES;
    min.disabled = max.disabled = false;
    options(min, priceOpts(steps, "Any"));
    options(max, priceOpts(steps, "Any"));
    $("#pf-price-hint").textContent = purpose === "rent" ? "Monthly rent" : "Sale price";
  }

  function syncBeds() {
    const type = $("#pf-type").value;
    const beds = $("#pf-beds");
    const na = type === "plot" || type === "commercial";
    beds.disabled = na;
    if (na) beds.value = "";
    $("#pf-beds-hint").textContent = na ? S.bedroomsNA : "";
  }

  function renderProperties() {
    const f = new FormData(PF);
    const purpose = f.get("purpose"), type = f.get("type"), loc = f.get("location");
    const [pmin, pmax] = range(f, "pmin", "pmax");
    const [amin, amax] = range(f, "amin", "amax");
    const beds = +f.get("beds") || 0;
    const list = DATA.properties.filter(p =>
      (!purpose || p.purpose === purpose) && (!type || p.type === type) && (!loc || p.location === loc) &&
      p.price >= pmin && p.price <= pmax &&
      areaMarla(p.area) >= amin && areaMarla(p.area) <= amax &&
      (!beds || (p.bedrooms != null && p.bedrooms >= beds))
    ).sort(sorter($("#pf-sort").value));
    $("#property-list").innerHTML = list.map(propertyCard).join("");
    $("#property-empty").hidden = list.length > 0;
    $("#property-list").hidden = list.length === 0;
    $("#property-count").textContent = S.resultsProperties(list.length, DATA.properties.length);
    observe($("#property-list"));
  }

  $$("[data-reset]").forEach(btn => btn.addEventListener("click", () => {
    const form = document.getElementById(btn.dataset.reset);
    form.reset();
    const first = form.querySelector("select, input");
    if (first) first.focus();
  }));

  /* ------------------------------------------------------- detail view */

  const dialog = $("#detail");
  let gallery = { images: [], index: 0 };
  let lastOpener = null;

  function specTable(rows) {
    return `<dl class="spec-table">${rows.filter(r => r[1] != null && r[1] !== "").map(([k, v]) =>
      `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>`;
  }

  function galleryHtml(images) {
    const nav = images.length > 1 ? `
      <button type="button" class="gallery-nav gallery-prev" data-gal="-1" aria-label="${S.galleryPrev}"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2"/></svg></button>
      <button type="button" class="gallery-nav gallery-next" data-gal="1" aria-label="${S.galleryNext}"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2"/></svg></button>` : "";
    const thumbs = images.length > 1 ? `<div class="gallery-thumbs" role="group" aria-label="Choose image">${images.map((im, i) =>
      `<button type="button" data-thumb="${i}" aria-label="${S.imageOf(i + 1, images.length)}" aria-current="${i === 0}"><img src="${im.src}" alt="" width="160" height="100"></button>`).join("")}</div>` : "";
    return `<div class="gallery">
      <div class="gallery-main">
        <img id="gallery-img" src="${images[0].src}" alt="${esc(images[0].alt)}" width="800" height="500">
        ${nav}
        <span class="gallery-count" id="gallery-count" aria-live="polite">${S.imageOf(1, images.length)}</span>
      </div>${thumbs}</div>`;
  }

  function showImage(i) {
    const n = gallery.images.length;
    gallery.index = (i + n) % n;
    const im = gallery.images[gallery.index];
    const el = $("#gallery-img");
    el.src = im.src; el.alt = im.alt;
    $("#gallery-count").textContent = S.imageOf(gallery.index + 1, n);
    $$("[data-thumb]", dialog).forEach(b => b.setAttribute("aria-current", String(+b.dataset.thumb === gallery.index)));
  }

  function openVehicle(v) {
    const t = vehicleTitle(v);
    const p = pkr(v.price);
    gallery = { images: IMG.vehicle(v), index: 0 };
    dialog.dataset.kind = "vehicle";
    $("#detail-body").innerHTML = galleryHtml(gallery.images) + `
      <div class="detail-info">
        <h2 id="detail-title">${esc(t)}</h2>
        <p class="detail-price">${esc(p.short)}<small>${esc(p.full)}</small></p>
        ${v.demo && C.showDemoNotice ? `<p class="demo-note">${S.demoListing}: details and images are for preview only.</p>` : ""}
        <div class="detail-section"><h3>Specifications</h3>${specTable([
          ["Make", v.make], ["Model", v.model], ["Variant", v.variant], ["Model year", v.year],
          ["Mileage", group(v.mileage) + " " + S.km], ["Transmission", v.transmission], ["Fuel", v.fuel],
          ["Engine", v.engine], ["Body", v.body === "suv" ? "SUV" : v.body[0].toUpperCase() + v.body.slice(1)],
          ["Colour", v.colour], ["Registered in", v.registeredIn], ["Location", v.location]
        ])}</div>
        <div class="detail-section"><h3>Description</h3><p>${esc(v.description)}</p></div>
        ${v.features && v.features.length ? `<div class="detail-section"><h3>Features</h3><ul class="feature-list">${v.features.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>` : ""}
        <div class="detail-actions">
          <a class="btn btn-wa" href="${waUrl(listingMessage(t))}" target="_blank" rel="noopener">${ICON_WA}<span>${S.enquireWhatsApp}</span></a>
          <a class="btn btn-gold" href="${telHref()}">${ICON_PHONE}<span>${S.callToArrange}</span></a>
        </div>
        <p class="detail-ref">Ref ${esc(v.id)}</p>
      </div>`;
    showDialog();
  }

  function openProperty(p) {
    const price = pkr(p.price);
    gallery = { images: IMG.property(p), index: 0 };
    dialog.dataset.kind = "property";
    const area = areaText(p.area) + (p.area.unit === "kanal" ? ` (${areaMarla(p.area)} marla)` : "");
    $("#detail-body").innerHTML = galleryHtml(gallery.images) + `
      <div class="detail-info">
        <div class="tag-row" style="position:static"><span class="tag ${p.purpose === "rent" ? "tag-rent" : "tag-sale"}">${p.purpose === "rent" ? S.forRent : S.forSale}</span></div>
        <h2 id="detail-title">${esc(p.title)}</h2>
        <p class="detail-price">${esc(price.short)}${p.purpose === "rent" ? " " + S.perMonth : ""}<small>${esc(price.full)}${p.purpose === "rent" ? " " + S.perMonth : ""}</small></p>
        ${p.demo && C.showDemoNotice ? `<p class="demo-note demo-note-light">${S.demoListing}: details and images are for preview only.</p>` : ""}
        <div class="detail-section"><h3>Details</h3>${specTable([
          ["Status", p.purpose === "rent" ? S.forRent : S.forSale], ["Type", TYPE_LABEL[p.type]], ["Area", area],
          ["Bedrooms", p.bedrooms], ["Bathrooms", p.type === "plot" ? null : p.bathrooms], ["Location", p.location]
        ])}</div>
        <div class="detail-section"><h3>Description</h3><p>${esc(p.description)}</p></div>
        ${p.features && p.features.length ? `<div class="detail-section"><h3>Features</h3><ul class="feature-list">${p.features.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>` : ""}
        <div class="detail-actions">
          <a class="btn btn-wa" href="${waUrl(listingMessage(p.title))}" target="_blank" rel="noopener">${ICON_WA}<span>${S.arrangeViewing}</span></a>
          <a class="btn btn-navy" href="${telHref()}">${ICON_PHONE}<span>${S.callToArrange}</span></a>
        </div>
        <p class="detail-ref">Ref ${esc(p.id)}</p>
      </div>`;
    showDialog();
  }

  function showDialog() {
    if (!dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    }
    document.body.classList.add("dialog-open");
    dialog.scrollTop = 0;
    $(".detail-close", dialog).focus();
  }

  function closeDialog() {
    if (typeof dialog.close === "function" && dialog.open) dialog.close();
    else dialog.removeAttribute("open");
  }

  dialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    if (lastOpener && document.contains(lastOpener)) lastOpener.focus();
  });
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) return closeDialog();               // backdrop
    if (e.target.closest("[data-close]")) return closeDialog();
    const g = e.target.closest("[data-gal]");
    if (g) return showImage(gallery.index + (+g.dataset.gal) * (C.dir === "rtl" ? -1 : 1));
    const th = e.target.closest("[data-thumb]");
    if (th) showImage(+th.dataset.thumb);
  });
  dialog.addEventListener("keydown", (e) => {
    if (gallery.images.length < 2) return;
    if (e.key === "ArrowRight") { e.preventDefault(); showImage(gallery.index + (C.dir === "rtl" ? -1 : 1)); }
    if (e.key === "ArrowLeft") { e.preventDefault(); showImage(gallery.index - (C.dir === "rtl" ? -1 : 1)); }
  });

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-open]");
    if (!b) return;
    lastOpener = b;
    if (b.dataset.open === "vehicle") openVehicle(DATA.vehicles.find(v => v.id === b.dataset.id));
    else openProperty(DATA.properties.find(p => p.id === b.dataset.id));
  });

  /* ----------------------------------------------------------- router */

  const VIEWS = {
    home: {
      title: "Khan Motors and Property Dealer | Vehicles and Property in Abbottabad",
      desc: "Khan Motors and Property Dealer in Abbottabad, Pakistan. Vehicle buying and selling, property buying and selling, and rental enquiries. Call or WhatsApp " + C.phone.display + "."
    },
    vehicles: {
      title: "Vehicles | Khan Motors and Property Dealer, Abbottabad",
      desc: "Browse vehicles through Khan Motors and Property Dealer in Abbottabad. Filter by make, price, year, transmission and fuel, and enquire on WhatsApp."
    },
    properties: {
      title: "Properties to Buy and Rent | Khan Motors and Property Dealer, Abbottabad",
      desc: "Houses, plots, apartments and commercial property in Abbottabad to buy or rent. Filter by location, price, area in marla or kanal, and bedrooms."
    },
    services: {
      title: "Services | Khan Motors and Property Dealer, Abbottabad",
      desc: "Buy or sell a vehicle, buy or sell a property, or make a rental enquiry with Khan Motors and Property Dealer in Abbottabad."
    },
    about: {
      title: "About | Khan Motors and Property Dealer, Abbottabad",
      desc: "Khan Motors and Property Dealer serves customers in Abbottabad buying and selling vehicles and property, and looking for rentals."
    },
    contact: {
      title: "Contact | Khan Motors and Property Dealer, Abbottabad",
      desc: "Call or WhatsApp " + C.phone.display + ". Open " + hoursLong() + ". " + address() + "."
    }
  };

  const nav = $("#site-nav");
  const toggle = $(".nav-toggle");
  let currentView = null;

  function setNav(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }
  toggle.addEventListener("click", () => setNav(!nav.classList.contains("is-open")));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setNav(false); toggle.focus(); }
  });

  function route(initial) {
    const id = decodeURIComponent(location.hash.slice(1)) || "home";
    let viewName = VIEWS[id] ? id : null;
    let target = null;
    if (!viewName) {
      target = document.getElementById(id);
      const host = target && target.closest("[data-view]");
      if (!host) { if (!target) viewName = "home"; else return; }   // e.g. #main skip link
      else viewName = host.dataset.view;
    }
    setNav(false);
    if (dialog.open) closeDialog();

    if (viewName !== currentView) {
      $$("[data-view]").forEach(v => { v.hidden = v.dataset.view !== viewName; });
      const view = $(`[data-view="${viewName}"]`);
      if (!reduceMotion && !initial) { view.classList.remove("is-entering"); void view.offsetWidth; view.classList.add("is-entering"); }
      currentView = viewName;
      $$("[data-nav]").forEach(a => {
        if (a.dataset.nav === viewName) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
      });
      document.title = VIEWS[viewName].title;
      const meta = $('meta[name="description"]');
      if (meta) meta.setAttribute("content", VIEWS[viewName].desc);
    }

    if (target) {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      $$(".is-highlight").forEach(el => el.classList.remove("is-highlight"));
      target.classList.add("is-highlight");
      target.focus({ preventScroll: true });
    } else if (!initial) {
      window.scrollTo(0, 0);
      const h = $(`[data-view="${viewName}"] .view-title`);
      if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    }
  }
  window.addEventListener("hashchange", () => route(false));

  // Links that pre-set a choice on another page
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-interest], a[data-purpose]");
    if (!a) return;
    if (a.dataset.interest) $("#ef-interest").value = a.dataset.interest;
    if (a.dataset.purpose) {
      const r = PF.querySelector(`input[name=purpose][value="${a.dataset.purpose}"]`);
      if (r) { r.checked = true; syncPropertyPrice(); renderProperties(); }
    }
  });

  /* --------------------------------------------------- enquiry form */

  const form = $("#enquiry-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = {
      name: $("#ef-name"), phone: $("#ef-phone"), interest: $("#ef-interest"), message: $("#ef-message")
    };
    const errors = [];
    const v = (el) => el.value.trim();
    Object.values(fields).forEach(el => el.removeAttribute("aria-invalid"));
    if (!v(fields.name)) errors.push([fields.name, S.formErrorName]);
    if (v(fields.phone).replace(/\D/g, "").length < 10) errors.push([fields.phone, S.formErrorPhone]);
    if (!v(fields.interest)) errors.push([fields.interest, S.formErrorInterest]);
    if (!v(fields.message)) errors.push([fields.message, S.formErrorMessage]);

    const box = $("#ef-errors");
    const status = $("#ef-status");
    if (errors.length) {
      errors.forEach(([el]) => el.setAttribute("aria-invalid", "true"));
      box.innerHTML = `<ul>${errors.map(([, m]) => `<li>${esc(m)}</li>`).join("")}</ul>`;
      box.hidden = false;
      status.hidden = true;
      errors[0][0].focus();
      return;
    }
    box.hidden = true;

    const listing = v($("#ef-listing"));
    const text = [
      "Assalamualaikum, I would like to make an enquiry.",
      "",
      "Name: " + v(fields.name),
      "Phone: " + v(fields.phone),
      "Interested in: " + v(fields.interest),
      listing ? "Vehicle or property: " + listing : null,
      "",
      "Message: " + v(fields.message)
    ].filter(x => x !== null).join("\n");
    const url = waUrl(text);

    let w = null;
    try { w = window.open(url, "_blank"); if (w) w.opener = null; } catch (err) { w = null; }
    status.innerHTML = `<p>${esc(S.formReady)}</p><p>${esc(S.formFallback)} <a href="${url}" target="_blank" rel="noopener">Open WhatsApp with my enquiry</a></p>`;
    status.hidden = false;
  });

  /* ------------------------------------------------------- copy phone */

  $$("[data-copy]").forEach(btn => btn.addEventListener("click", () => {
    const value = C.phone.display;
    const done = (msg) => { const old = btn.textContent; btn.textContent = msg; setTimeout(() => { btn.textContent = old; }, 1800); };
    const fallback = () => {
      const span = btn.previousElementSibling;
      const range = document.createRange(); range.selectNodeContents(span);
      const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
      done(S.copyFailed);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(value).then(() => done(S.copied), fallback);
    else fallback();
  }));

  /* ------------------------------------------------- scroll reveal */

  let io = null;
  if (!reduceMotion && "IntersectionObserver" in window) {
    io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
  }
  function observe(root) {
    if (!io) return;
    $$(".card, .svc-card, .steps li, .service-strip li", root).forEach(el => {
      if (!el.classList.contains("reveal")) { el.classList.add("reveal"); io.observe(el); }
    });
  }

  /* ------------------------------------------------------------- init */

  bindConfig();
  $("#featured-vehicles").innerHTML = DATA.vehicles.filter(v => v.featured).slice(0, 3).map(vehicleCard).join("");
  $("#featured-properties").innerHTML = DATA.properties.filter(p => p.featured).slice(0, 3).map(propertyCard).join("");
  setupVehicleFilters();
  setupPropertyFilters();
  renderVehicles();
  renderProperties();
  observe(document);
  route(true);
  if (location.hash && location.hash !== "#home") window.scrollTo(0, 0);
})();
