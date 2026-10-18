/* ==========================================================================
   WriteBright — navbar.js
   Dynamically injects the site header (desktop + mobile) into #navbar.
   Also injects the skip-link, mobile menu, toast region and modal host.
   No navbar markup is duplicated in any HTML file.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     Path helpers — the header lives in different folders (root pages vs
     /dashboard/*), so every href is resolved against a computed base.
     --------------------------------------------------------------------- */
  /* The script URL is always /js/navbar.js, so the *page* path must decide
     the base — dashboard pages load this file as ../js/navbar.js. */
  var pagePath = window.location.pathname.replace(/\\/g, "/");
  var isInDashboard = /\/dashboard(\/|$)/i.test(pagePath);
  var BASE = isInDashboard ? "../" : "";
  var PAGES = {
    home1: BASE + "index.html",
    home2: BASE + "home2.html",
    about: BASE + "about.html",

    programs: BASE + "programs.html",
    instructors: BASE + "instructors.html",
    pricing: BASE + "pricing.html",
    login: BASE + "login.html",
    contact: BASE + "contact.html",
    parentDash: BASE + "dashboard/parent-dashboard.html",
    adminDash: BASE + "dashboard/admin-dashboard.html"
  };

  /* ---------------------------------------------------------------------
     Logo — pencil stroke forming a "W" with a spark star.
     --------------------------------------------------------------------- */
  function logoSVG() {
    return (
      '<svg viewBox="0 0 44 44" width="40" height="40" aria-hidden="true" focusable="false" class="shrink-0">' +
      '<defs>' +
      '<linearGradient id="wbPencilBody" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="#7A68AD"/><stop offset="100%" stop-color="#5B4B8A"/>' +
      "</linearGradient>" +
      '<linearGradient id="wbTipGrad" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#F4A261"/><stop offset="100%" stop-color="#E2894A"/>' +
      "</linearGradient>" +
      "</defs>" +
      '<rect x="1.5" y="1.5" width="41" height="41" rx="13" fill="#FFF1C7"/>' +
      '<rect x="1.5" y="1.5" width="41" height="41" rx="13" fill="none" stroke="#F4A261" stroke-width="1.6" opacity=".55"/>' +
      '<path d="M10 16.5c1.6 8.4 3 12.6 4.2 12.6 1.4 0 2.2-3.6 3.1-7.6.7-3.2 1.3-5.6 2.4-5.6 1.1 0 1.8 2.5 2.6 5.9.8 3.6 1.5 7.3 2.6 7.3 1.1 0 1.7-2.4 2.4-5.3.6-2.6 1.1-5.4 2.1-5.4.9 0 1.4 2 2 5"' +
      ' fill="none" stroke="url(#wbPencilBody)" stroke-width="3.1" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M33.6 9.6 38.8 8.2l-1.4 5.2-4.4 4.4-3.8-3.8z" fill="url(#wbTipGrad)"/>' +
      '<path d="M33.6 9.6 35.2 14l3.6-3.6z" fill="#FFF1C7"/>' +
      '<path d="m29.2 14 3.8 3.8-1.5 1.5z" fill="#3f3460" opacity=".5"/>' +
      '<path d="M37.6 7.1l.62 1.72 1.72.62-1.72.62-.62 1.72-.62-1.72-1.72-.62 1.72-.62z" fill="#F4A261"/>' +
      "</svg>"
    );
  }

  function chevron() {
    return (
      '<svg class="wb-dropdown-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="m6 9 6 6 6-6"/></svg>'
    );
  }

  /* ---------------------------------------------------------------------
     Navigation model
     --------------------------------------------------------------------- */
  var NAV = [
    {
      id: "home",
      label: " Home",
      dropdown: [
        {
          href: PAGES.home1,
          label: "Home 1",
          match: ["index"]
        },
        {
          href: PAGES.home2,
          label: "Home 2",
          match: ["home2"]
        }
      ]
    },
    { id: "about", label: "About", href: PAGES.about, match: ["about"] },

    { id: "programs", label: "Programs", href: PAGES.programs, match: ["programs"] },
    { id: "instructors", label: "Instructors", href: PAGES.instructors, match: ["instructors"] },
    { id: "pricing", label: "Pricing", href: PAGES.pricing, match: ["pricing"] },
    { id: "contact", label: "Contact", href: PAGES.contact, match: ["contact"] },
    {
      id: "dashboard",
      label: " Dashboard",
      dropdown: [
        {
          href: PAGES.parentDash,
          label: "Parent Dashboard",
          match: ["parent-dashboard"]
        },
        {
          href: PAGES.adminDash,
          label: "Admin Dashboard",
          match: ["admin-dashboard"]
        }
      ]
    }
  ];

  /* ---------------------------------------------------------------------
     Active page detection
     --------------------------------------------------------------------- */
  function currentPageKey() {
    var path = window.location.pathname;
    var file = (path.substring(path.lastIndexOf("/") + 1) || "index.html").toLowerCase();
    if (!file || file === "index.html") return "index";
    return file.replace(/\.html?$/, "");
  }

  function isActive(entry, pageKey) {
    if (entry.match && entry.match.length) return entry.match.indexOf(pageKey) !== -1;
    return false;
  }

  /* ---------------------------------------------------------------------
     Render
     --------------------------------------------------------------------- */
  function render() {
    var mount = document.getElementById("navbar");
    if (!mount) return;
    var pageKey = currentPageKey();

    var desktopItems = NAV.map(function (item) {
      var active = isActive(item, pageKey);

      if (item.dropdown) {
        var childActive = item.dropdown.some(function (c) {
          return isActive(c, pageKey);
        });
        var triggerId = "wb-dd-" + item.id;
        var menuId = triggerId + "-menu";
        var btn =
          '<button type="button" class="wb-nav-link wb-dropdown-trigger' + (childActive ?" is-active" : "") +
          '" id="' +
          triggerId +
          '" aria-haspopup="true" aria-expanded="false" aria-controls="' +
          menuId +
          '">' +
          item.label +
          chevron() +
          '<span class="wb-sr"> — submenu</span>' +
          "</button>";

        var menu =
          '<div class="wb-dropdown-menu" id="' +
          menuId +
          '" role="menu" aria-labelledby="' +
          triggerId +
          '">' +
          item.dropdown
            .map(function (c) {
              return (
                '<a class="wb-dropdown-item" role="menuitem" href="' +
                c.href +
                '"' +
                (isActive(c, pageKey) ? ' aria-current="page"' : "") +
                ">" +
                c.label +
                "</a>"
              );
            })
            .join("") +
          "</div>";

        return '<div class="wb-dropdown">' + btn + menu + "</div>";
      }

      return (
        '<a class="wb-nav-link' + (active ?" is-active" : "") +
        '" href="' +
        item.href +
        '"' +
        (active ? ' aria-current="page"' : "") +
        ">" +
        item.label +
        "</a>"
      );
    }).join("");

    var mobileItems = NAV.map(function (item) {
      if (item.dropdown) {
        var mId = "wb-m-dd-" + item.id;
        var childActive = item.dropdown.some(function (c) {
          return isActive(c, pageKey);
        });
        return (
          '<div class="wb-mobile-group">' +
          '<button type="button" class="wb-mobile-link wb-m-trigger" id="' +
          mId +
          '" aria-expanded="false" aria-controls="' +
          mId +
          '-panel">' +
          "<span>" +
          item.label +
          "</span>" +
          '<span class="wb-accordion-icon" style="width:26px;height:26px;flex-basis:26px" aria-hidden="true"></span>' +
          "</button>" +
          '<div class="wb-mobile-sub" id="' +
          mId +
          '-panel" role="group" aria-labelledby="' +
          mId +
          '"><div>' +
          item.dropdown
            .map(function (c) {
              return (
                '<a class="wb-mobile-sublink" href="' +
                c.href +
                '"' +
                (isActive(c, pageKey) ? ' aria-current="page"' : "") +
                ">" +
                '<span aria-hidden="true" style="font-size:1.05rem">✎</span>' +
                "<span>" +
                c.label +
                "</span>" +
                "</a>"
              );
            })
            .join("") +
          "</div></div>" +
          "</div>"
        );
      }
      var active = isActive(item, pageKey);
      return (
        '<a class="wb-mobile-link" href="' +
        item.href +
        '"' +
        (active ? ' aria-current="page"' : "") +
        ' style="' +
        (active ? "color:var(--wb-primary)" : "") +
        '">' +
        item.label +
        "</a>"
      );
    }).join("");

    mount.innerHTML = [
      '<a class="wb-skip-link" href="#main">Skip to main content</a>',
      '<header class="wb-nav sticky top-0 z-50 bg-white" id="wbNav">',
      '  <nav class="mx-auto w-full max-w-[1280px] px-4 sm:px-6" aria-label="Main navigation" style="height:var(--wb-nav-h)">',
      '    <div class="flex h-full items-center justify-between gap-4">',
      '      <a href="' + PAGES.home1 + '" class="flex items-center gap-2.5 shrink-0 group" aria-label="WriteBright home">',
      '        ' + logoSVG(),
      '        <span class="leading-none">',
      '          <span class="block text-[1.32rem] sm:text-[1.42rem] font-extrabold tracking-tight" style="color:var(--wb-primary)">Write<span style="color:var(--wb-accent-ink)">Bright</span></span>',
      "        </span>",
      "      </a>",
      '      <div class="hidden xl:flex items-center gap-5 2xl:gap-7">',
      "        " + desktopItems,
      "      </div>",
      '      <div class="flex items-center gap-2.5">',
      '        <button id="themeToggle" data-theme-toggle class="wb-btn wb-btn-quiet wb-btn-sm hidden xl:inline-flex" style="padding: 0.25rem 0.5rem;" title="Toggle Theme" aria-pressed="false"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></button>',
      '        <button id="rtlToggle" data-rtl-toggle class="wb-btn wb-btn-quiet wb-btn-sm hidden xl:inline-flex" style="padding: 0.25rem 0.5rem;" aria-pressed="false">RTL</button>',
      '        <a href="' + PAGES.login + '" class="wb-btn wb-btn-outline wb-btn-sm hidden xl:inline-flex">Login</a>',
      '        <a href="' + PAGES.contact + '?intent=enroll" class="wb-btn wb-btn-primary wb-btn-sm hidden xl:inline-flex" style="padding:.62rem 1.3rem">' +
      "          Enroll Now" +
      '          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>' +
      "        </a>",
      '        <button type="button" class="wb-burger xl:hidden" id="wbBurger" aria-expanded="false" aria-controls="wbMobileMenu" aria-label="Open main menu">' +
      '          <span></span><span></span><span></span>',
      "        </button>",
      "      </div>",
      "    </div>",
      "  </nav>",
      "</header>",
      '<div class="wb-mobile-menu xl:hidden" id="wbMobileMenu" aria-label="Mobile navigation">',
      '  <nav class="px-5 pt-3 pb-10" style="max-width:640px;margin:0 auto">',
      '    <div class="wb-mobile-links">' + mobileItems + "</div>",
      '    <div class="mt-6 flex gap-2.5">',
      '      <button type="button" data-theme-toggle class="wb-btn wb-btn-quiet wb-btn-sm flex-1" aria-pressed="false">' +
      '        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>' +
      "        <span>Theme</span></button>",
      '      <button type="button" data-rtl-toggle class="wb-btn wb-btn-quiet wb-btn-sm flex-1" aria-pressed="false">RTL</button>',
      "    </div>",
      '    <div class="mt-3 grid gap-3">',
      '      <a href="' + PAGES.contact + '?intent=enroll" class="wb-btn wb-btn-primary wb-btn-block">Enroll Now</a>',
      '      <a href="' + PAGES.login + '" class="wb-btn wb-btn-outline wb-btn-block"> Login</a>',
      "    </div>",
      '    <p class="wb-note mt-6" style="color:var(--wb-ink-400)">Calligraphy &amp; handwriting classes for children aged 4 and above.</p>',
      "  </nav>",
      "</div>"
    ].join("\n");
  }

  /* ---------------------------------------------------------------------
     Behaviour: dropdowns, mobile drawer, outside click, keyboard
     --------------------------------------------------------------------- */
  function wire() {
    /* theme toggles (header + mobile menu) stay in sync */
    var themeBtns = Array.prototype.slice.call(document.querySelectorAll('[data-theme-toggle]'));
    themeBtns.forEach(function (btn) {
      btn.addEventListener('click', function() {
        var on = document.body.classList.toggle('dark-theme');
        themeBtns.forEach(function (b) { b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
        document.dispatchEvent(new CustomEvent('wb:theme-change', { detail: { dark: on } }));
      });
    });
    /* RTL toggles (header + mobile menu) stay in sync */
    var rtlBtns = Array.prototype.slice.call(document.querySelectorAll('[data-rtl-toggle]'));
    rtlBtns.forEach(function (btn) {
      btn.addEventListener('click', function() {
        var doc = document.documentElement;
        var on = doc.dir !== 'rtl';
        doc.dir = on ? 'rtl' : 'ltr';
        rtlBtns.forEach(function (b) { b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      });
    });
    var nav = document.getElementById("wbNav");
    var burger = document.getElementById("wbBurger");
    var menu = document.getElementById("wbMobileMenu");
    if (!nav || !burger || !menu) return;

    /* --- scroll shadow --- */
    var onScroll = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* --- desktop dropdowns --- */
    var triggers = Array.prototype.slice.call(nav.querySelectorAll(".wb-dropdown-trigger"));
    var menus = Array.prototype.slice.call(nav.querySelectorAll(".wb-dropdown-menu"));

    function closeAllDropdowns(except) {
      triggers.forEach(function (t) {
        if (t === except) return;
        t.setAttribute("aria-expanded", "false");
      });
      menus.forEach(function (m) {
        if (except && m.getAttribute("aria-controls") === except.getAttribute("aria-controls")) return;
        m.classList.remove("is-open");
      });
    }

    function openDropdown(trigger) {
      closeAllDropdowns(trigger);
      var menu = document.getElementById(trigger.getAttribute("aria-controls"));
      trigger.setAttribute("aria-expanded", "true");
      if (menu) menu.classList.add("is-open");
    }

    triggers.forEach(function (t) {
      t.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = t.getAttribute("aria-expanded") === "true";
        if (open) {
          closeAllDropdowns();
        } else {
          openDropdown(t);
        }
      });

      t.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            openDropdown(t);
            var first = document.querySelector("#" + CSS.escape(t.getAttribute("aria-controls")) + " a");
            if (first) first.focus();
          }
        } else if (e.key === "Escape") {
          closeAllDropdowns();
          t.focus();
        }
      });
    });

    /* arrow-key navigation inside dropdown menus */
    menus.forEach(function (m) {
      m.addEventListener("keydown", function (e) {
        var items = Array.prototype.slice.call(m.querySelectorAll("a"));
        var idx = items.indexOf(document.activeElement);
        if (e.key === "ArrowDown") {
          e.preventDefault();
          items[(idx + 1) % items.length].focus();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          items[(idx - 1 + items.length) % items.length].focus();
        } else if (e.key === "Escape") {
          e.preventDefault();
          var trig = document.getElementById(m.getAttribute("aria-labelledby"));
          closeAllDropdowns();
          if (trig) trig.focus();
        } else if (e.key === "Tab") {
          closeAllDropdowns();
        }
      });
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".wb-dropdown")) closeAllDropdowns();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeAllDropdowns();
        closeMobile();
      }
    });

    /* --- mobile drawer --- */
    function openMobile() {
      menu.classList.add("is-open");
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", "Close main menu");
      document.body.classList.add("is-locked");
    }
    function closeMobile() {
      menu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Open main menu");
      document.body.classList.remove("is-locked");
      /* collapse submenus */
      Array.prototype.slice.call(menu.querySelectorAll(".wb-m-trigger[aria-expanded='true']")).forEach(function (t) {
        t.setAttribute("aria-expanded", "false");
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.classList.remove("is-open");
      });
    }

    burger.addEventListener("click", function () {
      if (menu.classList.contains("is-open")) closeMobile();
      else openMobile();
    });

    /* mobile expandable submenus */
    Array.prototype.slice.call(menu.querySelectorAll(".wb-m-trigger")).forEach(function (t) {
      t.addEventListener("click", function () {
        var open = t.getAttribute("aria-expanded") === "true";
        t.setAttribute("aria-expanded", open ? "false" : "true");
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.classList.toggle("is-open", !open);
      });
    });

    /* close after navigation (mobile) */
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMobile();
    });

    /* close on resize to desktop */
    var mq = window.matchMedia("(min-width: 1280px)");
    var onMQ = function (e) {
      if (e.matches) closeMobile();
    };
    if (mq.addEventListener) mq.addEventListener("change", onMQ);
    else if (mq.addListener) mq.addListener(onMQ);

    /* focus trap-lite: keep tab inside open mobile menu */
    menu.addEventListener("keydown", function (e) {
      if (e.key !== "Tab" || !menu.classList.contains("is-open")) return;
      var f = Array.prototype.slice.call(
        menu.querySelectorAll('a[href], button:not([disabled])')
      ).filter(function (el) {
        return el.offsetParent !== null;
      });
      if (!f.length) return;
      var first = f[0];
      var last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        burger.focus();
      }
    });

    /* expose tiny API for other modules */
    window.WriteBrightNav = {
      closeMobile: closeMobile,
      openMobile: openMobile,
      closeDropdowns: closeAllDropdowns,
      base: BASE,
      pages: PAGES
    };
  }

  /* ---------------------------------------------------------------------
     Shared UI hosts (toast region + modal) — injected once per page
     --------------------------------------------------------------------- */
  function mountUI() {
    if (!document.getElementById("wbToastRegion")) {
      var region = document.createElement("div");
      region.id = "wbToastRegion";
      region.className = "wb-toast-region wb-scroll-thin";
      region.setAttribute("role", "status");
      region.setAttribute("aria-live", "polite");
      region.setAttribute("aria-atomic", "false");
      document.body.appendChild(region);
    }
    if (!document.getElementById("wbModalHost")) {
      var host = document.createElement("div");
      host.id = "wbModalHost";
      document.body.appendChild(host);
    }
  }

  /* ---------------------------------------------------------------------
     Boot
     --------------------------------------------------------------------- */
  function init() {
    render();
    wire();
    mountUI();
    document.dispatchEvent(new CustomEvent("wb:navbar-ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();