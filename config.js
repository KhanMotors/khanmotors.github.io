/* ==========================================================================
   KHAN MOTORS AND PROPERTY DEALER — BUSINESS CONFIGURATION
   --------------------------------------------------------------------------
   This is the ONE place to edit business details. Every phone link,
   WhatsApp link, email link, opening-hours line and map button on the
   site reads from here.

   Items marked "CONFIRM BEFORE LAUNCH" still need the owner's sign-off.
   ========================================================================== */

window.KM_CONFIG = {
  businessName: "Khan Motors and Property Dealer",
  shortName: "Khan Motors",

  city: "Abbottabad",
  country: "Pakistan",

  // Address as shown on the business's Google Maps listing (a Google Plus Code,
  // which Maps and phones understand). Replace with a street address if preferred.
  streetAddress: "56PM+X29",

  phone: {
    display: "+92 317 0551116",
    tel: "+923170551116"            // used for tel: links
  },

  whatsapp: {
    display: "+92 317 0551116",
    number: "923170551116"          // international format, no "+" or spaces
  },

  // Confirmed by the owner.
  email: "clickhassankhan@gmail.com",
  emailConfirmed: true,

  // Opening hours, as shown on the Google Maps listing.
  hours: {
    open: "9:00 AM",
    close: "8:00 PM",
    timezoneLabel: "Pakistan Standard Time",
    days: "Saturday to Thursday",
    closedDays: "Friday"            // shown as "Closed Friday"; set to "" if open every day
  },

  mapsUrl: "https://share.google/1s10INRJnDK1DWM55",

  // Message templates. [TITLE] is replaced with the listing title.
  messages: {
    listing: "Assalamualaikum, I am interested in [TITLE]. Please share availability and further details.",
    general: "Assalamualaikum, I would like to make an enquiry with Khan Motors and Property Dealer.",
    sellVehicle: "Assalamualaikum, I would like to sell my vehicle.\nMake and model: \nYear: \nMileage: \nExpected price (PKR): ",
    sellProperty: "Assalamualaikum, I would like to sell my property.\nType (house, plot, apartment, commercial): \nLocation: \nArea (marla or kanal): \nExpected price (PKR): ",
    rental: "Assalamualaikum, I have a rental enquiry.\nLooking to rent or let out: \nProperty type: \nPreferred location: \nBudget (PKR per month): "
  },

  // Set to false once real inventory replaces the demo listings in listings.js.
  showDemoNotice: true,

  // Language and direction. Keep "en"/"ltr" for now. When an Urdu version is
  // added, add a "ur" dictionary in js/i18n.js and set dir to "rtl".
  locale: "en",
  dir: "ltr"
};
