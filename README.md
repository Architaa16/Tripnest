# TripNest — Travel Planner Website

A front-end travel website built with plain HTML, CSS and JavaScript. It does not use an AI API, a backend, or a paid API.

## Run locally in VS Code

1. Extract the ZIP file.
2. Open the `TripNest` folder in Visual Studio Code.
3. Install the **Live Server** extension if it is not already installed.
4. Right-click `index.html` and choose **Open with Live Server**.
5. Explore the navigation, destination filters, planner and journal.

You can also open `index.html` directly in a browser, but Live Server is recommended.

## Pages and features

- `index.html`: home page and quick planner
- `destinations.html`: searchable and filterable destination list
- `destination.html?id=jaipur`: destination detail pages
- `planner.html`: itinerary generator, sample budget estimate, print/save trip
- `blog.html`: journal cards and category filter
- `article.html?id=budget-basics`: article detail pages
- `css/style.css`: site styling and responsive layout
- `css/details.css`: destination/article detail styling
- `js/data.js`: sample destination and article content
- `js/app.js`: client-side interactions

## Important notes

- Sample budgets are illustrative and are not live quotes. They exclude intercity travel unless you add it yourself.
- Itinerary suggestions are generated from static sample data. They do not verify routes, opening hours, safety conditions, weather, availability or current prices.
- Destination photos are loaded from Unsplash URLs, so an internet connection is needed for the photos. Replace them with properly licensed images before commercial use.
- The newsletter is a demo only. It does not send or store email addresses.
- Saved places and trips use the browser's `localStorage` on the current device only. There is no account system or cloud database.
- Before public launch, review image licenses, factual accuracy, accessibility, privacy/cookie requirements and terms relevant to your location and monetization.

## Publish later

You can publish the static website using GitHub Pages, Netlify, or Vercel. Test all pages locally first, then follow the chosen host's current instructions.
