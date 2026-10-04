/* ==========================================================================
   WriteBright — main.js
   Shared interaction layer used across all public pages.
   Provides: accordion, modal, toasts, smooth scroll, form validation,
             tabs, progress animation, counters, scroll-reveal,
             before/after sliders, dropdown filtering helpers, year stamps.
   Exposes a small global API: window.WB
   ========================================================================== */
(function () {
  "use strict";

  var WB = {};
  window.WB = WB;

  WB.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     Small helpers
     ------------------------------------------------------------------ */
  WB.qs = function (sel, root) {
    return (root || document).querySelector(sel);
  };
  WB.qsa = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };
  WB.el = function (tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") n.className = attrs[k];
        else if (k === "dataset") Object.keys(attrs[k]).forEach(function (d) {
          n.dataset[d] = attrs[k][d];
        });
        else if (attrs[k] !== null && attrs[k] !== undefined) n.setAttribute(k, attrs[k]);
      });
    }
    if (html !== undefined) n.innerHTML = html;
    return n;
  };

  WB.esc = function (str) {
    return String(str === undefined || str === null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  WB.rupee = function (n) {
    return "₹" + Number(n).toLocaleString("en-IN");
  };

  WB.fmtDate = function (iso) {
    try {
      var d = new Date(iso);
      if (isNaN(d.getTime())) return iso;
      return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    } catch (e) {
      return iso;
    }
  };

  WB.icon = function (name, size) {
    var s = size || 18;
    var paths = {
      check: '<path d="M20 6 9 17l-5-5"/>',
      x: '<path d="M18 6 6 18M6 6l12 12"/>',
      info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
      star: '<path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.4l6-.8z"/>',
      upload: '<path d="M12 16V4M8 8l4-4 4 4"/><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/>',
      pencil: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
      arrow: '<path d="M5 12h13M13 6l6 6-6 6"/>'
    };
    return (
      '<svg width="' +
      s +
      '" height="' +
      s +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      (paths[name] || paths.info) +
      "</svg>"
    );
  };

  /* ------------------------------------------------------------------
     TOASTS
     ------------------------------------------------------------------ */
  WB.toast = function (message, type, ms) {
    var region = document.getElementById("wbToastRegion");
    if (!region) {
      region = WB.el("div", {
        id: "wbToastRegion",
        class: "wb-toast-region",
        role: "status",
        "aria-live": "polite"
      });
      document.body.appendChild(region);
    }
    type = type || "info";
    var ico = type === "success" ? "check" : type === "error" ? "x" : "info";

    var t = WB.el("div", { class: "wb-toast wb-toast-" + type });
    t.innerHTML =
      '<span class="wb-toast-ico">' + WB.icon(ico, 14) + "</span><span>" + WB.esc(message) + "</span>";
    region.appendChild(t);

    var life = ms || 4200;
    setTimeout(function () {
      t.classList.add("is-leaving");
      setTimeout(function () {
        if (t.parentNode) t.parentNode.removeChild(t);
      }, 320);
    }, life);
    return t;
  };

  /* ------------------------------------------------------------------
     MODAL
     ------------------------------------------------------------------ */
  var lastFocus = null;

  WB.modal = function (options) {
    options = options || {};
    var host = document.getElementById("wbModalHost");
    if (!host) {
      host = WB.el("div", { id: "wbModalHost" });
      document.body.appendChild(host);
    }
    host.innerHTML = "";

    var titleId = "wb-modal-title-" + Date.now();
    var backdrop = WB.el("div", { class: "wb-modal-backdrop", role: "dialog", "aria-modal": "true", "aria-labelledby": titleId });
    var panel = WB.el("div", { class: "wb-modal" });

    panel.innerHTML =
      '<button type="button" class="wb-modal-close" data-modal-close aria-label="Close dialog">' +
      WB.icon("x", 18) +
      "</button>" +
      (options.title
        ? '<h2 id="' + titleId + '" style="font-size:1.35rem;margin-bottom:.5rem;padding-right:2.5rem">' + WB.esc(options.title) + "</h2>"
        : "") +
      (options.subtitle ? '<p class="wb-lead" style="margin-bottom:1rem">' + WB.esc(options.subtitle) + "</p>" : "") +
      '<div class="wb-modal-body">' +
      (options.body || "") +
      "</div>" +
      (options.footer
        ? '<div class="mt-5 flex flex-col sm:flex-row gap-2.5 sm:justify-end">' + options.footer + "</div>"
        : "");

    backdrop.appendChild(panel);
    host.appendChild(backdrop);
    lastFocus = document.activeElement;

    requestAnimationFrame(function () {
      backdrop.classList.add("is-open");
    });
    document.body.classList.add("is-locked");

    function close() {
      backdrop.classList.remove("is-open");
      document.body.classList.remove("is-locked");
      setTimeout(function () {
        host.innerHTML = "";
      }, 320);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
      document.removeEventListener("keydown", onKey);
    }

    function onKey(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      var f = WB.qsa(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        panel
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
        first.focus();
      }
    }

    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop || e.target.closest("[data-modal-close]")) close();
    });
    document.addEventListener("keydown", onKey);

    setTimeout(function () {
      var auto = panel.querySelector("[data-modal-autofocus]") || panel.querySelector("input, button");
      if (auto) auto.focus();
    }, 120);

    return { close: close, panel: panel };
  };

  WB.confirm = function (title, message, confirmLabel) {
    return new Promise(function (resolve) {
      var m = WB.modal({
        title: title,
        body: '<p class="mb-0">' + WB.esc(message) + "</p>",
        footer:
          '<button type="button" class="wb-btn wb-btn-quiet" data-modal-close>Cancel</button>' +
          '<button type="button" class="wb-btn wb-btn-primary" data-confirm>' +
          WB.esc(confirmLabel || "Confirm") +
          "</button>",
        onReady: null
      });
      m.panel.querySelector("[data-confirm]").addEventListener("click", function () {
        m.close();
        resolve(true);
      });
      m.panel.addEventListener("click", function (e) {
        if (e.target.closest("[data-modal-close]")) resolve(false);
      });
      var obs = new MutationObserver(function () {
        if (!document.getElementById("wbModalHost").firstChild) {
          obs.disconnect();
          resolve(false);
        }
      });
      obs.observe(document.getElementById("wbModalHost"), { childList: true });
    });
  };

  /* ------------------------------------------------------------------
     ACCORDION  (delegated — works with static or generated markup)
     Markup contract:
       .wb-accordion
         button.wb-accordion-trigger[aria-expanded][aria-controls]
         .wb-accordion-panel[id]
     Optional: parent with data-accordion-single="true"
     ------------------------------------------------------------------ */
  function initAccordion(root) {
    root = root || document;
    WB.qsa(".wb-accordion-trigger", root).forEach(function (trig) {
      if (trig.dataset.wbBound) return;
      trig.dataset.wbBound = "1";
      var panel = document.getElementById(trig.getAttribute("aria-controls"));
      if (!panel) return;
      var group = trig.closest("[data-accordion-single]");

      function setState(open) {
        trig.setAttribute("aria-expanded", open ? "true" : "false");
        panel.classList.toggle("is-open", open);
        if (open) panel.removeAttribute("hidden");
        else setTimeout(function () {
          if (trig.getAttribute("aria-expanded") === "false") panel.setAttribute("hidden", "");
        }, 340);
      }

      setState(trig.getAttribute("aria-expanded") === "true");

      trig.addEventListener("click", function () {
        var open = trig.getAttribute("aria-expanded") === "true";
        if (group && !open) {
          WB.qsa(".wb-accordion-trigger", group).forEach(function (other) {
            if (other === trig) return;
            var op = document.getElementById(other.getAttribute("aria-controls"));
            other.setAttribute("aria-expanded", "false");
            if (op) {
              op.classList.remove("is-open");
              setTimeout(function () {
                if (other.getAttribute("aria-expanded") === "false") op.setAttribute("hidden", "");
              }, 340);
            }
          });
        }
        setState(!open);
      });

      trig.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          var list = WB.qsa(".wb-accordion-trigger", trig.closest("[data-accordion-single]") || trig.closest(".wb-accordion").parentNode);
          if (!list.length) return;
          var i = list.indexOf(trig);
          var next = list[(i + (e.key === "ArrowDown" ? 1 : -1) + list.length) % list.length];
          if (next) next.focus();
        }
      });
    });
  }
  WB.accordion = initAccordion;

  /* ------------------------------------------------------------------
     TABS  (aria tablist)
     ------------------------------------------------------------------ */
  WB.tabs = function (listSel, opts) {
    opts = opts || {};
    var list = typeof listSel === "string" ? WB.qs(listSel) : listSel;
    if (!list) return;
    var tabs = WB.qsa('[role="tab"]', list);

    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.setAttribute("tabindex", on ? "0" : "-1");
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
      if (opts.onChange) opts.onChange(tab.getAttribute("aria-controls"), tab);
    }

    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () {
        select(t);
      });
      t.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : e.key === "Home" ? -i : e.key === "End" ? tabs.length - 1 - i : 0;
        if (!d) return;
        e.preventDefault();
        var next = tabs[(i + d + tabs.length) % tabs.length];
        if (next) select(next, true);
      });
    });

    var initial = WB.qs('[role="tab"][aria-selected="true"]', list) || tabs[0];
    if (initial) select(initial);
    return { select: select };
  };

  /* ------------------------------------------------------------------
     SMOOTH SCROLL for in-page anchors
     ------------------------------------------------------------------ */
  WB.smoothScroll = function (target, offset) {
    var node = typeof target === "string" ? WB.qs(target) : target;
    if (!node) return;
    var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--wb-nav-h"), 10) || 76;
    var y = node.getBoundingClientRect().top + window.pageYOffset - navH - 16 + (offset || 0);
    window.scrollTo({ top: Math.max(y, 0), behavior: WB.reducedMotion ? "auto" : "smooth" });
  };

  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href");
    if (!id || id === "#") return;
    var node = document.querySelector(id);
    if (!node) return;
    e.preventDefault();
    WB.smoothScroll(node);
    history.replaceState(null, "", id);
    /* move focus for a11y without extra scroll jump */
    node.setAttribute("tabindex", "-1");
    setTimeout(function () {
      node.focus({ preventScroll: true });
    }, WB.reducedMotion ? 0 : 420);
  });

  /* ------------------------------------------------------------------
     FORM VALIDATION
     ------------------------------------------------------------------ */
  var validators = {
    required: function (v) {
      return v.trim().length > 0 ? "" : "This field is required.";
    },
    email: function (v) {
      if (!v.trim()) return "Email is required.";
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Enter a valid email address.";
    },
    phone: function (v) {
      if (!v.trim()) return "Phone number is required.";
      var digits = v.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 15 ? "" : "Enter a valid phone number (10–15 digits).";
    },
    minlen: function (n) {
      return function (v) {
        return v.trim().length >= n ? "" : "Please use at least " + n + " characters.";
      };
    }
  };
  WB.validators = validators;

  function fieldWrap(input) {
    return input.closest(".wb-field") || input.parentElement;
  }

  function setError(input, msg) {
    var wrap = fieldWrap(input);
    var err = WB.qs(".wb-field-error", wrap);
    if (msg) {
      input.setAttribute("aria-invalid", "true");
      if (err) {
        err.textContent = msg;
        err.classList.add("is-visible");
      }
    } else {
      input.removeAttribute("aria-invalid");
      if (err) {
        err.textContent = "";
        err.classList.remove("is-visible");
      }
    }
  }

  function validateInput(input) {
    var rules = (input.getAttribute("data-rules") || "").split("|").filter(Boolean);
    var v = input.value;
    var msg = "";
    for (var i = 0; i < rules.length; i++) {
      var r = rules[i];
      if (r.indexOf("minlen:") === 0) msg = validators.minlen(parseInt(r.split(":")[1], 10))(v);
      else if (validators[r]) msg = validators[r](v);
      if (msg) break;
    }
    if (!msg && input.type === "checkbox" && input.hasAttribute("required") && !input.checked)
      msg = "Please confirm to continue.";
    setError(input, msg);
    return !msg;
  }

  WB.validateForm = function (form) {
    var inputs = WB.qsa("input, select, textarea", form).filter(function (i) {
      return i.type !== "hidden" && i.type !== "submit" && i.type !== "button";
    });
    var ok = true;
    var firstBad = null;
    inputs.forEach(function (i) {
      if (!validateInput(i)) {
        ok = false;
        if (!firstBad) firstBad = i;
      }
    });
    if (firstBad) {
      firstBad.focus();
      firstBad.scrollIntoView({ block: "center", behavior: WB.reducedMotion ? "auto" : "smooth" });
    }
    return ok;
  };

  document.addEventListener(
    "blur",
    function (e) {
      var t = e.target;
      if (t && t.matches && t.matches("input, select, textarea") && (t.getAttribute("data-rules") || t.hasAttribute("required")))
        validateInput(t);
    },
    true
  );

  document.addEventListener("input", function (e) {
    var t = e.target;
    if (t && t.getAttribute && t.getAttribute("aria-invalid") === "true" && t.getAttribute("data-rules")) validateInput(t);
  });

  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t && t.matches && t.matches("select, input[type=checkbox], input[type=radio]") && t.getAttribute("data-rules"))
      validateInput(t);
  });

  /* Generic demo form handler */
  WB.demoSubmit = function (form, messages) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!WB.validateForm(form)) {
        WB.toast("Please correct the highlighted fields.", "error");
        return;
      }
      var btn = WB.qs('[type="submit"]', form);
      var original = btn ? btn.innerHTML : "";
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = "Sending…";
      }
      setTimeout(function () {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = original;
        }
        form.reset();
        WB.qsa(".wb-field-error", form).forEach(function (e2) {
          e2.classList.remove("is-visible");
        });
        WB.toast(
          messages || "Thank you. This demo form is not connected to a server, so nothing was sent.",
          "success",
          5200
        );
      }, 900);
    });
  };

  /* ------------------------------------------------------------------
     PROGRESS BARS — animate width from data-value
     ------------------------------------------------------------------ */
  WB.animateProgress = function (root) {
    WB.qsa(".wb-progress-fill[data-value]", root || document).forEach(function (f) {
      var pct = Math.max(0, Math.min(100, parseFloat(f.dataset.value) || 0));
      if (WB.reducedMotion) {
        f.style.width = pct + "%";
      } else {
        requestAnimationFrame(function () {
          setTimeout(function () {
            f.style.width = pct + "%";
          }, 90);
        });
      }
    });
    WB.qsa(".wb-ring[data-value]", root || document).forEach(function (r) {
      r.style.setProperty("--pct", String(Math.max(0, Math.min(100, parseFloat(r.dataset.value) || 0))));
    });
  };

  /* ------------------------------------------------------------------
     COUNTERS
     ------------------------------------------------------------------ */
  WB.countUp = function (node, to, opts) {
    opts = opts || {};
    var dur = opts.duration || 1400;
    var suffix = opts.suffix || "";
    var start = opts.start || 0;
    if (WB.reducedMotion) {
      node.textContent = to + suffix;
      return;
    }
    var t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      node.textContent = Math.round(start + (to - start) * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  /* ------------------------------------------------------------------
     SCROLL REVEAL
     ------------------------------------------------------------------ */
  function initReveal() {
    var items = WB.qsa(".wb-reveal");
    if (!items.length) return;
    if (WB.reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (i) {
        i.classList.add("is-in");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            WB.animateProgress(en.target);
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach(function (i) {
      io.observe(i);
    });
  }

  /* ------------------------------------------------------------------
     BEFORE / AFTER DRAG SLIDER
     ------------------------------------------------------------------ */
  WB.compareSlider = function (root) {
    var before = WB.qs(".wb-slider-before", root);
    var handle = WB.qs(".wb-slider-handle", root);
    if (!before || !handle) return;

    function setPct(clientX) {
      var r = root.getBoundingClientRect();
      var pct = ((clientX - r.left) / r.width) * 100;
      pct = Math.max(4, Math.min(96, pct));
      before.style.width = pct + "%";
      handle.style.left = pct + "%";
      handle.setAttribute("aria-valuenow", Math.round(pct));
    }

    var dragging = false;
    function down(e) {
      dragging = true;
      root.setPointerCapture && e.pointerId !== undefined && root.setPointerCapture(e.pointerId);
      setPct(e.touches ? e.touches[0].clientX : e.clientX);
      e.preventDefault();
    }
    function move(e) {
      if (!dragging) return;
      setPct(e.touches ? e.touches[0].clientX : e.clientX);
    }
    function up() {
      dragging = false;
    }

    handle.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    root.addEventListener("touchstart", down, { passive: false });
    root.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", up);
    handle.addEventListener("keydown", function (e) {
      var r = root.getBoundingClientRect();
      var cur = parseFloat(before.style.width) || 50;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setPct(r.left + (cur - 6) / 100 * r.width);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setPct(r.left + (cur + 6) / 100 * r.width);
      }
    });
  };

  /* ------------------------------------------------------------------
     FILTER PILLS (generic, reusable by programs/instructors)
     ------------------------------------------------------------------ */
  WB.filterPills = function (containerSel, itemSel, key, onFilter) {
    var wrap = typeof containerSel === "string" ? WB.qs(containerSel) : containerSel;
    if (!wrap) return null;
    var pills = WB.qsa("[data-filter]", wrap);

    function apply(value, announce) {
      pills.forEach(function (p) {
        var on = p.getAttribute("data-filter") === value;
        p.setAttribute("aria-pressed", on ? "true" : "false");
        p.classList.toggle("is-active", on);
      });
      var items = WB.qsa(itemSel, document);
      var shown = 0;
      items.forEach(function (it) {
        var match = value === "all" || (it.getAttribute(key) || "").toLowerCase() === value.toLowerCase();
        it.hidden = !match;
        if (match) shown++;
        /* keep the reveal animation meaningful after filtering */
        if (match && it.classList.contains("wb-reveal")) it.classList.add("is-in");
      });
      var live = WB.qs("[data-filter-status]", document);
      if (live) live.textContent = shown + (shown === 1 ? " item shown" : " items shown");
      if (announce && onFilter) onFilter(value, shown);
    }

    pills.forEach(function (p) {
      p.addEventListener("click", function () {
        apply(p.getAttribute("data-filter"), true);
      });
    });

    return { apply: apply };
  };

  /* ------------------------------------------------------------------
     Enrol CTA wiring — every "Enroll Now" button routes to contact/enrol
     ------------------------------------------------------------------ */
  function initEnrollButtons() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-enroll]");
      if (!btn) return;
      var program = btn.getAttribute("data-enroll");
      var target = (window.WriteBrightNav && window.WriteBrightNav.pages.contact) || "contact.html";
      var url = target + "?intent=enroll" + (program ? "&program=" + encodeURIComponent(program) : "");
      window.location.href = url;
    });
  }

  /* ------------------------------------------------------------------
     Misc: year stamp + active-instructor modal hooks
     ------------------------------------------------------------------ */
  function initMisc() {
    WB.qsa("[data-year]").forEach(function (n) {
      n.textContent = String(new Date().getFullYear());
    });
    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-modal-open]");
      if (!b) return;
      var tpl = document.getElementById(b.getAttribute("data-modal-open"));
      if (!tpl) return;
      WB.modal({
        title: tpl.getAttribute("data-title") || "",
        subtitle: tpl.getAttribute("data-subtitle") || "",
        body: tpl.innerHTML,
        footer:
          '<button type="button" class="wb-btn wb-btn-quiet" data-modal-close>Close</button>' +
          '<a class="wb-btn wb-btn-primary" href="' +
          ((window.WriteBrightNav && window.WriteBrightNav.pages.contact) || "contact.html") +
          '?intent=enroll">Enroll Now</a>'
      });
    });
  }

  /* ------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------ */
  function init() {
    initAccordion(document);
    initEnrollButtons();
    initMisc();
    initReveal();
    WB.animateProgress(document);
    WB.qsa(".wb-slider-compare").forEach(WB.compareSlider);
    WB.tabs('[role="tablist"]');
    document.dispatchEvent(new CustomEvent("wb:ready"));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  /* Re-run late initialisers when scripts inject content afterwards */
  document.addEventListener("wb:ready", function () {});
  window.addEventListener("load", function () {
    initAccordion(document);
    WB.animateProgress(document);
    WB.qsa(".wb-slider-compare").forEach(function (el) {
      if (el.getAttribute("data-wb-slider")) return;
      el.setAttribute("data-wb-slider", "1");
      WB.compareSlider(el);
    });
    WB.qsa(".wb-reveal:not(.is-in)").forEach(function (i) {
      i.classList.add("is-in");
    });
  });
})();