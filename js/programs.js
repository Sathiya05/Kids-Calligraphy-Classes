/* ==========================================================================
   WriteBright — programs.js
   1. Shared demo data (window.WB_DATA) — programs, workshops, instructors,
      batches. Also consumed by instructors.html.
   2. Program filtering by age group.
   3. Program rendering (full sections + workshop cards).
   4. Expandable program detail panels.
   5. Enrolment CTAs (delegated to main.js via data-enroll).
   ========================================================================== */
(function () {
  "use strict";

  var WB = window.WB || {};

  /* ==================================================================
     1. DEMO DATA
     ================================================================== */
  var PROGRAMS = [
    {
      id: "foundation-writing",
      age: "4-6",
      ageLabel: "Age 4–6",
      title: "Foundation Writing",
      short: "Foundation",
      badge: "wb-badge-purple",
      tagline: "Pre-writing skills, comfortable pencil control and first letters.",
      description:
        "A play-based introduction to writing for pre-readers. Sessions work on grip, posture, " +
        "basic strokes and letter recognition through short, warm activities that repeat until " +
        "the movements feel familiar.",
      duration: "6 weeks",
      frequency: "2 classes per week",
      classesPerWeek: 2,
      sessionLength: "45 minutes",
      price: 999,
      level: "Beginner",
      icon: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
      goalsShort: ["Pencil grip", "Basic strokes", "Letter recognition", "Writing confidence"],
      goals: [
        "Hold a pencil using a relaxed tripod grip",
        "Draw basic strokes: lines, loops, zigzags and curves",
        "Recognise and trace uppercase and lowercase letter shapes",
        "Sit at a desk with balanced posture for 10 minutes",
        "Attempt short writing tasks without distress",
        "Build a positive association with writing materials"
      ],
      activities: [
        { t: "Warm-up strokes", d: "Air-writing and shoulder loosening before any mark on paper." },
        { t: "Trace and copy", d: "Guided tracing on wide-ruled grid paper, then independent copying." },
        { t: "Letter hunts", d: "Finding and circling target letters in a short playful worksheet." },
        { t: "Colour and decorate", d: "Turning practised letter shapes into drawings to keep it fun." }
      ],
      tracking: [
        "Grip and posture checklist per class",
        "Photo of the weekly practice sheet",
        "Short instructor note for parents"
      ]
    },
    {
      id: "handwriting-improvement",
      age: "7-9",
      ageLabel: "Age 7–9",
      title: "Handwriting Improvement",
      short: "Improvement",
      badge: "wb-badge-accent",
      tagline: "Clean letter formation, even spacing and straight baselines.",
      description:
        "Our core program for early school years. Children rebuild letter shapes correctly, " +
        "learn to space words consistently and keep writing on the baseline — then build speed " +
        "without losing the quality they have worked for.",
      duration: "8 weeks",
      frequency: "2 classes per week",
      classesPerWeek: 2,
      sessionLength: "60 minutes",
      price: 1799,
      level: "Beginner to intermediate",
      icon: '<path d="M3 17l5-6 4 4 4-7 5 5"/><path d="M3 21h18"/>',
      goalsShort: ["Letter formation", "Spacing", "Alignment", "Writing speed"],
      goals: [
        "Form uppercase and lowercase letters using the correct stroke sequence",
        "Sit letters consistently on the baseline",
        "Use even word spacing and consistent letter size",
        "Write at a comfortable speed without pressing too hard",
        "Complete a full notebook page with tidy margins",
        "Feel comfortable writing independently in class"
      ],
      activities: [
        { t: "Stroke clinic", d: "Targeting the three or four letters each child finds hardest." },
        { t: "Grid practice", d: "Squared paper work to fix letter height and alignment." },
        { t: "Sentence building", d: "Copying short sentences and then writing one from memory." },
        { t: "Speed rounds", d: "Timed copying where neatness is scored as well as speed." }
      ],
      tracking: [
        "Six skill scores updated every fortnight",
        "Before and after sample comparison",
        "Weekly home practice sheet",
        "Instructor feedback on each uploaded sample"
      ]
    },
    {
      id: "advanced-handwriting",
      age: "10-12",
      ageLabel: "Age 10–12",
      title: "Advanced Handwriting",
      short: "Advanced",
      badge: "wb-badge-purple",
      tagline: "Neat, consistent presentation for assignments and exams.",
      description:
        "For children whose handwriting is functional but untidy. We focus on consistency of " +
        "size and shape across a whole page, page layout, margin discipline and a writing speed " +
        "that holds up under time pressure.",
      duration: "8 weeks",
      frequency: "2 classes per week",
      classesPerWeek: 2,
      sessionLength: "60 minutes",
      price: 2499,
      level: "Intermediate",
      icon: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M8 20V9"/>',
      goalsShort: ["Neatness", "Consistency", "Speed", "Written presentation"],
      goals: [
        "Keep letter size and slant consistent across a page",
        "Plan page layout with headings, margins and paragraph breaks",
        "Write at exam speed while maintaining legibility",
        "Correct own common errors using a simple self-check list",
        "Use spacing to separate ideas clearly",
        "Present written work to a standard they are happy to hand in"
      ],
      activities: [
        { t: "Model copying", d: "Copying a model paragraph, then noting what changed." },
        { t: "Page planning", d: "Choosing margins, heading sizes and paragraph order." },
        { t: "Exam simulation", d: "Timed writing with a self-marked legibility score." },
        { t: "Style lab", d: "Optional session on personal style without losing consistency." }
      ],
      tracking: [
        "Legibility and speed rubric per month",
        "Full-page sample reviews",
        "Presentation checklist",
        "Term summary comparing Term 1 and Term 2 samples"
      ]
    },
    {
      id: "calligraphy-creative",
      age: "13+",
      ageLabel: "Age 13+",
      title: "Calligraphy & Creative Writing",
      short: "Calligraphy",
      badge: "wb-badge-accent",
      tagline: "Expressive lettering, pen control and confident presentation.",
      description:
        "For older children and teenagers. Modern lettering, brush pen control and classic " +
        "script styles, ending with decorated pages children are genuinely proud to show " +
        "friends or hand in.",
      duration: "10 weeks",
      frequency: "1 class per week",
      classesPerWeek: 1,
      sessionLength: "90 minutes",
      price: 2499,
      level: "Intermediate to advanced",
      icon: '<path d="M4 20c6-2 8-8 8-12a3 3 0 0 1 6 0c0 4-2 8-6 10"/><path d="M6 20h12"/>',
      goalsShort: ["Letter styling", "Calligraphy", "Creative lettering", "Presentation skills"],
      goals: [
        "Control pen pressure for thick and thin strokes",
        "Write two script styles legibly and consistently",
        "Design letters and words for specific occasions",
        "Plan decorated pages with balanced spacing and margins",
        "Choose tools and paper for a particular effect",
        "Finish a portfolio of three finished pieces"
      ],
      activities: [
        { t: "Tool lab", d: "Trying dip pens, brush pens and broad nibs side by side." },
        { t: "Style studies", d: "Copying one style fully before adapting it to your own." },
        { t: "Letter design", d: "Sketching custom letterforms for a word or phrase." },
        { t: "Final piece", d: "A decorated page or quote planned and executed over two sessions." }
      ],
      tracking: [
        "Portfolio of finished pieces",
        "Style progress notes",
        "Instructor critique at weeks 5 and 10",
        "Photo record for the parent dashboard"
      ]
    }
  ];

  var WORKSHOPS = [
    {
      id: "summer-writing-camp",
      age: "6-12",
      ageLabel: "Ages 6–12",
      title: "Summer Writing Intensive",
      duration: "1 week",
      frequency: "5 days",
      price: 3499,
      description: "Five short daily sessions that keep writing ticking over through the holidays.",
      icon: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>'
    },
    {
      id: "exam-writing-mastery",
      age: "10-14",
      ageLabel: "Ages 10–14",
      title: "Exam Writing Mastery",
      duration: "6 weeks",
      frequency: "1 class per week",
      price: 1999,
      description: "Writing legibly at speed under time pressure, with a self-marking routine.",
      icon: '<path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"/>'
    },
    {
      id: "left-handed-writers",
      age: "6-11",
      ageLabel: "Ages 6–11",
      title: "Left-Handed Writer Clinic",
      duration: "6 weeks",
      frequency: "1 class per week",
      price: 1499,
      description: "Posture, page angle and stroke direction designed for left-handed writers.",
      icon: '<path d="M20 20H7L3 16l9-9 8 8-5 5"/><path d="M12 7l5 5"/>'
    },
    {
      id: "parent-handwriting-workshop",
      age: "adult",
      ageLabel: "For parents & teachers",
      title: "Parent Handwriting Workshop",
      duration: "1 session",
      frequency: "2 hours",
      price: 799,
      description: "A single session on how to practise with your child at home without frustration.",
      icon: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c.6-3.4 2.9-5.2 5.5-5.2s4.9 1.8 5.5 5.2"/><path d="M17 10h4M17 14h4"/>'
    }
  ];

  var INSTRUCTORS = [
    {
      id: "meera-krishnan",
      name: "Meera Krishnan",
      qualification: "B.Ed, Special Education",
      experience: 9,
      specialization: "Handwriting",
      tags: ["handwriting", "childrens-learning"],
      image: "assets/images/meera",
      style: "Encouraging and methodical",
      bio:
        "Trained in special education, Meera works with children who find fine motor tasks " +
        "frustrating. She adapts grips, shortens tasks and celebrates every small win so that " +
        "writing never becomes a battle at home.",
      programs: ["foundation-writing", "handwriting-improvement"],
      languages: ["English", "Hindi", "Kannada"],
      availability: "Mon – Sat, mornings"
    },
    {
      id: "rohan-desai",
      name: "Rohan Desai",
      qualification: "MFA, Typography & Lettering",
      experience: 7,
      specialization: "Calligraphy",
      tags: ["calligraphy"],
      image: "assets/images/rohan",
      style: "Creative and relaxed",
      bio:
        "A practising calligrapher, Rohan introduces pen tools and script styles through short " +
        "design projects. Older students respond well to being treated as artists rather than " +
        "pupils.",
      programs: ["calligraphy-creative", "summer-writing-camp"],
      languages: ["English", "Hindi", "Marathi"],
      availability: "Sat – Sun, weekends"
    },
    {
      id: "anjali-verma",
      name: "Anjali Verma",
      qualification: "M.Ed, Early Childhood Education",
      experience: 11,
      specialization: "Children's Learning",
      tags: ["childrens-learning", "handwriting"],
      image: "assets/images/anjali",
      style: "Warm and structured",
      bio:
        "Anjali designs engaging lesson formats and keeps younger classes calm and routine-based. " +
        "Her older groups focus on written presentation for school and exams.",
      programs: ["advanced-handwriting", "exam-writing-mastery"],
      languages: ["English", "Hindi", "Tamil"],
      availability: "Tue – Sat, evenings"
    },
    {
      id: "sanjay-iyer",
      name: "Sanjay Iyer",
      qualification: "BFA, Visual Communication",
      experience: 6,
      specialization: "Creative Lettering",
      tags: ["calligraphy", "handwriting"],
      image: "assets/images/sanjay",
      style: "Experimental and precise",
      bio:
        "Sanjay combines typography discipline with playful lettering. He teaches pen pressure " +
        "control and layout, then pushes students to break the rules on purpose once the basics " +
        "are solid.",
      programs: ["calligraphy-creative", "exam-writing-mastery"],
      languages: ["English", "Hindi", "Malayalam"],
      availability: "Wed – Sun, afternoons"
    },
    {
      id: "fatima-sheikh",
      name: "Fatima Sheikh",
      qualification: "Montessori Early Childhood Training",
      experience: 8,
      specialization: "Children's Learning",
      tags: ["childrens-learning"],
      image: "assets/images/fatima",
      style: "Playful and unhurried",
      bio:
        "Fatima runs the youngest groups. Classes lean on rhythm, repetition and fine motor play, " +
        "which keeps four and five year olds interested long enough to build real habits.",
      programs: ["foundation-writing", "summer-writing-camp", "left-handed-writers"],
      languages: ["English", "Hindi", "Urdu"],
      availability: "Mon – Fri, mornings"
    }
  ];

  var BATCHES = [
    { id: "b1", name: "Saturday Morning", day: "Saturday", time: "10:00 AM – 11:00 AM", program: "Handwriting Improvement", programId: "handwriting-improvement", instructor: "Meera Krishnan", capacity: 15, enrolled: 11, mode: "Centre + Online", status: "Active" },
    { id: "b2", name: "Sunday Afternoon", day: "Sunday", time: "4:00 PM – 5:00 PM", program: "Handwriting Improvement", programId: "handwriting-improvement", instructor: "Meera Krishnan", capacity: 15, enrolled: 14, mode: "Centre", status: "Active" },
    { id: "b3", name: "Weekday Evening", day: "Mon / Wed", time: "5:30 PM – 6:30 PM", program: "Foundation Writing", programId: "foundation-writing", instructor: "Fatima Sheikh", capacity: 12, enrolled: 9, mode: "Centre", status: "Active" },
    { id: "b4", name: "Tuesday Letters", day: "Tuesday", time: "6:00 PM – 7:00 PM", program: "Advanced Handwriting", programId: "advanced-handwriting", instructor: "Anjali Verma", capacity: 14, enrolled: 12, mode: "Centre + Online", status: "Active" },
    { id: "b5", name: "Saturday Calligraphy", day: "Saturday", time: "11:30 AM – 1:00 PM", program: "Calligraphy & Creative Writing", programId: "calligraphy-creative", instructor: "Rohan Desai", capacity: 10, enrolled: 8, mode: "Centre", status: "Active" },
    { id: "b6", name: "Early Birds", day: "Wednesday", time: "5:00 PM – 6:00 PM", program: "Foundation Writing", programId: "foundation-writing", instructor: "Fatima Sheikh", capacity: 12, enrolled: 6, mode: "Online", status: "Active" },
    { id: "b7", name: "Saturday Refinement", day: "Saturday", time: "9:00 AM – 10:00 AM", program: "Advanced Handwriting", programId: "advanced-handwriting", instructor: "Anjali Verma", capacity: 14, enrolled: 13, mode: "Centre", status: "Almost full" },
    { id: "b8", name: "Sunday Script", day: "Sunday", time: "5:30 PM – 7:00 PM", program: "Calligraphy & Creative Writing", programId: "calligraphy-creative", instructor: "Sanjay Iyer", capacity: 10, enrolled: 5, mode: "Centre", status: "Active" }
  ];

  var PLANS = [
    {
      id: "starter",
      name: "Starter",
      price: 999,
      classes: 4,
      recommended: false,
      summary: "A gentle start with regular guided practice.",
      features: ["4 classes per month", "Practice worksheets", "Basic progress tracking", "Email support"],
      notIncluded: ["Sample reviews", "Calligraphy sessions", "Personalized feedback"]
    },
    {
      id: "growth",
      name: "Growth",
      price: 1799,
      classes: 8,
      recommended: true,
      summary: "More classes plus regular sample reviews.",
      features: ["8 classes per month", "Practice worksheets", "Sample reviews", "Progress tracking", "Priority batch booking"],
      notIncluded: ["Calligraphy sessions"]
    },
    {
      id: "creative",
      name: "Creative",
      price: 2499,
      classes: 12,
      recommended: false,
      summary: "Adds calligraphy practice and personal feedback.",
      features: ["12 classes per month", "Practice worksheets", "Sample reviews", "Progress tracking", "Calligraphy sessions", "Personalized feedback"],
      notIncluded: []
    }
  ];

  WB.data = {
    programs: PROGRAMS,
    workshops: WORKSHOPS,
    instructors: INSTRUCTORS,
    batches: BATCHES,
    plans: PLANS,
    programById: function (id) {
      return (
        PROGRAMS.filter(function (p) { return p.id === id; })[0] ||
        WORKSHOPS.filter(function (p) { return p.id === id; })[0] ||
        null
      );
    },
    instructorByName: function (name) {
      return INSTRUCTORS.filter(function (i) { return i.name === name; })[0] || null;
    }
  };
  window.WB_DATA = WB.data;

  /* ==================================================================
     2. SMALL RENDER HELPERS
     ================================================================== */
  function esc(s) {
    return String(s === undefined || s === null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
function picture(base, cls, alt, attrs) {
    return (
      '<picture class="contents">' +
      '<source type="image/avif" srcset="' + esc(base) + '.avif" />' +
      '<source type="image/webp" srcset="' + esc(base) + '.webp" />' +
      '<img src="' + esc(base) + '.jpg" alt="' + alt + '" class="' + cls + '" ' + (attrs || "") + "/>" +
      "</picture>"
    );
  }
  function rupee(n) {
    return "?" + Number(n).toLocaleString("en-IN");
  }
  function byId(id) {
    return document.getElementById(id);
  }

  /* ==================================================================
     3. PROGRAM SECTION RENDERER (programs.html)
     ================================================================== */
  function programSection(p, idx) {
    var panelId = "prog-panel-" + p.id;
    var trigId = "prog-trig-" + p.id;

    var goals = p.goals
      .map(function (g) {
        return (
          '<li class="flex items-start gap-2.5 text-[0.95rem]" style="color:rgba(255,255,255,.86)">' +
          '<span class="mt-1 shrink-0 grid place-items-center w-5 h-5 rounded-full" style="background:rgba(255,255,255,.18);color:var(--wb-cream-200)" aria-hidden="true">' +
          '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' +
          "</span>" + esc(g) + "</li>"
        );
      })
      .join("");

    var activities = p.activities
      .map(function (a, i) {
        return (
          '<article class="wb-card wb-card-cream p-5 h-full">' +
          '<span class="block mb-1" style="font-size:1.5rem;color:var(--wb-accent-ink)">' + (i + 1) + "</span>" +
          '<h4 class="mb-1" style="font-size:1rem">' + esc(a.t) + "</h4>" +
          '<p class="m-0 text-[0.89rem]" style="color:var(--wb-ink-500)">' + esc(a.d) + "</p>" +
          "</article>"
        );
      })
      .join("");

    var tracking = p.tracking
      .map(function (t) {
        return (
          '<li class="flex items-start gap-2 text-[0.92rem]" style="color:rgba(255,255,255,.86)">' +
          '<span style="color:var(--wb-accent-on-dark)" aria-hidden="true">▸</span>' + esc(t) + "</li>"
        );
      })
      .join("");

    var batches = WB.data.batches
      .filter(function (b) { return b.programId === p.id; })
      .map(function (b) {
        var full = b.enrolled >= b.capacity;
        return (
          '<div class="wb-card p-4 flex flex-col gap-2">' +
          '<div class="flex items-center justify-between gap-2">' +
          '<p class="font-bold m-0" style="font-size:0.97rem">' + esc(b.name) + "</p>" +
          '<span class="wb-badge ' + (full ?"wb-badge-warning" : "wb-badge-success") + '">' + b.enrolled + " / " + b.capacity + "</span>" +
          "</div>" +
          '<p class="text-[0.87rem] m-0" style="color:var(--wb-ink-500)">' + esc(b.day) + " · " + esc(b.time) + "</p>" +
          '<p class="text-[0.84rem] m-0" style="color:var(--wb-ink-400)">' + esc(b.mode) + " · " + esc(b.instructor) + "</p>" +
          "</div>"
        );
      })
      .join("");

    return (
      '<article class="wb-card wb-card-paper overflow-hidden wb-reveal" id="' + p.id + '" data-age="' + esc(p.age) + '" data-delay="' + Math.min(idx + 1, 6) + '" aria-labelledby="' + trigId + '">' +

        '<div class="grid lg:grid-cols-12">' +
          '<div class="lg:col-span-7 p-6 sm:p-8">' +
            '<div class="flex flex-wrap items-center gap-2 mb-3">' +
              '<span class="wb-badge ' + p.badge + '">' + esc(p.ageLabel) + "</span>" +
              '<span class="wb-badge wb-badge-neutral">' + esc(p.level) + "</span>" +
            "</div>" +
            '<h2 id="' + trigId + '" style="font-size:clamp(1.4rem,1.15rem+0.8vw,1.9rem)" class="mb-2">' + esc(p.title) + "</h2>" +
            '<p class="mb-3" style="font-size:1.6rem;color:var(--wb-primary)">' + esc(p.tagline) + "</p>" +
            '<p style="color:var(--wb-ink-500)">' + esc(p.description) + "</p>" +

            '<dl class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 m-0">' +
              '<div class="wb-stat p-3.5"><dt class="text-[0.7rem] font-bold uppercase tracking-widest text-ink-400 mb-1">Duration</dt><dd class="m-0 font-bold" style="font-size:1.02rem">' + esc(p.duration) + "</dd></div>" +
              '<div class="wb-stat p-3.5"><dt class="text-[0.7rem] font-bold uppercase tracking-widest text-ink-400 mb-1">Frequency</dt><dd class="m-0 font-bold" style="font-size:1.02rem">' + esc(p.frequency) + "</dd></div>" +
              '<div class="wb-stat p-3.5"><dt class="text-[0.7rem] font-bold uppercase tracking-widest text-ink-400 mb-1">Session</dt><dd class="m-0 font-bold" style="font-size:1.02rem">' + esc(p.sessionLength) + "</dd></div>" +
              '<div class="wb-stat p-3.5"><dt class="text-[0.7rem] font-bold uppercase tracking-widest text-ink-400 mb-1">From</dt><dd class="m-0 font-bold" style="font-size:1.02rem">' + rupee(p.price) + '<span class="text-[0.78rem] font-semibold text-ink-400">/mo</span></dd></div>' +
            "</dl>" +

            '<div class="flex flex-col sm:flex-row gap-3 mt-6">' +
              '<button type="button" class="wb-accordion-trigger wb-btn wb-btn-primary grow" style="min-height:0;border-radius:999px;padding:.85rem 1.6rem" aria-expanded="false" aria-controls="' + panelId + '">' +
                '<span>What Your Child Will Practice</span><span class="wb-accordion-icon" aria-hidden="true"></span>' +
              "</button>" +
              '<button type="button" class="wb-btn wb-btn-accent grow" data-enroll="' + esc(p.title) + '">Enroll in This Program</button>' +
            "</div>" +
          "</div>" +

          '<div class="lg:col-span-5 p-6 sm:p-8" style="background:var(--wb-primary);color:#fff">' +
            '<span class="grid place-items-center w-14 h-14 rounded-2xl mb-4" style="background:rgba(255,255,255,.16);color:var(--wb-cream-200)" aria-hidden="true">' +
              '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + p.icon + "</svg>" +
            "</span>" +
            '<h3 class="text-white" style="font-size:1.1rem">Learning Goals</h3>' +
            '<ul class="list-none m-0 p-0 flex flex-col gap-2.5 mb-6">' + goals + "</ul>" +
            '<div class="wb-pencil-rule wb-pencil-rule--cream mb-4" aria-hidden="true"></div>' +
            '<h3 class="text-white" style="font-size:1.1rem">Parent Progress Tracking</h3>' +
            '<ul class="list-none m-0 p-0 flex flex-col gap-2" style="color:rgba(255,255,255,.82)">' + tracking + "</ul>" +
          "</div>" +
        "</div>" +

        '<div class="wb-accordion-panel" id="' + panelId + '" role="region" aria-labelledby="' + trigId + '" hidden><div>' +
          '<div class="p-6 sm:p-8" style="border-top:1px dashed rgba(37,37,37,.16);background:var(--wb-white)">' +
            '<h3 class="mb-1" style="font-size:1.3rem">What Your Child Will Practice</h3>' +
            '<p class="mb-5" style="color:var(--wb-ink-500)">A typical week of guided exercises for this program.</p>' +
            '<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">' + activities + "</div>" +
            '<h3 class="mb-3" style="font-size:1.3rem">Sample Activities</h3>' +
            '<ul class="list-none m-0 p-0 grid sm:grid-cols-2 gap-2.5 mb-8">' +
              p.goalsShort.map(function (g) {
                return '<li class="flex items-center gap-2 text-[0.93rem]"><span class="wb-chip">' + esc(g) + "</span></li>";
              }).join("") +
            "</ul>" +
            '<h3 class="mb-3" style="font-size:1.3rem">Available Batches</h3>' +
            '<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-7">' + (batches || '<p class="wb-note m-0">Batch timings for this program are published on request.</p>') + "</div>" +
            '<div class="flex flex-col sm:flex-row gap-3">' +
              '<button type="button" class="wb-btn wb-btn-primary" data-enroll="' + esc(p.title) + '">Enroll in This Program</button>' +
              '<a href="contact.html" class="wb-btn wb-btn-quiet">Ask a Question</a>' +
            "</div>" +
          "</div>" +
        "</div></div>" +
      "</article>"
    );
  }

  function renderPrograms() {
    var host = byId("programsList");
    if (!host) return;
    host.innerHTML = PROGRAMS.map(programSection).join("");

    var workshopsHost = byId("workshopsList");
    if (workshopsHost) {
      workshopsHost.innerHTML = WORKSHOPS.map(function (w, i) {
        return (
          '<article class="wb-card wb-card-hover p-6 flex flex-col wb-reveal" data-age="' + esc(w.age) + '" data-delay="' + (i + 1) + '">' +
            '<div class="flex items-start justify-between gap-3 mb-4">' +
              '<span class="wb-badge wb-badge-cream">' + esc(w.ageLabel) + "</span>" +
              '<span class="grid place-items-center w-10 h-10 rounded-xl shrink-0" style="background:var(--wb-primary-100,#ECE9F5);color:var(--wb-primary)" aria-hidden="true">' +
                '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + w.icon + "</svg>" +
              "</span>" +
            "</div>" +
            '<h3 class="mb-2" style="font-size:1.15rem">' + esc(w.title) + "</h3>" +
            '<p class="text-[0.92rem] flex-1" style="color:var(--wb-ink-500)">' + esc(w.description) + "</p>" +
            '<dl class="flex flex-wrap gap-x-5 gap-y-1 text-[0.85rem] font-semibold m-0 mb-5" style="color:var(--wb-ink-500)">' +
              "<dt class=\"wb-sr\">Format</dt><dd class=\"m-0\">" + esc(w.duration) + " · " + esc(w.frequency) + "</dd>" +
              '<dt class="wb-sr">Price</dt><dd class="m-0" style="color:var(--wb-primary)">' + rupee(w.price) + " one-time</dd>" +
            "</dl>" +
            '<button type="button" class="wb-btn wb-btn-outline wb-btn-sm wb-btn-block mt-auto" data-enroll="' + esc(w.title) + '">Enrol Now</button>' +
          "</article>"
        );
      }).join("");
    }
  }

  /* ==================================================================
     4. AGE FILTER
     ================================================================== */
  var AGE_FILTERS = [
    { v: "all", l: "All" },
    { v: "4-6", l: "4–6" },
    { v: "7-9", l: "7–9" },
    { v: "10-12", l: "10–12" },
    { v: "13+", l: "13+" },
    { v: "adult", l: "Parents" }
  ];

  function renderAgeFilters() {
    var host = byId("ageFilters");
    if (!host) return;
    host.innerHTML = AGE_FILTERS.map(function (f, i) {
      return (
        '<button type="button" class="wb-pill" data-filter="' + esc(f.v) + '" aria-pressed="' + (i === 0 ? "true" : "false") + '">' + esc(f.l) + "</button>"
      );
    }).join("");

    var f = WB.filterPills(host, "[data-age]", "data-age");
    /* workshops use "13+"/"adult" style keys — normalise the plus */
    host.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-filter]");
      if (!btn) return;
      var v = btn.getAttribute("data-filter");
      if (!f) return;
      /* re-run with plus-aware matching */
      WB.qsa("[data-age]").forEach(function (it) {
        var a = it.getAttribute("data-age");
        var match = v === "all" || a === v || (v === "13+" && (a === "13+" || a === "adult"));
        it.hidden = !match;
        if (match && it.classList.contains("wb-reveal")) it.classList.add("is-in");
      });
      var shown = WB.qsa("[data-age]:not([hidden])").length;
      var live = WB.qs("[data-filter-status]");
      if (live) live.textContent = shown + (shown === 1 ? " item shown" : " items shown");
    });
  }

  /* ==================================================================
     5. INSTRUCTOR RENDERING (instructors.html)
     ================================================================== */
  function instructorCard(i, idx) {
    var badges = i.tags
      .map(function (t) {
        var label = t === "childrens-learning" ? "Children's Learning" : t.charAt(0).toUpperCase() + t.slice(1);
        var cls = t === "calligraphy" ? "wb-badge-accent" : "wb-badge-purple";
        return '<span class="wb-badge ' + cls + '">' + esc(label) + "</span>";
      })
      .join("");

    var programs = i.programs
      .map(function (pid) {
        var p = WB.data.programById(pid);
        return p ? esc(p.title) : esc(pid);
      })
      .join(", ");

    return (
      '<article class="wb-card wb-card-hover overflow-hidden flex flex-col wb-reveal" id="' + esc(i.id) + '" data-spec="' + esc(i.tags[0]) + '" data-tags="' + esc(i.tags.join(" ")) + '" data-delay="' + (idx + 1) + '" aria-labelledby="name-' + esc(i.id) + '">' +
        '<div class="relative">' +
          picture(
            esc(i.image),
            "w-full h-auto aspect-square object-cover",
            "Illustrated portrait of " + esc(i.name) + ", " + esc(i.specialization.toLowerCase()) + " instructor at WriteBright.",
            'width="400" height="400" loading="lazy"'
          ) +
          '<span class="absolute bottom-3 left-3 wb-badge" style="background:rgba(91,75,138,.92);color:#FFFFFF">' + i.experience + " yrs experience</span>" +
        "</div>" +
        '<div class="p-6 flex flex-col flex-1">' +
          '<div class="flex flex-wrap gap-2 mb-3">' + badges + "</div>" +
          '<h2 id="name-' + esc(i.id) + '" class="mb-1" style="font-size:1.25rem">' + esc(i.name) + "</h2>" +
          '<p class="text-[0.86rem] font-semibold mb-3" style="color:var(--wb-primary)">' + esc(i.qualification) + "</p>" +
          '<p class="text-[0.94rem] flex-1" style="color:var(--wb-ink-500)">' + esc(i.bio) + "</p>" +
          '<dl class="mt-5 m-0 grid grid-cols-1 gap-0">' +
            '<div class="wb-metric"><dt class="text-[0.88rem] font-semibold">Specialization</dt><dd class="m-0 text-[0.88rem] font-medium text-right" style="color:var(--wb-primary)">' + esc(i.specialization) + "</dd></div>" +
            '<div class="wb-metric"><dt class="text-[0.88rem] font-semibold">Experience</dt><dd class="m-0 text-[0.88rem] font-medium text-right" style="color:var(--wb-primary)">' + i.experience + " years</dd></div>" +
            '<div class="wb-metric"><dt class="text-[0.88rem] font-semibold">Teaching style</dt><dd class="m-0 text-[0.88rem] font-medium text-right" style="color:var(--wb-primary)">' + esc(i.style) + "</dd></div>" +
            '<div class="wb-metric"><dt class="text-[0.88rem] font-semibold">Availability</dt><dd class="m-0 text-[0.88rem] font-medium text-right" style="color:var(--wb-primary)">' + esc(i.availability) + "</dd></div>" +
          "</dl>" +
          '<p class="text-[0.78rem] font-bold uppercase tracking-widest text-ink-400 mt-4 mb-1">Available Programs</p>' +
          '<p class="text-[0.88rem] m-0 mb-5" style="color:var(--wb-ink-500)">' + programs + "</p>" +
          '<button type="button" class="wb-btn wb-btn-outline wb-btn-sm wb-btn-block mt-auto" data-instructor="' + esc(i.id) + '">View Profile</button>' +
        "</div>" +
      "</article>"
    );
  }

  function renderInstructors() {
    var host = byId("instructorsList");
    if (!host) return;
    host.innerHTML = INSTRUCTORS.map(instructorCard).join("");

    /* modal profile */
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-instructor]");
      if (!btn) return;
      var inst = INSTRUCTORS.filter(function (x) { return x.id === btn.getAttribute("data-instructor"); })[0];
      if (!inst) return;

      var programs = inst.programs
        .map(function (pid) {
          var p = WB.data.programById(pid);
          if (!p) return "";
          return (
            '<li class="wb-card wb-card-cream p-4">' +
              '<p class="font-bold m-0" style="font-size:0.98rem">' + esc(p.title) + "</p>" +
              '<p class="text-[0.85rem] m-0" style="color:var(--wb-ink-500)">' + esc(p.ageLabel) + " · " + esc(p.duration) + "</p>" +
            "</li>"
          );
        })
        .join("");

      WB.modal({
        title: inst.name,
        subtitle: inst.qualification + " · " + inst.experience + " years experience",
        body:
          picture(
            esc(inst.image),
            "w-24 h-24 rounded-2xl mb-4",
            "Illustrated portrait of " + esc(inst.name) + ".",
            'width="120" height="120"'
          ) +
          '<p class="mb-4">' + esc(inst.bio) + "</p>" +
          '<div class="grid grid-cols-2 gap-3 mb-5">' +
            '<div class="wb-card p-3"><p class="text-[0.7rem] font-bold uppercase tracking-widest text-ink-400 mb-1">Specialization</p><p class="font-semibold m-0" style="font-size:0.9rem">' + esc(inst.specialization) + "</p></div>" +
            '<div class="wb-card p-3"><p class="text-[0.7rem] font-bold uppercase tracking-widest text-ink-400 mb-1">Teaching style</p><p class="font-semibold m-0" style="font-size:0.9rem">' + esc(inst.style) + "</p></div>" +
            '<div class="wb-card p-3"><p class="text-[0.7rem] font-bold uppercase tracking-widest text-ink-400 mb-1">Availability</p><p class="font-semibold m-0" style="font-size:0.9rem">' + esc(inst.availability) + "</p></div>" +
            '<div class="wb-card p-3"><p class="text-[0.7rem] font-bold uppercase tracking-widest text-ink-400 mb-1">Languages</p><p class="font-semibold m-0" style="font-size:0.9rem">' + esc(inst.languages.join(", ")) + "</p></div>" +
          "</div>" +
          '<p class="text-[0.78rem] font-bold uppercase tracking-widest text-ink-400 mb-2">Available Programs</p>' +
          '<ul class="list-none m-0 p-0 grid gap-2">' + programs + "</ul>" +
          '<p class="wb-note mt-4 mb-0">Instructor details are illustrative demo content.</p>',
        footer:
          '<button type="button" class="wb-btn wb-btn-quiet" data-modal-close>Close</button>' +
          '<button type="button" class="wb-btn wb-btn-primary" data-enroll-in-modal="' + esc(inst.name) + '">Enroll with ' + esc(inst.name.split(" ")[0]) + "</button>"
      });

      var cta = document.querySelector("[data-enroll-in-modal]");
      if (cta) {
        cta.addEventListener("click", function () {
          var target = (window.WriteBrightNav && window.WriteBrightNav.pages.contact) || "contact.html";
          window.location.href = target + "?intent=enroll&instructor=" + encodeURIComponent(inst.name);
        });
      }
    });
  }

  function renderInstructorFilters() {
    var host = byId("specFilters");
    if (!host) return;
    var filters = [
      { v: "all", l: "All" },
      { v: "handwriting", l: "Handwriting" },
      { v: "calligraphy", l: "Calligraphy" },
      { v: "childrens-learning", l: "Children's Learning" }
    ];
    host.innerHTML = filters
      .map(function (f, i) {
        return '<button type="button" class="wb-pill" data-filter="' + esc(f.v) + '" aria-pressed="' + (i === 0 ? "true" : "false") + '">' + esc(f.l) + "</button>";
      })
      .join("");

    host.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-filter]");
      if (!btn) return;
      var v = btn.getAttribute("data-filter");
      WB.qsa("#instructorsList [data-tags]").forEach(function (it) {
        var tags = (it.getAttribute("data-tags") || "").split(" ");
        var match = v === "all" || tags.indexOf(v) !== -1;
        it.hidden = !match;
        if (match) it.classList.add("is-in");
      });
      var shown = WB.qsa("#instructorsList [data-tags]:not([hidden])").length;
      var live = WB.qs("[data-filter-status]");
      if (live) live.textContent = shown + (shown === 1 ? " instructor shown" : " instructors shown");
    });
  }

  /* ==================================================================
     6. BOOT
     ================================================================== */
  function init() {
    renderAgeFilters();
    renderPrograms();
    renderInstructorFilters();
    renderInstructors();
    if (WB.accordion) WB.accordion(document);
    if (WB.animateProgress) WB.animateProgress(document);
    document.dispatchEvent(new CustomEvent("wb:programs-ready"));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();