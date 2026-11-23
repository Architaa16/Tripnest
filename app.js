/* TripNest front-end behaviour. No AI API, external data API or backend is used. */
(() => {
  "use strict";

  const destinations = window.TRIPNEST_DESTINATIONS || [];
  const articles = window.TRIPNEST_ARTICLES || [];
  const money = value => new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0
  }).format(value);
  const byId = id => document.getElementById(id);

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function initCommon() {
    document.querySelectorAll(".current-year").forEach(el => {
      el.textContent = new Date().getFullYear();
    });
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });
    }

    const quickSelect = byId("quickDestination");
    if (quickSelect) populateDestinationSelect(quickSelect);

    const quickForm = byId("quickSearch");
    if (quickForm) quickForm.addEventListener("submit", event => {
      event.preventDefault();
      const destination = byId("quickDestination").value;
      const days = byId("quickDays").value;
      if (!destination) return;
      window.location.href = `planner.html?destination=${encodeURIComponent(destination)}&days=${encodeURIComponent(days)}`;
    });

    const newsletter = byId("newsletterForm");
    if (newsletter) newsletter.addEventListener("submit", event => {
      event.preventDefault();
      const message = byId("newsletterMessage");
      message.textContent = "Thanks! This demo doesn't transmit or save email addresses yet.";
      newsletter.reset();
    });
  }

  function populateDestinationSelect(select) {
    destinations.forEach(destination => {
      const option = document.createElement("option");
      option.value = destination.id;
      option.textContent = `${destination.name}, ${destination.state}`;
      select.appendChild(option);
    });
  }

  function destinationCard(destination) {
    const saved = getSavedPlaces().includes(destination.id);
    return `
      <article class="destination-card">
        <div class="destination-photo" style="background-image:url('${escapeHTML(destination.image)}')">
          <span class="photo-tag">${escapeHTML(destination.tag)}</span>
          <button class="save-heart ${saved ? "saved" : ""}" type="button" data-save-place="${escapeHTML(destination.id)}" aria-label="${saved ? "Remove" : "Save"} ${escapeHTML(destination.name)}">${saved ? "♥" : "♡"}</button>
        </div>
        <div class="destination-card-body">
          <div class="card-meta">${escapeHTML(destination.state)} · ${escapeHTML(destination.duration)}</div>
          <h3>${escapeHTML(destination.name)}</h3>
          <p>${escapeHTML(destination.description)}</p>
          <div class="card-bottom"><strong>From ${money(destination.dailyBudget)}/person/day*</strong><a href="destination.html?id=${encodeURIComponent(destination.id)}">Discover ↗</a></div>
        </div>
      </article>`;
  }

  function getSavedPlaces() {
    try { return JSON.parse(localStorage.getItem("tripnestSavedPlaces") || "[]"); }
    catch { return []; }
  }

  function setSavedPlaces(places) {
    try { localStorage.setItem("tripnestSavedPlaces", JSON.stringify(places)); }
    catch { /* Local storage can be disabled by the browser. */ }
  }

  function initDestinationCards() {
    const featured = byId("featuredDestinations");
    if (featured) featured.innerHTML = destinations.slice(0, 3).map(destinationCard).join("");

    const all = byId("allDestinations");
    if (all) {
      const search = byId("destinationSearch");
      const mood = byId("moodFilter");
      const render = () => {
        const query = search.value.trim().toLowerCase();
        const selectedMood = mood.value;
        const results = destinations.filter(destination => {
          const text = `${destination.name} ${destination.state} ${destination.description} ${destination.tag}`.toLowerCase();
          return text.includes(query) && (selectedMood === "all" || destination.mood.includes(selectedMood));
        });
        all.innerHTML = results.map(destinationCard).join("");
        byId("destinationCount").textContent = `${results.length} ${results.length === 1 ? "destination" : "destinations"} to explore`;
        byId("noDestinations").classList.toggle("hidden", results.length > 0);
      };
      search.addEventListener("input", render);
      mood.addEventListener("change", render);
      render();
    }

    document.addEventListener("click", event => {
      const button = event.target.closest("[data-save-place]");
      if (!button) return;
      const id = button.dataset.savePlace;
      const places = getSavedPlaces();
      const updated = places.includes(id) ? places.filter(item => item !== id) : [...places, id];
      setSavedPlaces(updated);
      initDestinationCards();
      renderDestinationDetail();
    });
  }

  function renderDestinationDetail() {
    const host = byId("destinationDetail");
    if (!host) return;
    const params = new URLSearchParams(window.location.search);
    const destination = destinations.find(item => item.id === params.get("id")) || destinations[0];
    if (!destination) {
      host.innerHTML = "<p>Destination not found. <a href='destinations.html'>Browse destinations</a>.</p>";
      return;
    }
    document.title = `${destination.name} travel guide — TripNest`;
    const saved = getSavedPlaces().includes(destination.id);
    host.innerHTML = `
      <section class="detail-hero" style="background-image:url('${escapeHTML(destination.image)}')">
        <div class="detail-hero-shade"></div>
        <div class="detail-hero-content wrap">
          <p class="eyebrow light">${escapeHTML(destination.state.toUpperCase())} · TRAVEL GUIDE</p>
          <h1>${escapeHTML(destination.name)}<br><em>is calling.</em></h1>
          <p>${escapeHTML(destination.description)}</p>
          <a class="button button-light" href="planner.html?destination=${encodeURIComponent(destination.id)}&days=3">Plan this trip ↗</a>
        </div>
      </section>
      <section class="section wrap">
        <div class="detail-stats">
          <div><span>Suggested stay</span><strong>${escapeHTML(destination.duration)}</strong></div>
          <div><span>Sample daily budget</span><strong>${money(destination.dailyBudget)} / person*</strong></div>
          <div><span>Best-time note</span><strong>${escapeHTML(destination.bestTime)}</strong></div>
        </div>
        <div class="section-head detail-heading"><div><p class="eyebrow">MAKE A LITTLE LIST</p><h2>Places to explore</h2></div><button class="small-button" data-save-place="${escapeHTML(destination.id)}">${saved ? "♥ Saved" : "♡ Save destination"}</button></div>
        <div class="detail-place-grid">${destination.places.map(place => `<div class="detail-place"><span>✦</span><strong>${escapeHTML(place.name)}</strong></div>`).join("")}</div>
        <p class="budget-note">*Budget figures are illustrative sample estimates, not live prices. Verify transport, opening hours, local rules and costs with reliable current sources before travelling.</p>
        <div class="callout detail-callout"><div><p class="eyebrow">READY WHEN YOU ARE</p><h2>Make your own itinerary.</h2></div><a class="button button-dark" href="planner.html?destination=${encodeURIComponent(destination.id)}&days=3">Plan ${escapeHTML(destination.name)} ↗</a></div>
      </section>`;
  }

  function initPlanner() {
    const form = byId("tripForm");
    if (!form) return;
    const select = byId("destination");
    populateDestinationSelect(select);
    const params = new URLSearchParams(window.location.search);
    if (params.has("destination") && destinations.some(item => item.id === params.get("destination"))) {
      select.value = params.get("destination");
    }
    if (params.has("days")) {
      const days = Number(params.get("days"));
      if (Number.isInteger(days) && days >= 1 && days <= 10) byId("days").value = days;
    }

    form.addEventListener("submit", event => {
      event.preventDefault();
      const destination = destinations.find(item => item.id === select.value);
      const days = Number(byId("days").value);
      const travellers = Number(byId("travellers").value);
      const budget = Number(byId("budget").value);
      const style = byId("travelStyle").value;
      if (!destination || !Number.isInteger(days) || days < 1 || days > 10 ||
          !Number.isInteger(travellers) || travellers < 1 || travellers > 20 ||
          !Number.isFinite(budget) || budget < 500) {
        alert("Please check your destination, number of days, travellers and budget.");
        return;
      }

      const interests = [...document.querySelectorAll('input[name="interest"]:checked')].map(input => input.value);
      const styleMultiplier = { budget: 1, comfort: 1.55, premium: 2.35 }[style] || 1;
      const dailyCost = Math.round(destination.dailyBudget * styleMultiplier);
      const estimate = dailyCost * days * travellers;
      const places = destination.places.slice();
      let selectedPlaces = places.filter(place => interests.some(interest => place.interests.includes(interest)));
      if (selectedPlaces.length < 2) selectedPlaces = places;
      if (selectedPlaces.length === 0) selectedPlaces = places;
      const dayCards = [];
      for (let day = 0; day < days; day++) {
        const firstIndex = (day * 2) % selectedPlaces.length;
        const secondIndex = (day * 2 + 1) % selectedPlaces.length;
        const first = selectedPlaces[firstIndex];
        const second = selectedPlaces.length > 1 ? selectedPlaces[secondIndex] : null;
        dayCards.push(`<article class="day-card"><h3>Day ${day + 1} <span>— ${day === 0 ? "Get your bearings" : day === days - 1 ? "Take it at your pace" : "Explore a little more"}</span></h3><ul><li>${escapeHTML(first.name)}</li>${second && second.name !== first.name ? `<li>${escapeHTML(second.name)}</li>` : ""}<li>Leave time for meals, travel and spontaneous stops</li></ul></article>`);
      }

      const result = byId("tripResult");
      result.classList.remove("hidden");
      result.innerHTML = `
        <div class="result-top"><div><p class="eyebrow">YOUR TRIP OUTLINE</p><h2>${escapeHTML(destination.name)}</h2><p>${days} days · ${travellers} traveller${travellers === 1 ? "" : "s"} · ${escapeHTML(style)} style</p></div>
          <div class="result-actions"><button class="small-button" id="saveTrip" type="button">♡ Save trip</button><button class="small-button" id="printTrip" type="button">Print / PDF</button></div>
        </div>
        <div class="itinerary-list">${dayCards.join("")}</div>
        <div class="budget-summary">
          <div class="budget-item"><span>Estimated total</span><strong>${money(estimate)}</strong></div>
          <div class="budget-item"><span>Per traveller</span><strong>${money(dailyCost * days)}</strong></div>
          <div class="budget-item"><span>Your budget</span><strong>${money(budget)}</strong></div>
        </div>
        <div class="budget-status ${estimate > budget ? "over" : ""}">${estimate > budget ? `This sample estimate is ${money(estimate - budget)} above your budget. Try fewer days or a lower-cost style.` : `This sample estimate is ${money(budget - estimate)} under your budget. Keep some money aside for unexpected costs.`}</div>
        <p class="budget-note">This estimate uses a sample per-person daily allowance for ${escapeHTML(destination.name)}. It excludes long-distance travel to the destination and may not reflect current prices. Verify all costs before booking. The itinerary is a starter outline, not a checked route or opening-hours schedule.</p>`;

      const trip = { destinationId: destination.id, destination: destination.name, days, travellers, budget, style, interests, estimate, created: new Date().toISOString() };
      byId("saveTrip").addEventListener("click", () => saveTrip(trip));
      byId("printTrip").addEventListener("click", () => window.print());
      result.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    renderSavedTrips();
    const clear = byId("clearSaved");
    if (clear) clear.addEventListener("click", () => {
      if (confirm("Remove all saved trip plans from this browser?")) {
        try { localStorage.removeItem("tripnestSavedTrips"); } catch {}
        renderSavedTrips();
      }
    });
  }

  function getSavedTrips() {
    try { return JSON.parse(localStorage.getItem("tripnestSavedTrips") || "[]"); }
    catch { return []; }
  }

  function saveTrip(trip) {
    const trips = getSavedTrips();
    trips.unshift(trip);
    try {
      localStorage.setItem("tripnestSavedTrips", JSON.stringify(trips.slice(0, 10)));
      renderSavedTrips();
      const button = byId("saveTrip");
      if (button) button.textContent = "✓ Saved";
    } catch {
      alert("Your browser did not allow this trip to be saved.");
    }
  }

  function renderSavedTrips() {
    const host = byId("savedTrips");
    if (!host) return;
    const trips = getSavedTrips();
    if (!trips.length) {
      host.innerHTML = '<p class="muted">Your saved trip plans will appear here on this device.</p>';
      return;
    }
    host.innerHTML = trips.map((trip, index) => `
      <article class="saved-trip"><h3>${escapeHTML(trip.destination)}</h3>
      <p>${trip.days} days · ${trip.travellers} traveller(s)<br>Estimate: ${money(trip.estimate)}</p>
      <button class="small-button" data-reload-trip="${index}" type="button">Load plan</button>
      <button class="small-button" data-delete-trip="${index}" type="button">Remove</button></article>`).join("");
    host.querySelectorAll("[data-reload-trip]").forEach(button => button.addEventListener("click", () => {
      const trip = trips[Number(button.dataset.reloadTrip)];
      byId("destination").value = trip.destinationId;
      byId("days").value = trip.days;
      byId("travellers").value = trip.travellers;
      byId("budget").value = trip.budget;
      byId("travelStyle").value = trip.style;
      document.querySelectorAll('input[name="interest"]').forEach(input => { input.checked = trip.interests.includes(input.value); });
      byId("tripForm").requestSubmit();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }));
    host.querySelectorAll("[data-delete-trip]").forEach(button => button.addEventListener("click", () => {
      const next = getSavedTrips().filter((_, index) => index !== Number(button.dataset.deleteTrip));
      try { localStorage.setItem("tripnestSavedTrips", JSON.stringify(next)); } catch {}
      renderSavedTrips();
    }));
  }

  function articleCard(article) {
    return `<article class="article-card"><div class="article-image" style="background-image:url('${escapeHTML(article.image)}')"></div><div class="article-body"><span class="article-category">${escapeHTML(article.label)}</span><h3>${escapeHTML(article.title)}</h3><p>${escapeHTML(article.excerpt)}</p><a href="article.html?id=${encodeURIComponent(article.id)}">Read article ↗</a><p class="card-meta">${escapeHTML(article.read)}</p></div></article>`;
  }

  function initArticles() {
    const featured = byId("featuredArticles");
    if (featured) featured.innerHTML = articles.map(articleCard).join("");
    const grid = byId("articleGrid");
    if (grid) {
      const filter = byId("articleFilter");
      const render = () => {
        const matches = articles.filter(article => filter.value === "all" || article.category === filter.value);
        grid.innerHTML = matches.map(articleCard).join("");
      };
      filter.addEventListener("change", render);
      render();
    }
  }

  function renderArticleDetail() {
    const host = byId("articleDetail");
    if (!host) return;
    const params = new URLSearchParams(window.location.search);
    const article = articles.find(item => item.id === params.get("id"));
    if (!article) {
      host.innerHTML = "<h1>Article not found</h1><p><a href='blog.html'>Return to the journal</a>.</p>";
      return;
    }
    document.title = `${article.title} — TripNest`;
    host.innerHTML = `<p class="eyebrow">${escapeHTML(article.label)} · ${escapeHTML(article.read)}</p><h1>${escapeHTML(article.title)}</h1><p class="lead">${escapeHTML(article.excerpt)}</p><div class="article-detail-image" style="background-image:url('${escapeHTML(article.image)}')"></div>${article.sections.map(section => `<h2>${escapeHTML(section[0])}</h2><p>${escapeHTML(section[1])}</p>`).join("")}<p>Before travelling, verify current prices, local guidance, opening hours and transport details from reliable sources.</p><a class="button button-dark" href="planner.html">Plan a trip ↗</a>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    initCommon();
    initDestinationCards();
    renderDestinationDetail();
    initPlanner();
    initArticles();
    renderArticleDetail();
  });
})();
