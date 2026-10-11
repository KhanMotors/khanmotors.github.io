/* ==========================================================================
   LISTINGS DATA
   --------------------------------------------------------------------------
   ALL LISTINGS BELOW ARE DEMO LISTINGS. They exist only to show how the
   site works. Replace them with real inventory before launch, and set
   KM_CONFIG.showDemoNotice to false in config.js.

   Vehicle fields
     id, demo, featured, make, model, variant, year, price (PKR, number),
     mileage (km), transmission ("Automatic" | "Manual"),
     fuel ("Petrol" | "Diesel" | "Hybrid" | "Electric" | "CNG"),
     engine, body ("sedan" | "hatchback" | "suv"), colour, paint (hex used
     for the placeholder image), registeredIn, location, listed (YYYY-MM-DD),
     description, features[], images[] (optional: real photo paths)

   Property fields
     id, demo, featured, purpose ("sale" | "rent"),
     type ("house" | "plot" | "apartment" | "commercial"),
     title, price (PKR; for rentals this is the monthly rent),
     area: { value, unit: "marla" | "kanal" }, bedrooms, bathrooms
     (null where not applicable), location, listed, description,
     features[], images[] (optional: real photo paths)

   Real photos: add paths such as "images/vehicles/corolla-1.webp" to
   images[]. When images[] is empty, a labelled placeholder is drawn.
   ========================================================================== */

window.KM_LISTINGS = {
  vehicles: [
    {
      id: "V101", demo: true, featured: true,
      make: "Toyota", model: "Corolla", variant: "Altis 1.6 X CVT-i",
      year: 2021, price: 6450000, mileage: 42000,
      transmission: "Automatic", fuel: "Petrol", engine: "1600 cc",
      body: "sedan", colour: "Super White", paint: "#e9e6df",
      registeredIn: "Islamabad", location: "Mandian, Abbottabad", listed: "2026-10-04",
      description: "A well-kept Corolla Altis with a smooth CVT gearbox, comfortable for daily driving around Abbottabad and longer trips on the motorway. Original documents and service records available to view at the time of viewing.",
      features: ["Push start", "Reverse camera", "Climate control", "Alloy wheels", "Cruise control"],
      images: []
    },
    {
      id: "V102", demo: true, featured: true,
      make: "Honda", model: "Civic", variant: "Oriel 1.5 RS Turbo",
      year: 2022, price: 8950000, mileage: 28000,
      transmission: "Automatic", fuel: "Petrol", engine: "1500 cc Turbo",
      body: "sedan", colour: "Crystal Black", paint: "#2a2d33",
      registeredIn: "Lahore", location: "Jinnahabad, Abbottabad", listed: "2026-10-02",
      description: "Sporty and refined, this Civic RS combines turbocharged performance with a quiet cabin. Single owner, driven mostly on city roads.",
      features: ["Sunroof", "LED headlamps", "Lane watch camera", "Leather seats", "Paddle shifters"],
      images: []
    },
    {
      id: "V103", demo: true, featured: true,
      make: "Toyota", model: "Fortuner", variant: "2.8 Sigma 4",
      year: 2020, price: 13800000, mileage: 61000,
      transmission: "Automatic", fuel: "Diesel", engine: "2800 cc",
      body: "suv", colour: "Attitude Black", paint: "#1e2126",
      registeredIn: "Islamabad", location: "Kakul Road, Abbottabad", listed: "2026-09-29",
      description: "A capable 4x4 for hill roads and family travel. Strong diesel engine, high ground clearance and seven seats.",
      features: ["4x4", "7 seats", "Hill start assist", "Rear AC vents", "Smart key"],
      images: []
    },
    {
      id: "V104", demo: true, featured: false,
      make: "Suzuki", model: "Cultus", variant: "VXL AGS",
      year: 2022, price: 3550000, mileage: 31000,
      transmission: "Automatic", fuel: "Petrol", engine: "1000 cc",
      body: "hatchback", colour: "Cerulean Blue", paint: "#2f5b8c",
      registeredIn: "Abbottabad", location: "Supply, Abbottabad", listed: "2026-09-27",
      description: "Economical hatchback with an automatic gear shift, easy to park in busy bazaars and light on fuel.",
      features: ["Power windows", "ABS", "Touchscreen", "Rear parking sensors"],
      images: []
    },
    {
      id: "V105", demo: true, featured: false,
      make: "Suzuki", model: "Alto", variant: "VXR",
      year: 2023, price: 2450000, mileage: 14000,
      transmission: "Manual", fuel: "Petrol", engine: "660 cc",
      body: "hatchback", colour: "Silky Silver", paint: "#b9bcc2",
      registeredIn: "Abbottabad", location: "Mandian, Abbottabad", listed: "2026-09-25",
      description: "A practical first car with very low running costs. Lightly used and kept clean.",
      features: ["Air conditioning", "Power steering", "Central locking"],
      images: []
    },
    {
      id: "V106", demo: true, featured: false,
      make: "Honda", model: "City", variant: "1.5 Aspire",
      year: 2019, price: 4100000, mileage: 74000,
      transmission: "Automatic", fuel: "Petrol", engine: "1500 cc",
      body: "sedan", colour: "Taffeta White", paint: "#efede8",
      registeredIn: "Peshawar", location: "Nawanshehr, Abbottabad", listed: "2026-09-22",
      description: "Reliable family sedan with a spacious boot and comfortable rear seats.",
      features: ["Multimedia", "Alloy wheels", "Fog lamps", "Rear defogger"],
      images: []
    },
    {
      id: "V107", demo: true, featured: false,
      make: "Kia", model: "Sportage", variant: "AWD",
      year: 2021, price: 7600000, mileage: 39000,
      transmission: "Automatic", fuel: "Petrol", engine: "2000 cc",
      body: "suv", colour: "Steel Grey", paint: "#5d636c",
      registeredIn: "Islamabad", location: "Jinnahabad, Abbottabad", listed: "2026-09-20",
      description: "Comfortable crossover with all-wheel drive, well suited to Galyat and hill roads in winter.",
      features: ["AWD", "Panoramic sunroof", "Ventilated seats", "Smart tailgate"],
      images: []
    },
    {
      id: "V108", demo: true, featured: false,
      make: "Toyota", model: "Yaris", variant: "ATIV X CVT 1.5",
      year: 2023, price: 5150000, mileage: 12000,
      transmission: "Automatic", fuel: "Petrol", engine: "1500 cc",
      body: "sedan", colour: "Grey Metallic", paint: "#7a7f86",
      registeredIn: "Abbottabad", location: "Supply, Abbottabad", listed: "2026-09-18",
      description: "Nearly new Yaris with low mileage and a smooth CVT. A sensible, efficient sedan.",
      features: ["Push start", "Reverse camera", "Auto headlamps", "Alloy wheels"],
      images: []
    },
    {
      id: "V109", demo: true, featured: false,
      make: "Suzuki", model: "Wagon R", variant: "VXL",
      year: 2019, price: 2550000, mileage: 82000,
      transmission: "Manual", fuel: "Petrol", engine: "1000 cc",
      body: "hatchback", colour: "Pearl Red", paint: "#8c2f33",
      registeredIn: "Abbottabad", location: "Kakul Road, Abbottabad", listed: "2026-09-12",
      description: "Roomy, tall hatchback with good headroom and simple, affordable maintenance.",
      features: ["Air conditioning", "Power windows", "Music system"],
      images: []
    },
    {
      id: "V110", demo: true, featured: false,
      make: "Toyota", model: "Corolla Cross", variant: "1.8 HEV",
      year: 2023, price: 10900000, mileage: 18000,
      transmission: "Automatic", fuel: "Hybrid", engine: "1800 cc Hybrid",
      body: "suv", colour: "Celestite Grey", paint: "#8d949b",
      registeredIn: "Islamabad", location: "Mandian, Abbottabad", listed: "2026-10-06",
      description: "Hybrid crossover offering excellent fuel economy with a practical, raised driving position.",
      features: ["Hybrid system", "Adaptive cruise control", "Lane assist", "Wireless charging"],
      images: []
    }
  ],

  properties: [
    {
      id: "P201", demo: true, featured: true,
      purpose: "sale", type: "house",
      title: "10 Marla House in Jinnahabad",
      price: 38500000, area: { value: 10, unit: "marla" },
      bedrooms: 5, bathrooms: 5,
      location: "Jinnahabad, Abbottabad", listed: "2026-10-05",
      description: "A double-storey family home on a quiet street, with a lawn, separate drawing room and open views towards the hills.",
      features: ["Double storey", "Lawn", "Car porch for 2 cars", "Separate drawing and dining", "Gas and electricity connected"],
      images: []
    },
    {
      id: "P202", demo: true, featured: true,
      purpose: "rent", type: "apartment",
      title: "2 Bed Apartment near Supply Bazaar",
      price: 55000, area: { value: 4, unit: "marla" },
      bedrooms: 2, bathrooms: 2,
      location: "Supply, Abbottabad", listed: "2026-10-03",
      description: "Bright second-floor apartment within walking distance of Supply Bazaar, suitable for a small family or working professionals.",
      features: ["Second floor", "Balcony", "Fitted kitchen", "Covered parking", "Water storage"],
      images: []
    },
    {
      id: "P203", demo: true, featured: true,
      purpose: "sale", type: "plot",
      title: "1 Kanal Residential Plot on Kakul Road",
      price: 42000000, area: { value: 1, unit: "kanal" },
      bedrooms: null, bathrooms: null,
      location: "Kakul Road, Abbottabad", listed: "2026-09-30",
      description: "Level residential plot with road frontage, ready for construction. Documents can be reviewed during the viewing.",
      features: ["Corner plot", "Road frontage", "Level land", "Electricity nearby"],
      images: []
    },
    {
      id: "P204", demo: true, featured: false,
      purpose: "rent", type: "house",
      title: "7 Marla House for Rent in Mandian",
      price: 85000, area: { value: 7, unit: "marla" },
      bedrooms: 4, bathrooms: 3,
      location: "Mandian, Abbottabad", listed: "2026-09-28",
      description: "Well-maintained family house available for rent, close to schools and the main Mansehra Road.",
      features: ["Ground and first floor", "Car porch", "Servant quarter", "Rooftop access"],
      images: []
    },
    {
      id: "P205", demo: true, featured: false,
      purpose: "sale", type: "commercial",
      title: "Commercial Shop on Mansehra Road",
      price: 24000000, area: { value: 2, unit: "marla" },
      bedrooms: null, bathrooms: 1,
      location: "Mansehra Road, Abbottabad", listed: "2026-09-26",
      description: "Ground-floor shop on a busy stretch of Mansehra Road with strong passing trade and roller shutter front.",
      features: ["Ground floor", "Main road frontage", "Roller shutter", "Washroom"],
      images: []
    },
    {
      id: "P206", demo: true, featured: false,
      purpose: "sale", type: "plot",
      title: "5 Marla Plot in Habibullah Colony",
      price: 9500000, area: { value: 5, unit: "marla" },
      bedrooms: null, bathrooms: null,
      location: "Habibullah Colony, Abbottabad", listed: "2026-09-24",
      description: "Compact residential plot in an established neighbourhood, suitable for a single-family home.",
      features: ["Residential", "Street access", "Established area"],
      images: []
    },
    {
      id: "P207", demo: true, featured: false,
      purpose: "sale", type: "apartment",
      title: "3 Bed Apartment in Nawanshehr",
      price: 16500000, area: { value: 6, unit: "marla" },
      bedrooms: 3, bathrooms: 3,
      location: "Nawanshehr, Abbottabad", listed: "2026-09-21",
      description: "Spacious apartment with hill views, a separate lounge and a well-planned kitchen.",
      features: ["Hill view", "Lift", "Separate lounge", "Parking space"],
      images: []
    },
    {
      id: "P208", demo: true, featured: false,
      purpose: "rent", type: "commercial",
      title: "First-Floor Office Space in Main Bazaar",
      price: 120000, area: { value: 8, unit: "marla" },
      bedrooms: null, bathrooms: 2,
      location: "Main Bazaar, Abbottabad", listed: "2026-09-19",
      description: "Open-plan office floor in the centre of town, suitable for a clinic, academy or company office.",
      features: ["Open plan", "Two washrooms", "Backup wiring", "Stair and lift access"],
      images: []
    },
    {
      id: "P209", demo: true, featured: false,
      purpose: "sale", type: "house",
      title: "2 Kanal House with Garden near PMA Road",
      price: 98000000, area: { value: 2, unit: "kanal" },
      bedrooms: 6, bathrooms: 7,
      location: "Kakul Road, Abbottabad", listed: "2026-09-15",
      description: "Large family residence set in a mature garden, with generous living spaces and a separate guest wing.",
      features: ["Large garden", "Guest wing", "Basement", "Parking for 4 cars", "Gas heating"],
      images: []
    },
    {
      id: "P210", demo: true, featured: false,
      purpose: "rent", type: "apartment",
      title: "1 Bed Studio Apartment in Jinnahabad",
      price: 32000, area: { value: 3, unit: "marla" },
      bedrooms: 1, bathrooms: 1,
      location: "Jinnahabad, Abbottabad", listed: "2026-10-07",
      description: "Compact, furnished studio apartment, suitable for a student or single professional.",
      features: ["Furnished", "Ground floor", "Separate entrance"],
      images: []
    }
  ]
};
