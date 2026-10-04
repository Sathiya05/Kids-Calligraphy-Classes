/* ==========================================================================
   WriteBright — footer.js
   Dynamically injects the site footer into #footer.
   No footer markup is duplicated in any HTML file.
   ========================================================================== */
(function () {
  "use strict";

  /* The script URL is always /js/footer.js, so the *page* path must decide
     the base — dashboard pages load this file as ../js/footer.js. */
  var pagePath = window.location.pathname.replace(/\\/g, "/");
  var BASE = /\/dashboard(\/|$)/i.test(pagePath) ? "../" : "";

  var PAGES = {
    home1: BASE + "index.html",
    home2: BASE + "home2.html",
    programs: BASE + "programs.html",
    instructors: BASE + "instructors.html",
    pricing: BASE + "pricing.html",
    about: BASE + "about.html",
    login: BASE + "login.html",
    contact: BASE + "contact.html",
    parentDash: BASE + "dashboard/parent-dashboard.html",
    adminDash: BASE + "dashboard/admin-dashboard.html"
  };

  function logoSVG() {
    return (
      '<svg viewBox="0 0 44 44" width="40" height="40" aria-hidden="true" focusable="false" class="shrink-0">' +
      '<defs>' +
      '<linearGradient id="wbFooterBody" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="#7A68AD"/><stop offset="100%" stop-color="#5B4B8A"/>' +
      "</linearGradient>" +
      '<linearGradient id="wbFooterTip" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#F4A261"/><stop offset="100%" stop-color="#E2894A"/>' +
      "</linearGradient>" +
      "</defs>" +
      '<rect x="1.5" y="1.5" width="41" height="41" rx="13" fill="#FFF1C7"/>' +
      '<rect x="1.5" y="1.5" width="41" height="41" rx="13" fill="none" stroke="#F4A261" stroke-width="1.6" opacity=".55"/>' +
      '<path d="M10 16.5c1.6 8.4 3 12.6 4.2 12.6 1.4 0 2.2-3.6 3.1-7.6.7-3.2 1.3-5.6 2.4-5.6 1.1 0 1.8 2.5 2.6 5.9.8 3.6 1.5 7.3 2.6 7.3 1.1 0 1.7-2.4 2.4-5.3.6-2.6 1.1-5.4 2.1-5.4.9 0 1.4 2 2 5"' +
      ' fill="none" stroke="url(#wbFooterBody)" stroke-width="3.1" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M33.6 9.6 38.8 8.2l-1.4 5.2-4.4 4.4-3.8-3.8z" fill="url(#wbFooterTip)"/>' +
      '<path d="M33.6 9.6 35.2 14l3.6-3.6z" fill="#FFF1C7"/>' +
      '<path d="m29.2 14 3.8 3.8-1.5 1.5z" fill="#3f3460" opacity=".5"/>' +
      '<path d="M37.6 7.1l.62 1.72 1.72.62-1.72.62-.62 1.72-.62-1.72-1.72-.62 1.72-.62z" fill="#F4A261"/>' +
      "</svg>"
    );
  }

  function col(title, links) {
    return (
      '<div><p class="wb-footer-title">' +
      title +
      '</p><ul class="flex flex-col">' +
      links
        .map(function (l) {
          return (
            '<li><a class="wb-footer-link" href="' +
            l.href +
            '">' +
            '<span aria-hidden="true" style="opacity:.6;font-size:.7rem">✎</span>' +
            "<span>" +
            l.label +
            "</span></a></li>"
          );
        })
        .join("") +
      "</ul></div>"
    );
  }

  function render() {
    var mount = document.getElementById("footer");
    if (!mount) return;

    mount.innerHTML = [
      '<footer class="wb-footer wb-paper-cream">',
      '  <div class="pointer-events-none absolute inset-0 wb-dots opacity-40" aria-hidden="true"></div>',
      '  <div class="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full" style="background:radial-gradient(circle,rgba(255,241,199,.16),transparent 68%)" aria-hidden="true"></div>',
      '  <div class="pointer-events-none absolute -bottom-28 -left-20 w-[380px] h-[380px] rounded-full" style="background:radial-gradient(circle,rgba(244,162,97,.2),transparent 68%)" aria-hidden="true"></div>',

      '  <div class="relative mx-auto w-full max-w-[1280px] px-5 sm:px-6 pt-14 pb-8">',
      '    <div class="grid gap-10 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">',

      '      <div class="lg:col-span-4 sm:col-span-2">',
      '        <a href="' + PAGES.home1 + '" class="flex items-center gap-3 mb-4" aria-label="WriteBright home">',
      "          " + logoSVG(),
      '          <span class="block text-[1.32rem] sm:text-[1.42rem] font-extrabold tracking-tight leading-none" style="color:var(--wb-primary)">Write<span style="color:var(--wb-accent-ink)">Bright</span></span>',
      "        </a>",
      '        <p class="mt-3 text-[0.93rem] leading-relaxed" style="color:var(--wb-ink-500)">Helping children develop confident handwriting, creative expression and strong writing habits through structured practice.</p>',

      '        <div class="mt-5 flex flex-wrap gap-2">',
      '          <span class="wb-badge" style="background:var(--wb-white);color:var(--wb-primary);border:1px solid rgba(91,75,138,.2)">Ages 4+</span>',
      '          <span class="wb-badge" style="background:var(--wb-white);color:var(--wb-primary);border:1px solid rgba(91,75,138,.2)">Offline &amp; Online</span>',
      '          <span class="wb-badge" style="background:var(--wb-white);color:var(--wb-primary);border:1px solid rgba(91,75,138,.2)">Progress Tracking</span>',
      "        </div>",

      '        <div class="mt-6 flex flex-wrap gap-2.5">',
      '          <a href="' + PAGES.contact + '?intent=enroll" class="wb-btn wb-btn-accent wb-btn-sm">Enroll Now</a>',
      '          <a href="' + PAGES.programs + '" class="wb-btn wb-btn-outline wb-btn-sm">View Programs</a>',
      "        </div>",
      "      </div>",

      '      <div class="lg:col-span-2 lg:col-start-5">',
        col("Explore", [
          { href: PAGES.home1, label: "Home" },
          { href: PAGES.programs, label: "Programs" },
          { href: PAGES.instructors, label: "Instructors" },
          { href: PAGES.pricing, label: "Pricing" }
        ]),
      "      </div>",

      '      <div class="lg:col-span-3">',
        col("Parents", [
          { href: PAGES.parentDash, label: "Parent Dashboard" },
          { href: PAGES.contact + "?intent=enroll", label: "Enrollment" },
          { href: PAGES.parentDash + "#schedule", label: "Class Schedule" },
          { href: PAGES.parentDash + "#progress", label: "Progress Tracking" },
          { href: PAGES.parentDash + "#payments", label: "Payments" }
        ]),
      "      </div>",

      '      <div class="lg:col-span-3">',
        col("Support", [
          { href: PAGES.contact, label: "Contact" },
          { href: PAGES.home1 + "#faq", label: "FAQs" },
          { href: PAGES.home1 + "#faq", label: "Privacy" },
          { href: PAGES.home1 + "#faq", label: "Terms" }
        ]),

      '        <address class="mt-5 not-italic text-[0.9rem] leading-relaxed" style="color:var(--wb-ink-500)">',
      '          <p class="mb-1"><span class="wb-sr">Phone: </span>+91 98765 43210</p>',
      '          <p class="mb-1"><span class="wb-sr">Email: </span>hello@writebright.example</p>',
      '          <p class="mb-0"><span class="wb-sr">Class hours: </span>Mon–Sat, 9:00 AM – 8:00 PM</p>',
      "        </address>",
      "      </div>",
      "    </div>",

      '    <div class="mt-12 border-t pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style="border-color:rgba(37,37,37,.14)">',
      '      <p class="text-[0.85rem] m-0" style="color:var(--wb-ink-500)">© 2026 WriteBright. All rights reserved.</p>',
      '<div class="flex items-center gap-2.5">',
      '        <a href="#" aria-label="Facebook" class="wb-social-btn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>',
      '        <a href="#" aria-label="Twitter" class="wb-social-btn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>',
      '        <a href="#" aria-label="Instagram" class="wb-social-btn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>',
      '      </div>',
      "    </div>",
      '    <p class="wb-note mt-3" style="color:var(--wb-ink-400)">Demonstration website. Student names, samples, pricing and results shown are illustrative demo content.</p>',
      "  </div>",
      "</footer>"
    ].join("\n");
  }

  function init() {
    render();
    document.dispatchEvent(new CustomEvent("wb:footer-ready"));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();