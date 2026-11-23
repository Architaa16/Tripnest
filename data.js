/* TripNest sample content.
   Replace descriptions, costs and image URLs with researched, accurate information before launch. */
window.TRIPNEST_DESTINATIONS = [
  {
    id: "jaipur", name: "Jaipur", state: "Rajasthan", country: "India",
    mood: ["culture", "shopping", "food"], duration: "2–4 days", dailyBudget: 2200,
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1000&q=80",
    tag: "HERITAGE & COLOUR", description: "Explore rose-coloured streets, grand forts, lively bazaars and Rajasthani flavours.",
    bestTime: "October to March (generally)", places: [
      { name: "Hawa Mahal", interests: ["culture", "shopping"] },
      { name: "City Palace", interests: ["culture"] },
      { name: "Amber Fort", interests: ["culture", "adventure"] },
      { name: "Jal Mahal viewpoint", interests: ["nature", "culture"] },
      { name: "Johari Bazaar", interests: ["shopping", "food"] },
      { name: "Local Rajasthani food stop", interests: ["food"] },
      { name: "Nahargarh Fort viewpoint", interests: ["nature", "culture"] }
    ]
  },
  {
    id: "meghalaya", name: "Meghalaya", state: "Meghalaya", country: "India",
    mood: ["nature", "adventure"], duration: "4–6 days", dailyBudget: 2800,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80",
    tag: "MOUNTAINS & WATERFALLS", description: "Find misty hills, waterfalls, caves and remarkable living-root bridges.",
    bestTime: "Weather varies by season; research conditions before travel", places: [
      { name: "Shillong town walk", interests: ["culture", "food"] },
      { name: "Elephant Falls", interests: ["nature"] },
      { name: "Cherrapunji viewpoints", interests: ["nature"] },
      { name: "Mawsmai Cave", interests: ["adventure"] },
      { name: "Nohkalikai Falls viewpoint", interests: ["nature"] },
      { name: "Local market and food stop", interests: ["food", "culture"] },
      { name: "Living root bridge area", interests: ["nature", "adventure"] },
      { name: "Dawki / Umngot River area", interests: ["nature", "adventure"] }
    ]
  },
  {
    id: "goa", name: "Goa", state: "Goa", country: "India",
    mood: ["beach", "food", "culture"], duration: "3–5 days", dailyBudget: 3000,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80",
    tag: "SALT AIR & SLOW DAYS", description: "Mix coastal downtime with old neighbourhoods, Portuguese-era heritage and local food.",
    bestTime: "November to February is popular; check seasonal conditions", places: [
      { name: "Panaji heritage walk", interests: ["culture", "food"] },
      { name: "Fort Aguada", interests: ["culture"] },
      { name: "Candolim beach time", interests: ["beach", "nature"] },
      { name: "Local seafood or Goan meal", interests: ["food"] },
      { name: "Old Goa heritage sites", interests: ["culture"] },
      { name: "Anjuna market area", interests: ["shopping", "culture"] },
      { name: "Sunset at a suitable beach", interests: ["beach", "nature"] },
      { name: "South Goa beach day", interests: ["beach", "nature"] }
    ]
  },
  {
    id: "udaipur", name: "Udaipur", state: "Rajasthan", country: "India",
    mood: ["culture", "nature", "food"], duration: "2–3 days", dailyBudget: 2600,
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1000&q=80",
    tag: "LAKES & PALACES", description: "Spend slow days beside lakes, explore old lanes and admire the city’s palace architecture.",
    bestTime: "October to March is generally popular", places: [
      { name: "City Palace", interests: ["culture"] },
      { name: "Lake Pichola waterfront", interests: ["nature"] },
      { name: "Jagdish Temple area", interests: ["culture"] },
      { name: "Old-city café or food stop", interests: ["food"] },
      { name: "Saheliyon-ki-Bari", interests: ["nature", "culture"] },
      { name: "Bagore Ki Haveli area", interests: ["culture"] },
      { name: "Fateh Sagar Lake", interests: ["nature", "food"] }
    ]
  },
  {
    id: "rishikesh", name: "Rishikesh", state: "Uttarakhand", country: "India",
    mood: ["nature", "adventure"], duration: "2–3 days", dailyBudget: 2000,
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80",
    tag: "RIVER & RESET", description: "A Himalayan foothills escape for river views, peaceful walks and outdoor activities.",
    bestTime: "Check local weather and river activity advisories", places: [
      { name: "Ram Jhula area", interests: ["culture", "nature"] },
      { name: "Triveni Ghat", interests: ["culture"] },
      { name: "Riverside walk", interests: ["nature"] },
      { name: "Café and local food stop", interests: ["food"] },
      { name: "Neer Garh waterfall route", interests: ["nature", "adventure"] },
      { name: "Yoga or meditation session", interests: ["nature"] },
      { name: "Local market walk", interests: ["shopping", "culture"] }
    ]
  },
  {
    id: "puri", name: "Puri", state: "Odisha", country: "India",
    mood: ["beach", "culture", "food"], duration: "2–3 days", dailyBudget: 1800,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    tag: "COASTAL CALM", description: "Plan a coastal break with beach time, local cuisine and nearby heritage excursions.",
    bestTime: "Check seasonal weather and local temple visitor guidance", places: [
      { name: "Puri beach promenade", interests: ["beach", "nature"] },
      { name: "Jagannath Temple area (check visitor rules)", interests: ["culture"] },
      { name: "Local Odia food stop", interests: ["food"] },
      { name: "Golden Beach", interests: ["beach"] },
      { name: "Raghurajpur heritage village", interests: ["culture"] },
      { name: "Konark Sun Temple day trip", interests: ["culture"] },
      { name: "Local market walk", interests: ["shopping"] }
    ]
  }
];

window.TRIPNEST_ARTICLES = [
  {
    id: "weekend-escape", category: "weekend", label: "WEEKEND BREAKS",
    title: "How to plan a weekend escape without rushing",
    excerpt: "A calmer approach to short trips: pick one base, leave room for detours and plan travel time honestly.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    read: "4 min read",
    sections: [
      ["Start with travel time", "A two-day trip can feel much shorter once check-in, traffic and the return journey are included. Choose a destination that leaves you time to enjoy being there."],
      ["Pick one main experience per day", "Build each day around one anchor activity. Add nearby food stops or a short walk rather than crossing the city repeatedly."],
      ["Keep a flexible budget", "Separate transport, stay, meals and activities. Leave a small buffer for changes and check current prices before confirming plans."]
    ]
  },
  {
    id: "budget-basics", category: "budget", label: "BUDGET TRAVEL",
    title: "A simple way to build a realistic travel budget",
    excerpt: "Break a trip into the big cost categories before you start comparing options.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80",
    read: "5 min read",
    sections: [
      ["List the fixed costs first", "Start with intercity transport and accommodation. These costs often shape the rest of the trip and can vary by date and demand."],
      ["Estimate daily spending", "Create a daily allowance for meals, local transport, entry fees and small purchases. Use current local prices rather than a generic national average."],
      ["Add a contingency", "Set aside a buffer for weather changes, delays or unexpected needs. A budget estimate is a planning aid, not a price guarantee."]
    ]
  },
  {
    id: "itinerary-not-overload", category: "planning", label: "TRIP PLANNING",
    title: "Build an itinerary that leaves space to breathe",
    excerpt: "More stops do not always make a better holiday. Try grouping nearby places and keeping your plan flexible.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80",
    read: "3 min read",
    sections: [
      ["Group places by area", "Put nearby attractions on the same day. This can reduce backtracking and give you more time at the places you care about."],
      ["Check opening hours", "Opening hours, tickets and local transport can change. Verify details with official sources close to your travel date."],
      ["Keep a backup option", "Weather, closures and tired feet are normal parts of travel. Choose one flexible alternative for each day rather than filling every hour."]
    ]
  }
];
