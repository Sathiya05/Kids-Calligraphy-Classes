/* ==========================================================================
   WriteBright — pricing.js
   1. Plan rendering (Starter / Growth / Creative)
   2. Billing toggle — monthly vs 3-month term
   3. Plan selection state (used by the CTA and the enquiry link)
   4. Comparison table rendering + row highlighting
   5. Enrolment CTA wiring
   ========================================================================== */
(function () {
  "use strict";

  var WB = window.WB || {};

  var FALLBACK_PLANS = [
    { id: "starter", name: "Starter", price: 999, classes: 4, recommended: false,
      summary: "A gentle start with regular guided practice.",
      features: ["4 classes per month", "Practice worksheets", "Basic progress tracking"],
      notIncluded: [ "Calligraphy sessions", "Personalized feedback"] },
    { id: "growth", name: "Growth", price: 1799, classes: 8, recommended: true,
      summary: "More classes plus regular sample reviews.",
      features: ["8 classes per month", "Practice worksheets", "Sample reviews", "Progress tracking", "Priority batch booking"],
      notIncluded: ["Calligraphy sessions"] },
    { id: "creative", name: "Creative", price: 2499, classes: 12, recommended: false,
      summary: "Adds calligraphy practice and personal feedback.",
      features: ["12 classes per month", "Practice worksheets", "Sample reviews", "Progress tracking", "Calligraphy sessions", "Personalized feedback"],
      notIncluded: [] }
  ];

  var PLANS = (window.WB_DATA && window.WB_DATA.plans) || FALLBACK_PLANS;

  var TERM_OFFER = 0.9; /* 3-month term billed monthly at 10% less */
  var state = { cycle: "monthly", selected: null };

  function esc(s) {
    return String(s === undefined || s === null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function rupee(n) {
    return "₹" + Number(Math.round(n)).toLocaleString("en-IN");
  }
  function displayPrice(plan) {
    return state.cycle === "term" ? plan.price * TERM_OFFER : plan.price;
  }
  function saving(plan) {
    return plan.price - plan.price * TERM_OFFER;
  }

  /* ==================================================================
     1. PLAN CARDS
     ================================================================== */
  function planCard(p, i) {
    var price = displayPrice(p);
    var feats = p.features
      .map(function (f) {
        return (
          '<li class="flex items-start gap-2.5 text-[0.94rem]">' +
          '<span class="mt-1 shrink-0 grid place-items-center w-5 h-5 rounded-full" style="background:var(--wb-success-100,#E2F4ED);color:var(--wb-success)" aria-hidden="true">' +
          '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' +
          "</span>" + esc(f) + "</li>"
        );
      })
      .join("");

    var nots = (p.notIncluded || [])
      .map(function (f) {
        return (
          '<li class="flex items-start gap-2.5 text-[0.94rem]" style="color:var(--wb-ink-400)">' +
          '<span class="mt-1 shrink-0 grid place-items-center w-5 h-5 rounded-full" style="background:#F0EFEE" aria-hidden="true">' +
          '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
          "</span>" + esc(f) + "</li>"
        );
      })
      .join("");

    return (
      '<article class="wb-card wb-card-hover p-7 flex flex-col relative wb-reveal" data-plan="' + esc(p.id) + '" data-delay="' + (i + 1) + '" aria-labelledby="plan-' + esc(p.id) + '">' +
        (p.recommended ? '<span class="wb-badge wb-badge-accent absolute -top-3 left-6 shadow-sm">Most chosen</span>' : "") +
        '<div class="flex items-center justify-between gap-3 mb-4' + (p.recommended ?" mt-1" : "") + '">' +
          '<span class="wb-badge ' + (p.recommended ?"wb-badge-accent" : "wb-badge-purple") + '">' + esc(p.name) + "</span>" +
          '<button type="button" class="wb-btn wb-btn-sm wb-btn-quiet" data-select-plan="' + esc(p.id) + '" aria-pressed="false">Select</button>' +
        "</div>" +
        '<p class="flex items-end gap-1.5 mb-2">' +
          '<span data-price style="font-size:3rem;line-height:1;color:var(--wb-primary)">' + rupee(price) + "</span>" +
          '<span class="mb-1 text-[0.92rem] font-semibold" style="color:var(--wb-ink-500)">/ month</span>' +
        "</p>" +
        '<p class="text-[0.82rem] font-semibold mb-4 m-0" data-saving-note style="color:var(--wb-success)">' +
          (state.cycle === "term" ? "Billed on a 3-month term · saves " + rupee(saving(p)) + " per month" : "Billed monthly · cancel with one week&rsquo;s notice") +
        "</p>" +
        '<p class="text-[0.92rem] mb-5" style="color:var(--wb-ink-500)">' + esc(p.summary) + "</p>" +
        '<p class="text-[0.72rem] font-bold uppercase tracking-widest text-ink-400 mb-2">What&rsquo;s included</p>' +
        '<ul class="list-none m-0 p-0 flex flex-col gap-2.5 mb-5">' + feats + "</ul>" +
        (nots ? '<p class="text-[0.72rem] font-bold uppercase tracking-widest text-ink-400 mb-2">Not included</p><ul class="list-none m-0 p-0 flex flex-col gap-2.5 mb-5">' + nots + "</ul>" : "") +
        '<div class="mt-auto pt-2">' +
          '<button type="button" class="wb-btn wb-btn-block ' + (p.recommended ?"wb-btn-primary" : "wb-btn-outline") + '" data-enroll-plan="' + esc(p.id) + '">Enroll Now</button>' +
          '<p class="wb-note mt-3 mb-0 text-center">Selected plan: <strong data-selected-plan>' + (state.selected ? esc(planName(state.selected)) : "none yet") + "</strong></p>" +
        "</div>" +
      "</article>"
    );
  }

  function planName(id) {
    var p = PLANS.filter(function (x) { return x.id === id; })[0];
    return p ? p.name : id;
  }

  function renderPlans() {
    var host = document.getElementById("pricingPlans");
    if (!host) return;
    host.innerHTML = PLANS.map(planCard).join("");
  }

  function refreshPrices() {
    document.querySelectorAll("#pricingPlans [data-plan]").forEach(function (card) {
      var id = card.getAttribute("data-plan");
      var p = PLANS.filter(function (x) { return x.id === id; })[0];
      if (!p) return;
      var priceEl = card.querySelector("[data-price]");
      var noteEl = card.querySelector("[data-saving-note]");
      if (priceEl) priceEl.textContent = rupee(displayPrice(p));
      if (noteEl)
        noteEl.textContent =
          state.cycle === "term"
            ? "Billed on a 3-month term · saves " + rupee(saving(p)) + " per month"
            : "Billed monthly · cancel with one week’s notice";
    });

    document.querySelectorAll("[data-cycle]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-cycle") === state.cycle ? "true" : "false");
    });
  }

  /* ==================================================================
     2. COMPARISON TABLE
     ================================================================== */
  var ROWS = [
    { label: "Classes per month", get: function (p) { return p.classes; }, type: "num" },
    { label: "Program eligibility", get: function () { return "Any program"; } },
    { label: "Practice worksheets", get: function () { return "Included"; } },
    { label: "Sample reviews", get: function (p) { return p.features.some(function (f) { return /Sample reviews/i.test(f); }) ? "Included" : "—"; } },
    { label: "Progress tracking", get: function (p) { return /Progress tracking/i.test(p.features.join(" ")) ? "Included" : "Basic"; } },
    { label: "Instructor feedback", get: function (p) { return /Personalized feedback/i.test(p.features.join(" ")) ? "Personalized" : "General"; } },
    { label: "Calligraphy sessions", get: function (p) { return /Calligraphy/i.test(p.features.join(" ")) ? "Included" : "—"; } },
    { label: "Batch booking priority", get: function (p) { return /Priority/i.test(p.features.join(" ")) ? "Yes" : "Standard"; } },
    { label: "Age-based batching", get: function () { return "Yes"; } },
    { label: "Parent dashboard access", get: function () { return "Yes"; } },
    { label: "Certificate at end", get: function (p) { return p.recommended ? "Yes" : "On request"; } }
  ];

  function renderTable() {
    var host = document.getElementById("comparisonTable");
    if (!host) return;

    var head =
      '<tr>' +
       '<th scope="col" class="text-center">Feature</th>' +
      PLANS.map(function (p) {
        return '<th scope="col" class="text-center" data-plan-col="' + esc(p.id) + '">' + esc(p.name) + "</th>";
      }).join("") +
      "</tr>";

    var body = ROWS.map(function (r) {
      return (
        "<tr>" +
        '<th scope="row" class="text-center" style="font-weight:600;color:var(--wb-ink-700)">' + esc(r.label) + "</th>" +
        PLANS.map(function (p) {
          var v = String(r.get(p));
          var mark =
            v === "Included"
              ? '<span class="wb-badge wb-badge-success">✓ Included</span>'
              : v === "—"
              ? '<span class="wb-badge wb-badge-neutral">—</span>'
              : '<span class="font-semibold">' + esc(v) + "</span>";
          return '<td class="text-center" data-label="' + esc(p.name) + '" data-plan-cell="' + esc(p.id) + '">' + mark + "</td>";
        }).join("") +
        "</tr>"
      );
    }).join("");

    host.innerHTML =
      '<div class="wb-table-wrap">' +
      '<div class="wb-table-scroll wb-scroll-thin" tabindex="0" role="region" aria-label="Scrollable table">' +
      '<table class="wb-table wb-table--cards"><caption class="wb-sr">Feature comparison of the Starter, Growth and Creative plans</caption>' +
      "<thead>" + head + "</thead><tbody>" + body + "</tbody></table>" +
      "</div></div>";
  }

  function highlightPlan(id) {
    var dark = document.body.classList.contains("dark-theme");
    document.querySelectorAll("[data-plan-col]").forEach(function (th) {
      th.style.background = th.getAttribute("data-plan-col") === id ? (dark ? "rgba(244,162,97,.22)" : "var(--wb-cream)") : "";
    });
    document.querySelectorAll("[data-plan-cell]").forEach(function (td) {
      td.style.background = td.getAttribute("data-plan-cell") === id ? (dark ? "rgba(244,162,97,.12)" : "rgba(255,241,199,.4)") : "";
    });
  }

  /* ==================================================================
     3. INTERACTIONS
     ================================================================== */
  function contactURL(params) {
    var base = (window.WriteBrightNav && window.WriteBrightNav.pages.contact) || "contact.html";
    var q = Object.keys(params)
      .filter(function (k) { return params[k]; })
      .map(function (k) { return k + "=" + encodeURIComponent(params[k]); })
      .join("&");
    return base + "?intent=enroll" + (q ? "&" + q : "");
  }

  function selectPlan(id, announce) {
    state.selected = id;
    document.querySelectorAll("[data-select-plan]").forEach(function (b) {
      var on = b.getAttribute("data-select-plan") === id;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.textContent = on ? "Selected ✓" : "Select";
      b.className = "wb-btn wb-btn-sm " + (on ? "wb-btn-primary" : "wb-btn-quiet");
    });
    document.querySelectorAll("[data-selected-plan]").forEach(function (n) {
      n.textContent = planName(id);
    });
    highlightPlan(id);
    var summary = document.getElementById("planSummary");
    if (summary) {
      var p = PLANS.filter(function (x) { return x.id === id; })[0];
      summary.textContent =
        p.name + " plan · " + rupee(displayPrice(p)) + " per month · " + p.classes + " classes" +
        (state.cycle === "term" ? " · billed on a 3-month term" : " · billed monthly");
    }
    var link = document.getElementById("planEnrollLink");
    if (link) link.href = contactURL({ plan: planName(id), amount: rupee(displayPrice(p)) });
    if (announce && WB.toast) {
      WB.toast(planName(id) + " plan selected. Choose 'Enroll Now' to continue.", "success");
    }
  }

  function wire() {
    /* billing toggle */
    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-cycle]");
      if (b) {
        state.cycle = b.getAttribute("data-cycle");
        refreshPrices();
        if (state.selected) selectPlan(state.selected, false);
        return;
      }

      var sel = e.target.closest("[data-select-plan]");
      if (sel) {
        selectPlan(sel.getAttribute("data-select-plan"), true);
        return;
      }

      var en = e.target.closest("[data-enroll-plan]");
      if (en) {
        var id = en.getAttribute("data-enroll-plan");
        var p = PLANS.filter(function (x) { return x.id === id; })[0];
        window.location.href = contactURL({ plan: p ? p.name : id, amount: p ? rupee(displayPrice(p)) : "" });
        return;
      }

      /* table cell click → select that plan */
      var cell = e.target.closest("[data-plan-cell]");
      if (cell) selectPlan(cell.getAttribute("data-plan-cell"), false);
    });
  }

  /* ==================================================================
     4. BOOT
     ================================================================== */
  function init() {
    renderPlans();
    renderTable();
    wire();
    state.selected = PLANS.some(function (p) { return p.recommended; }) ? PLANS.filter(function (p) { return p.recommended; })[0].id : null;
    selectPlan(state.selected, false);
    document.addEventListener("wb:theme-change", function () {
      if (state.selected) highlightPlan(state.selected);
    });
    document.dispatchEvent(new CustomEvent("wb:pricing-ready"));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();