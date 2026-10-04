/* ==========================================================================
   WriteBright — js/parent-dashboard.js
   Front-end demonstration dashboard for parents. All children, scores,
   samples and invoices below are sample data held in memory only.
   ========================================================================== */
(function () {
  "use strict";

  var BASE = "../";
  var money = function (n) {
    return "₹" + Number(n).toLocaleString("en-IN");
  };

  var DATA = {
    parent: {
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 98765 43210",
      initials: "PS"
    },
    children: [
      {
        id: "aarav",
        name: "Aarav Sharma",
        age: 8,
        grade: "Class 3",
        initials: "AS",
        tone: "",
        program: "Handwriting Improvement",
        batch: "Batch C · Saturday, 10:00 AM",
        instructor: "Meera Krishnan",
        since: "Enrolled March 2025",
        overall: 73,
        attendance: 92,
        classesAttended: 36,
        streak: 5,
        focus: "Keeping a steady slant and staying on the baseline",
        practice: "Two pages of joined-letter practice, 15 minutes on 4 days a week.",
        skills: [
          { name: "Letter Formation", value: 82, note: "Clear, rounded shapes" },
          { name: "Size & Spacing", value: 74, note: "Watch the gap after 'm'" },
          { name: "Slant & Baseline", value: 68, note: "Main focus area this term" },
          { name: "Stroke Control", value: 79, note: "Confident pencil control" },
          { name: "Speed & Rhythm", value: 61, note: "Improving steadily" },
          { name: "Neatness", value: 75, note: "Fewer crossings-out" }
        ],
        trend: [
          { m: "Apr", v: 52 },
          { m: "May", v: 57 },
          { m: "Jun", v: 61 },
          { m: "Jul", v: 66 },
          { m: "Aug", v: 69 },
          { m: "Sep", v: 73 }
        ],
        goals: [
          { text: "Hold a 70° slant for a full paragraph", done: true },
          { text: "Write three lines without touching the rules", done: true },
          { text: "Join letters in 'th', 'ch' and 'sh'", done: false },
          { text: "Complete one page in under 10 minutes", done: false }
        ],
        notes: [
          {
            date: "28 Sep 2025",
            who: "Meera Krishnan",
            text: "Aarav's letter shapes are much rounder now. This week we worked on keeping the baseline steady while writing from memory."
          },
          {
            date: "21 Sep 2025",
            who: "Meera Krishnan",
            text: "Excellent focus in class. I have set two short daily practice pages so the gains carry into schoolwork."
          },
          {
            date: "14 Sep 2025",
            who: "WriteBright Desk",
            text: "Monthly progress report for Aarav is ready to view in the Progress section."
          }
        ]
      },
      {
        id: "myra",
        name: "Myra Nair",
        age: 11,
        grade: "Class 6",
        initials: "MN",
        tone: "wb-avatar--cream",
        program: "Calligraphy & Creative Writing",
        batch: "Batch A · Tuesday, 5:30 PM",
        instructor: "Anjali Verma",
        since: "Enrolled June 2025",
        overall: 84,
        attendance: 96,
        classesAttended: 28,
        streak: 9,
        focus: "Consistent pressure on downstrokes and loop joins",
        practice: "One copperplate drill page and 10 minutes of spacing practice.",
        skills: [
          { name: "Letter Formation", value: 90, note: "Fluent scripts" },
          { name: "Size & Spacing", value: 86, note: "Even rhythm" },
          { name: "Slant & Baseline", value: 82, note: "Consistent 55°" },
          { name: "Stroke Control", value: 88, note: "Confident pressure" },
          { name: "Speed & Rhythm", value: 78, note: "Building flow" },
          { name: "Neatness", value: 81, note: "Presentation quality" }
        ],
        trend: [
          { m: "Apr", v: 62 },
          { m: "May", v: 66 },
          { m: "Jun", v: 71 },
          { m: "Jul", v: 74 },
          { m: "Aug", v: 80 },
          { m: "Sep", v: 84 }
        ],
        goals: [
          { text: "Write a full quote in one confident line", done: true },
          { text: "Master the loop join in 'a' and 'd'", done: true },
          { text: "Keep downstroke pressure even across a line", done: false },
          { text: "Finish a two-word monogram", done: false }
        ],
        notes: [
          {
            date: "30 Sep 2025",
            who: "Anjali Verma",
            text: "Myra's copperplate has real elegance. Next we are refining the shaded downstrokes on longer words."
          },
          {
            date: "23 Sep 2025",
            who: "Anjali Verma",
            text: "Great practice consistency — nine classes in a row now. Keep the daily drill short and steady."
          },
          {
            date: "16 Sep 2025",
            who: "WriteBright Desk",
            text: "Monthly progress report for Myra is ready to view in the Progress section."
          }
        ]
      }
    ],
    enrollments: [
      {
        id: "EN-2041",
        child: "Aarav",
        program: "Handwriting Improvement",
        batch: "Batch C · Sat, 10:00 AM",
        start: "08 Mar 2025",
        plan: "Growth",
        fee: 1799,
        status: "Active"
      },
      {
        id: "EN-2042",
        child: "Myra",
        program: "Calligraphy & Creative Writing",
        batch: "Batch A · Tue, 5:30 PM",
        start: "12 Jun 2025",
        plan: "Creative",
        fee: 2499,
        status: "Active"
      },
      {
        id: "EN-1998",
        child: "Aarav",
        program: "Summer Writing Intensive",
        batch: "Camp batch · Jun 2025",
        start: "02 Jun 2025",
        end: "28 Jun 2025",
        plan: "One-off",
        fee: 4499,
        status: "Completed"
      },
      {
        id: "EN-1877",
        child: "Myra",
        program: "Left-Handed Writer Clinic",
        batch: "Clinic · Aug 2025",
        start: "04 Aug 2025",
        end: "29 Aug 2025",
        plan: "Add-on",
        fee: 899,
        status: "Completed"
      }
    ],
    schedule: [
      { day: "Monday", date: "06 Oct", time: "4:00 PM", program: "Handwriting Improvement", child: "Aarav", batch: "Batch B", room: "Studio 1", status: "upcoming", teacher: "Rohan Desai" },
      { day: "Monday", date: "06 Oct", time: "5:30 PM", program: "Calligraphy & Creative Writing", child: "Myra", batch: "Batch A", room: "Studio 2", status: "upcoming", teacher: "Anjali Verma" },
      { day: "Tuesday", date: "07 Oct", time: "5:30 PM", program: "Calligraphy & Creative Writing", child: "Myra", batch: "Batch A", room: "Studio 2", status: "upcoming", teacher: "Anjali Verma" },
      { day: "Wednesday", date: "08 Oct", time: "4:30 PM", program: "Foundation Writing", child: "—", batch: "Batch F", room: "Studio 1", status: "demo", teacher: "Sanjay Iyer" },
      { day: "Thursday", date: "09 Oct", time: "5:00 PM", program: "Handwriting Improvement", child: "Aarav", batch: "Batch C", room: "Studio 3", status: "upcoming", teacher: "Meera Krishnan" },
      { day: "Saturday", date: "11 Oct", time: "10:00 AM", program: "Handwriting Improvement", child: "Aarav", batch: "Batch C", room: "Studio 1", status: "upcoming", teacher: "Meera Krishnan" },
      { day: "Saturday", date: "11 Oct", time: "11:30 AM", program: "Left-Handed Writer Clinic", child: "Myra", batch: "Clinic", room: "Studio 2", status: "demo", teacher: "Fatima Sheikh" }
    ],
    payments: [
      { id: "INV-3021", child: "Aarav", plan: "Growth", desc: "Growth plan · October 2025", amount: 1799, date: "01 Oct 2025", method: "UPI", status: "Pending" },
      { id: "INV-3014", child: "Aarav", plan: "Growth", desc: "Growth plan · September 2025", amount: 1799, date: "01 Sep 2025", method: "UPI", status: "Paid" },
      { id: "INV-3008", child: "Myra", plan: "Creative", desc: "Creative plan · September 2025", amount: 2499, date: "01 Sep 2025", method: "Card", status: "Paid" },
      { id: "INV-2996", child: "Aarav", plan: "Growth", desc: "Growth plan · August 2025", amount: 1799, date: "01 Aug 2025", method: "UPI", status: "Paid" },
      { id: "INV-2985", child: "Myra", plan: "Creative", desc: "Creative plan · August 2025", amount: 2499, date: "01 Aug 2025", method: "UPI", status: "Paid" },
      { id: "INV-2971", child: "Both", plan: "Sibling", desc: "Sibling discount applied (10%)", amount: 3872, date: "01 Jul 2025", method: "UPI", status: "Paid" },
      { id: "INV-2960", child: "Myra", plan: "Creative", desc: "Creative plan · June 2025", amount: 2499, date: "01 Jun 2025", method: "UPI", status: "Paid" },
      { id: "INV-2955", child: "Aarav", plan: "Growth", desc: "Growth plan · June 2025", amount: 1799, date: "01 Jun 2025", method: "UPI", status: "Paid" },
      { id: "INV-2941", child: "Myra", plan: "Creative", desc: "Creative plan · May 2025", amount: 2499, date: "01 May 2025", method: "UPI", status: "Paid" },
      { id: "INV-2930", child: "Aarav", plan: "Growth", desc: "Growth plan · May 2025", amount: 1799, date: "01 May 2025", method: "UPI", status: "Paid" }
    ],
    messages: [
      {
        id: "m1",
        from: "Meera Krishnan",
        role: "Instructor · Aarav's batch",
        initials: "MK",
        time: "Yesterday, 6:40 PM",
        unread: true,
        text: "Aarav worked hard on slant consistency today. I have uploaded two extra drill pages to his practice folder — ten minutes a day is plenty."
      },
      {
        id: "m2",
        from: "Anjali Verma",
        role: "Instructor · Myra's batch",
        initials: "AV",
        time: "30 Sep, 7:15 PM",
        unread: true,
        text: "Myra is ready to try shaded downstrokes. I have attached a reference sheet for the term project."
      },
      {
        id: "m3",
        from: "WriteBright Desk",
        role: "Accounts",
        initials: "WB",
        time: "01 Oct, 9:05 AM",
        unread: false,
        text: "October invoices for both children are now available in the Payments section. The sibling discount is applied automatically."
      },
      {
        id: "m4",
        from: "Sanjay Iyer",
        role: "Centre head",
        initials: "SI",
        time: "24 Sep, 4:20 PM",
        unread: false,
        text: "Diwali break dates are confirmed: classes resume on 22 October. Two make-up slots are available on 19 and 20 October."
      }
    ]
  };

  var SECTIONS = [
    { id: "overview", label: "Overview", icon: '<rect x="3" y="3" width="7" height="9" rx="1.6"/><rect x="14" y="3" width="7" height="5" rx="1.6"/><rect x="14" y="12" width="7" height="9" rx="1.6"/><rect x="3" y="16" width="7" height="5" rx="1.6"/>' },
    { id: "children", label: "My Children", icon: '<circle cx="9" cy="8" r="3.4"/><path d="M3 20c.7-3.6 3.1-5.4 6-5.4s5.3 1.8 6 5.4"/><circle cx="17.5" cy="9" r="2.6"/><path d="M15.5 20c.2-1.4.7-2.5 1.5-3.2"/>' },
    { id: "enrollments", label: "Enrollments", icon: '<rect x="4" y="3.5" width="16" height="17" rx="2.4"/><path d="M8 9h8M8 13h8M8 17h5"/>' },
    { id: "schedule", label: "Class Schedule", icon: '<rect x="3" y="5" width="18" height="16" rx="2.4"/><path d="M3 10h18M8 3v4M16 3v4"/>' },
    { id: "progress", label: "Handwriting Progress", icon: '<path d="M3 17.5 9 11l4 4 8-8.5"/><path d="M15 6.5h6v6"/>' },
    { id: "uploads", label: "Sample Uploads", icon: '<path d="M12 16V4"/><path d="m7.5 8.5 4.5-4.5 4.5 4.5"/><path d="M4 16v2.5A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V16"/>' },
    { id: "payments", label: "Payments", icon: '<rect x="2.5" y="5.5" width="19" height="13" rx="2.4"/><path d="M2.5 10h19M6 14.5h4"/>' },
    { id: "messages", label: "Messages", icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>' }
  ];

  var TITLES = {
    overview: ["Overview", "Welcome back, "],
    children: ["My Children", "Enrolled learners on this account"],
    enrollments: ["Enrollments", "Programs and batch details"],
    schedule: ["Class Schedule", "Your weekly class timetable"],
    progress: ["Handwriting Progress", "Skill scores, samples and instructor notes"],
    uploads: ["Sample Uploads", "Share handwriting samples with your instructor"],
    payments: ["Payments", "Invoices, plans and payment history"],
    messages: ["Messages", "Talk to instructors and the centre desk"]
  };

  var state = {
    section: "overview",
    child: "aarav",
    thread: "m1",
    samples: [
      { id: "s1", child: "Aarav", title: "Weekly sample — joined letters", date: "28 Sep 2025", note: "Slant drill, page 2", before: "sample-aarav-before", after: "sample-aarav-after", status: "Reviewed" },
      { id: "s2", child: "Aarav", title: "Paragraph practice", date: "21 Sep 2025", note: "First attempt at 3-line paragraph", before: "sample-aarav-before", after: "sample-aarav-after", status: "Reviewed" },
      { id: "s3", child: "Myra", title: "Copperplate capitals", date: "26 Sep 2025", note: "Shaded downstroke trial", before: "sample-myra-before", after: "sample-myra-after", status: "Reviewed" },
      { id: "s4", child: "Myra", title: "Loop join drill", date: "19 Sep 2025", note: "Focus on 'a' and 'd'", before: "sample-myra-before", after: "sample-myra-after", status: "In review" },
      { id: "s5", child: "Aarav", title: "Letter formation basics", date: "12 Sep 2025", note: "Baseline consistency check", before: "letter-formation-before", after: "letter-formation-after", status: "Reviewed" },
      { id: "s6", child: "Myra", title: "Term project — quote card", date: "05 Sep 2025", note: "First draft of the quote card", before: "calligraphy-before", after: "calligraphy-after", status: "In review" }
    ],
    uploads: []
  };

  /* ------------------------------------------------------------------ */
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(v) {
    return String(v === undefined || v === null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
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
  function childById(id) {
    for (var i = 0; i < DATA.children.length; i++) if (DATA.children[i].id === id) return DATA.children[i];
    return DATA.children[0];
  }
  function currentChild() { return childById(state.child); }
  function statusBadge(s) {
    var map = {
      Active: "wb-badge-success",
      Paid: "wb-badge-success",
      Reviewed: "wb-badge-success",
      Completed: "wb-badge-purple",
      Pending: "wb-badge-warning",
      "In review": "wb-badge-warning",
      Demo: "wb-badge-neutral",
      Cancelled: "wb-badge-danger"
    };
    return '<span class="wb-badge ' + (map[s] ||"wb-badge-neutral") + '">' + esc(s) + "</span>";
  }
  function ring(value, label, size) {
    return (
      '<div class="wb-ring" data-value="' + value + '" role="img" aria-label="' + esc(label) + ": " + value + ' out of 100"' +
      (size ? ' style="--wb-ring-size:' + size + 'px"' : "") +
      '><span class="wb-ring-label"><strong>' + value + '</strong><small>' + esc(label) + "</small></span></div>"
    );
  }
  function skillBars(child, limit) {
    var list = limit ? child.skills.slice(0, limit) : child.skills;
    return list
      .map(function (s) {
        return (
          '<div class="mb-3.5">' +
          '<div class="flex items-baseline justify-between gap-3 mb-1.5">' +
          '<span class="font-bold text-[0.88rem]">' + esc(s.name) + "</span>" +
          '<span class="text-[0.82rem] font-semibold" style="color:var(--wb-ink-500)">' + s.value + "%</span>" +
          "</div>" +
          '<div class="wb-progress wb-progress-sm" role="progressbar" aria-label="' + esc(s.name) + '" aria-valuenow="' + s.value + '" aria-valuemin="0" aria-valuemax="100">' +
          '<span class="wb-progress-fill" data-value="' + s.value + '"></span></div>' +
          '<p class="m-0 mt-1.5 text-[0.8rem]" style="color:var(--wb-ink-400)">' + esc(s.note) + "</p>" +
          "</div>"
        );
      })
      .join("");
  }
  function barChart(points) {
    var max = Math.max.apply(null, points.map(function (p) { return p.v; }));
    return (
      '<div class="flex items-end gap-2 sm:gap-3" style="height:160px" role="img" aria-label="Average skill score over six months">' +
      points
        .map(function (p) {
          var h = Math.round((p.v / (max + 6)) * 100);
          return (
            '<div class="flex-1 flex flex-col items-center gap-2">' +
            '<span class="text-[0.72rem] font-bold" style="color:var(--wb-primary)">' + p.v + "</span>" +
            '<div class="w-full rounded-t-lg" style="height:' + h + '%;min-height:8px;background:linear-gradient(180deg,#7A68AD,#5B4B8A)" title="' + esc(p.m) + ": " + p.v + '"></div>' +
            '<span class="text-[0.72rem]" style="color:var(--wb-ink-400)">' + esc(p.m) + "</span>" +
            "</div>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  /* ------------------------------------------------------------------ */
  function panelWrap(id, inner) {
    var label = (SECTIONS.filter(function (s) { return s.id === id; })[0] || {}).label || id;
    return (
      '<section class="wb-dash-panel" data-panel="' + id + '" aria-label="' + esc(label) + '"' +
      (id === state.section ? "" : " hidden") + ">" + inner + "</section>"
    );
  }
  function head(id, title, desc, actions) {
    return (
      '<div class="wb-panel-head"><div><h2>' + esc(title) + "</h2>" +
      (desc ? "<p>" + esc(desc) + "</p>" : "") + "</div>" +
      (actions ? '<div class="wb-panel-actions">' + actions + "</div>" : "") +
      "</div>"
    );
  }

  /* ---------------------------- OVERVIEW ---------------------------- */
  function overviewPanel() {
    var c = currentChild();
    var next = DATA.schedule.filter(function (s) { return s.child === c.name.split(" ")[0] && s.status === "upcoming"; })[0] || DATA.schedule[0];
    var paid = DATA.payments.filter(function (p) { return p.status === "Paid"; }).reduce(function (a, p) { return a + p.amount; }, 0);

    var stats =
      '<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">' +
      [
        { v: c.classesAttended, l: "Classes attended", i: '<path d="M4 19V5m0 14h16"/><path d="M8 15l3.5-4 3 2.5L20 7"/>', t: "" },
        { v: c.attendance + "%", l: "Attendance rate", i: '<circle cx="12" cy="12" r="8.5"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/>', t: "success" },
        { v: c.overall, l: "Overall skill score", i: '<path d="M12 4 2.8 9.2 5 19h14l2.2-9.8z"/><path d="M9 12.5 11 15l4.5-5"/>', t: "cream" },
        { v: 2, l: "Practice pages pending", i: '<rect x="4" y="3.5" width="16" height="17" rx="2.4"/><path d="M8 9h8M8 13h5"/>', t: "accent" }
      ]
        .map(function (s) {
          return (
            '<div class="wb-stat">' +
            '<div class="flex items-start gap-3">' +
            '<span class="wb-stat-ico wb-stat-ico--' + (s.t ||"primary") + '" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + s.i + "</svg></span>" +
            '<div class="min-w-0"><p class="m-0 text-[0.8rem] font-semibold" style="color:var(--wb-ink-400)">' + esc(s.l) + "</p>" +
            '<p class="wb-stat-value m-0">' + s.v + "</p></div></div></div>"
          );
        })
        .join("") +
      "</div>";

    var nextCard =
      '<div class="wb-card p-5 sm:p-6 h-full">' +
      '<p class="wb-eyebrow mb-2">Next Class</p>' +
      '<h3 class="mb-1" style="font-size:1.15rem">' + esc(next.day) + ", " + esc(next.date) + "</h3>" +
      '<p class="mb-4" style="font-size:1.5rem;color:var(--wb-primary)">' + esc(next.time) + " · " + esc(next.room) + "</p>" +
      '<ul class="list-none m-0 p-0 flex flex-col gap-2 mb-5" style="color:var(--wb-ink-500);font-size:.92rem">' +
      "<li><strong style=\"color:var(--wb-ink)\">Program:</strong> " + esc(next.program) + "</li>" +
      "<li><strong style=\"color:var(--wb-ink)\">Batch:</strong> " + esc(next.batch) + "</li>" +
      "<li><strong style=\"color:var(--wb-ink)\">Instructor:</strong> " + esc(next.teacher) + "</li>" +
      '<li><strong style="color:var(--wb-ink)">For:</strong> ' + esc(next.child) + "</li>" +
      "</ul>" +
      '<div class="flex flex-col sm:flex-row gap-2.5">' +
      '<button type="button" class="wb-btn wb-btn-primary wb-btn-sm" data-action="calendar">Add to Calendar</button>' +
      '<button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-goto="schedule">Full Schedule</button>' +
      "</div></div>";

    var week =
      '<div class="wb-card p-5 sm:p-6">' +
      head("week", "This Week", "Classes for " + esc(c.name)) +
      '<ul class="list-none m-0 p-0 flex flex-col gap-2.5">' +
      DATA.schedule.slice(0, 5)
        .map(function (s) {
          var mine = s.child === c.name.split(" ")[0];
          return (
            '<li class="flex items-center gap-3 p-2.5 rounded-xl" style="background:' + (mine ? "var(--wb-primary-50)" : "transparent") + '">' +
            '<span class="wb-chip" style="flex:0 0 auto;min-width:74px;justify-content:center">' + esc(s.day.slice(0, 3)) + " " + esc(s.date.split(" ")[0]) + "</span>" +
            '<span class="min-w-0 flex-1"><strong class="block text-[0.88rem]">' + esc(s.time) + " · " + esc(s.program) + "</strong>" +
            '<small class="block" style="color:var(--wb-ink-400)">' + esc(s.room) + " · " + esc(s.child) + "</small></span>" +
            (mine ? '<span class="wb-badge wb-badge-purple">Yours</span>' : "") +
            "</li>"
          );
        })
        .join("") +
      "</ul></div>";

    var progressCard =
      '<div class="wb-card p-5 sm:p-6">' +
      head("snap", "Progress Snapshot", esc(c.name), '<button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-goto="progress">View Report</button>') +
      '<div class="flex flex-col sm:flex-row gap-5 items-center sm:items-start">' +
      ring(c.overall, "Overall") +
      '<div class="flex-1 w-full min-w-0">' + skillBars(c, 3) + "</div>" +
      "</div></div>";

    var activity =
      '<div class="wb-card p-5 sm:p-6">' +
      head("act", "Recent Activity", "Updates for both children") +
      '<div class="wb-timeline">' +
      c.notes
        .map(function (n) {
          return (
            '<div class="wb-timeline-item wb-timeline-item--accent">' +
            '<p class="m-0 font-bold text-[0.88rem]">' + esc(n.text.slice(0, 58)) + "…</p>" +
            '<p class="m-0 text-[0.8rem]" style="color:var(--wb-ink-400)">' + esc(n.who) + " · " + esc(n.date) + "</p></div>"
          );
        })
        .join("") +
      '<div class="wb-timeline-item"><p class="m-0 font-bold text-[0.88rem]">October invoices generated</p>' +
      '<p class="m-0 text-[0.8rem]" style="color:var(--wb-ink-400)">WriteBright Desk · 01 Oct 2025</p></div>' +
      '<div class="wb-timeline-item"><p class="m-0 font-bold text-[0.88rem]">Total paid to date: ' + money(paid) + "</p>" +
      '<p class="m-0 text-[0.8rem]" style="color:var(--wb-ink-400)">10 invoices on this account</p></div>' +
      "</div></div>";

    var actions =
      '<div class="wb-card p-5 sm:p-6">' +
      head("qa", "Quick Actions", "Common parent tasks") +
      '<div class="grid sm:grid-cols-2 gap-3">' +
      [
        { t: "Upload a Sample", a: "goto:uploads", i: '<path d="M12 16V4"/><path d="m7.5 8.5 4.5-4.5 4.5 4.5"/>' },
        { t: "Message Instructor", a: "goto:messages", i: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>' },
        { t: "Pay October Invoice", a: "goto:payments", i: '<rect x="2.5" y="5.5" width="19" height="13" rx="2.4"/><path d="M2.5 10h19"/>' },
        { t: "Book an Assessment", a: "action:assessment", i: '<rect x="3" y="5" width="18" height="16" rx="2.4"/><path d="M3 10h18M8 3v4M16 3v4"/>' }
      ]
        .map(function (b) {
          return (
            '<button type="button" class="wb-btn wb-btn-outline wb-btn-sm wb-btn-block justify-start" data-' + b.a + ">" +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + b.i + "</svg>" + esc(b.t) + "</button>"
          );
        })
        .join("") +
      "</div></div>";

    return panelWrap(
      "overview",
      stats +
        '<div class="grid gap-5 xl:grid-cols-2 mb-5">' + nextCard + week + "</div>" +
        '<div class="grid gap-5 xl:grid-cols-2">' + progressCard + activity + "</div>" +
        '<div class="mt-5">' + actions + "</div>"
    );
  }

  /* ---------------------------- CHILDREN ---------------------------- */
  function childrenPanel() {
    var cards = DATA.children
      .map(function (c) {
        var isCurrent = c.id === state.child;
        return (
          '<div class="wb-card p-5 sm:p-6 h-full" style="' + (isCurrent ? "border-color:var(--wb-primary);box-shadow:0 0 0 3px var(--wb-primary-100)" : "") + '">' +
          '<div class="flex items-start gap-3.5 mb-4">' +
          '<span class="wb-avatar ' + (c.tone ||"") + '" style="width:52px;height:52px;flex-basis:52px;font-size:1rem" aria-hidden="true">' + esc(c.initials) + "</span>" +
          '<div class="min-w-0 flex-1"><h3 class="m-0" style="font-size:1.1rem">' + esc(c.name) + "</h3>" +
          '<p class="m-0 text-[0.85rem]" style="color:var(--wb-ink-400)">Age ' + c.age + " · " + esc(c.grade) + "</p></div>" +
          (isCurrent ? '<span class="wb-badge wb-badge-purple">Viewing</span>' : "") +
          "</div>" +
          '<ul class="list-none m-0 p-0 flex flex-col gap-2 mb-4" style="font-size:.9rem;color:var(--wb-ink-500)">' +
          "<li><strong style=\"color:var(--wb-ink)\">Program:</strong> " + esc(c.program) + "</li>" +
          "<li><strong style=\"color:var(--wb-ink)\">Batch:</strong> " + esc(c.batch) + "</li>" +
          "<li><strong style=\"color:var(--wb-ink)\">Instructor:</strong> " + esc(c.instructor) + "</li>" +
          "<li><strong style=\"color:var(--wb-ink)\">Enrolled:</strong> " + esc(c.since) + "</li>" +
          "</ul>" +
          '<div class="flex items-center gap-4 mb-4">' +
          ring(c.overall, "Score") +
          '<div class="flex-1"><div class="wb-metric"><span class="text-[0.85rem]">Attendance</span><strong class="text-[0.9rem]">' + c.attendance + "%</strong></div>" +
          '<div class="wb-metric"><span class="text-[0.85rem]">Classes attended</span><strong class="text-[0.9rem]">' + c.classesAttended + "</strong></div>" +
          '<div class="wb-metric"><span class="text-[0.85rem]">Class streak</span><strong class="text-[0.9rem]">' + c.streak + " weeks</strong></div></div>" +
          "</div>" +
          '<div class="flex flex-wrap gap-2">' +
          (isCurrent
            ? '<button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-goto="progress">View Progress</button>'
            : '<button type="button" class="wb-btn wb-btn-primary wb-btn-sm" data-switch-child="' + esc(c.id) + '">Switch to ' + esc(c.name.split(" ")[0]) + "</button>") +
          '<button type="button" class="wb-btn wb-btn-outline wb-btn-sm" data-child-detail="' + esc(c.id) + '">Details</button>' +
          "</div></div>"
        );
      })
      .join("");

    return panelWrap(
      "children",
      head("children", "My Children", "Two learners are enrolled on this account") +
        '<div class="grid gap-5 lg:grid-cols-2">' + cards + "</div>"
    );
  }

  /* --------------------------- ENROLLMENTS -------------------------- */
  function enrollmentsPanel() {
    var rows = DATA.enrollments
      .map(function (e) {
        return (
          "<tr>" +
          '<td data-label="Reference"><strong>' + esc(e.id) + "</strong></td>" +
          '<td data-label="Child">' + esc(e.child) + "</td>" +
          '<td data-label="Program">' + esc(e.program) + '<br /><small style="color:var(--wb-ink-400)">' + esc(e.batch) + "</small></td>" +
          '<td data-label="Started">' + esc(e.start) + (e.end ? '<br /><small style="color:var(--wb-ink-400)">Ended ' + esc(e.end) + "</small>" : "") + "</td>" +
          '<td data-label="Plan">' + esc(e.plan) + "</td>" +
          '<td data-label="Fee" class="num">' + money(e.fee) + "</td>" +
          '<td data-label="Status">' + statusBadge(e.status) + "</td>" +
          '<td data-label="Actions"><button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-enrolment="' + esc(e.id) + '">View</button></td>' +
          "</tr>"
        );
      })
      .join("");

    var table =
      '<div class="wb-card p-5 sm:p-6">' +
      head("enrol", "Enrolment History", "Current and past enrolments for both children") +
      '<div class="wb-table-wrap"><div class="wb-table-scroll wb-scroll-thin" tabindex="0" role="region" aria-label="Scrollable table"><table class="wb-table wb-table--cards">' +
      "<thead><tr><th scope=\"col\">Reference</th><th scope=\"col\">Child</th><th scope=\"col\">Program</th><th scope=\"col\">Dates</th><th scope=\"col\">Plan</th><th scope=\"col\" class=\"num\">Fee</th><th scope=\"col\">Status</th><th scope=\"col\">Actions</th></tr></thead>" +
      "<tbody>" + rows + "</tbody></table></div></div>" +
      '<p class="wb-note mt-3 mb-0">Fees shown are the demo plan prices used across this website.</p>' +
      "</div>";

    var plans =
      '<div class="wb-card p-5 sm:p-6">' +
      head("plan", "Current Plan", "Two active monthly plans") +
      '<div class="grid gap-4 sm:grid-cols-2">' +
      DATA.children
        .map(function (c) {
          var en = DATA.enrollments.filter(function (e) { return e.child === c.name.split(" ")[0] && e.status === "Active"; })[0];
          return (
            '<div class="wb-card wb-card-cream p-4">' +
            '<div class="flex items-center justify-between gap-2 mb-2">' +
            '<span class="font-bold" style="font-size:1rem">' + esc(en ? en.plan : "—") + " plan</span>" +
            '<span class="wb-badge wb-badge-cream">' + esc(c.name.split(" ")[0]) + "</span></div>" +
            '<p class="m-0 mb-1" style="font-size:1.35rem;font-weight:800;color:var(--wb-primary)">' + money(en ? en.fee : 0) +
            '<small style="font-size:.8rem;font-weight:600"> / month</small></p>' +
            '<p class="m-0 text-[0.85rem]" style="color:var(--wb-ink-500)">' + esc(c.program) + "</p>" +
            '<p class="m-0 mt-2 text-[0.8rem]" style="color:var(--wb-ink-400)">Next billing: 01 Nov 2025</p>' +
            "</div>"
          );
        })
        .join("") +
      "</div>" +
      '<div class="flex flex-wrap gap-2.5 mt-5">' +
      '<button type="button" class="wb-btn wb-btn-primary wb-btn-sm" data-goto="payments">View Payments</button>' +
      '<a class="wb-btn wb-btn-quiet wb-btn-sm" href="' + BASE + 'pricing.html">Compare Plans</a>' +
      "</div></div>";

    return panelWrap(
      "enrollments",
      '<div class="grid gap-5 xl:grid-cols-3 mb-5">' + plans + "</div>" +
        '<div class="grid gap-5">' + table + "</div>"
    );
  }

  /* ---------------------------- SCHEDULE ---------------------------- */
  function schedulePanel() {
    var days = [];
    DATA.schedule.forEach(function (s) {
      if (days.indexOf(s.day) === -1) days.push(s.day);
    });

    var strip =
      '<div class="wb-card p-5 sm:p-6 mb-5">' +
      head("week", "Week of 06 October 2025", "Select a day to filter the timetable") +
      '<div class="wb-pills" role="group" aria-label="Filter schedule by day">' +
      '<button type="button" class="wb-pill is-active" data-day="all" aria-pressed="true">All days</button>' +
      days
        .map(function (d) {
          return '<button type="button" class="wb-pill" data-day="' + esc(d) + '" aria-pressed="false">' + esc(d) + "</button>";
        })
        .join("") +
      "</div></div>";

    var rows = DATA.schedule
      .map(function (s) {
        return (
          '<tr data-day-row="' + esc(s.day) + '">' +
          '<td data-label="Day"><strong>' + esc(s.day) + "</strong><br /><small style=\"color:var(--wb-ink-400)\">" + esc(s.date) + "</small></td>" +
          '<td data-label="Time" class="num">' + esc(s.time) + "</td>" +
          '<td data-label="Program">' + esc(s.program) + '<br /><small style="color:var(--wb-ink-400)">' + esc(s.batch) + "</small></td>" +
          '<td data-label="Instructor">' + esc(s.teacher) + "</td>" +
          '<td data-label="Room">' + esc(s.room) + "</td>" +
          '<td data-label="For">' + esc(s.child) + "</td>" +
          '<td data-label="Status">' + (s.status === "upcoming" ? statusBadge("Active") : statusBadge("Demo")) + "</td>" +
          "</tr>"
        );
      })
      .join("");

    var table =
      '<div class="wb-card p-5 sm:p-6">' +
      head("timetable", "Class Timetable", "Your booked classes this week") +
      '<div class="wb-table-wrap"><div class="wb-table-scroll wb-scroll-thin" tabindex="0" role="region" aria-label="Scrollable table"><table class="wb-table wb-table--cards" id="scheduleTable">' +
      '<thead><tr><th scope="col">Day</th><th scope="col" class="num">Time</th><th scope="col">Program</th><th scope="col">Instructor</th><th scope="col">Room</th><th scope="col">For</th><th scope="col">Status</th></tr></thead>' +
      "<tbody>" + rows + "</tbody></table></div></div></div>";

    var note =
      '<div class="wb-card wb-card-paper p-5 sm:p-6 mt-5">' +
      '<div class="flex flex-wrap items-center gap-4">' +
      '<div class="min-w-0 flex-1"><h3 class="mb-1" style="font-size:1.05rem">Make-up classes during the Diwali break</h3>' +
      '<p class="m-0 text-[0.9rem]" style="color:var(--wb-ink-500)">Two make-up slots are available on 19 and 20 October for Aarav. Request a slot from the Messages tab.</p></div>' +
      '<button type="button" class="wb-btn wb-btn-primary wb-btn-sm" data-goto="messages">Request a Slot</button>' +
      "</div></div>";

    return panelWrap("schedule", strip + table + note);
  }

  /* ---------------------------- PROGRESS ---------------------------- */
  function progressPanel() {
    var c = currentChild();

    var skills =
      '<div class="wb-card p-5 sm:p-6">' +
      head("skills", "Skill Breakdown", "Six skills scored each fortnight for " + esc(c.name)) +
      skillBars(c) +
      '<p class="wb-note mt-4 mb-0">Scores are sample values for this demonstration and are not clinical assessments.</p>' +
      "</div>";

    var trend =
      '<div class="wb-card p-5 sm:p-6">' +
      head("trend", "Six-Month Trend", "Average score · " + esc(c.program) + " · " + esc(c.batch)) +
      barChart(c.trend) +
      '<div class="flex flex-wrap gap-3 mt-4">' +
      '<span class="wb-chip">+' + (c.trend[c.trend.length - 1].v - c.trend[0].v) + " points since April</span>" +
      '<span class="wb-chip">Attendance ' + c.attendance + "%</span>" +
      '<span class="wb-chip">' + c.streak + "-week streak</span>" +
      "</div></div>";

    var cmp = {
      aarav: ["sample-aarav-before", "sample-aarav-after"],
      myra: ["sample-myra-before", "sample-myra-after"]
    }[c.id] || ["letter-formation-before", "letter-formation-after"];
    var before = BASE + "assets/images/" + cmp[0];
    var after = BASE + "assets/images/" + cmp[1];
    var slider =
      '<div class="wb-card p-5 sm:p-6">' +
      head("compare", "Before & After", "Drag the handle to compare samples") +
      '<div class="wb-slider-compare" role="group" style="border-radius:var(--wb-radius);position:relative;overflow:hidden">' +
      picture(after, "w-full h-auto block", esc(c.name) + " handwriting after several months of classes", 'loading="lazy"') +
      '<div class="wb-slider-before" style="width:52%">' + picture(before, "", esc(c.name) + " handwriting at the start of the course", 'loading="lazy"') + "</div>" +
      '<span class="wb-badge wb-badge-neutral" style="position:absolute;top:12px;left:12px" aria-hidden="true">Before</span>' +
      '<span class="wb-badge wb-badge-purple" style="position:absolute;top:12px;right:12px" aria-hidden="true">After</span>' +
      '<button type="button" class="wb-slider-handle" role="slider" aria-label="Reveal before or after handwriting sample for ' + esc(c.name) + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="52" aria-orientation="horizontal" style="left:52%"><span class="wb-slider-knob" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 7-5 5 5 5M15 7l5 5-5 5"/></svg></span></button>' +
      "</div>" +
      '<p class="wb-note mt-3 mb-0">Samples are illustrative artwork created for this demo site.</p>' +
      "</div>";

    var notes =
      '<div class="wb-card p-5 sm:p-6">' +
      head("notes", "Instructor Notes", "Feedback for " + esc(c.name)) +
      '<div class="wb-timeline">' +
      c.notes
        .map(function (n) {
          return (
            '<div class="wb-timeline-item wb-timeline-item--accent">' +
            '<p class="m-0 font-bold text-[0.88rem]">' + esc(n.who) + "</p>" +
            '<p class="m-0 mb-1 text-[0.9rem]" style="color:var(--wb-ink-500)">' + esc(n.text) + "</p>" +
            '<p class="m-0 text-[0.78rem]" style="color:var(--wb-ink-400)">' + esc(n.date) + "</p></div>"
          );
        })
        .join("") +
      "</div></div>";

    var goals =
      '<div class="wb-card p-5 sm:p-6">' +
      head("goals", "Term Goals", "Shared with your instructor") +
      '<div class="flex flex-col gap-2.5 mb-5">' +
      c.goals
        .map(function (g, i) {
          return (
            '<label class="wb-check" for="goal-' + c.id + "-" + i + '">' +
            '<input type="checkbox" id="goal-' + c.id + "-" + i + '" data-goal ' + (g.done ? "checked" : "") + " />" +
            "<span" + (g.done ? ' style="text-decoration:line-through;color:var(--wb-ink-400)"' : "") + ">" + esc(g.text) + "</span></label>"
          );
        })
        .join("") +
      "</div>" +
      '<div class="wb-card wb-card-cream p-4"><p class="m-0 text-[0.86rem]" style="color:var(--wb-ink-500)"><strong style="color:var(--wb-primary)">Weekly practice:</strong> ' + esc(c.practice) + "</p></div>" +
      '<p class="wb-note mt-3 mb-0">Ticking a goal updates the demo card only — nothing is sent to your instructor.</p>' +
      "</div>";

    return panelWrap(
      "progress",
      '<div class="grid gap-5 xl:grid-cols-2 mb-5">' + trend + slider + "</div>" +
        '<div class="grid gap-5 xl:grid-cols-2">' + skills + notes + "</div>" +
        '<div class="mt-5">' + goals + "</div>"
    );
  }

  /* ---------------------------- UPLOADS ----------------------------- */
  function uploadsPanel() {
    var rows = state.samples
      .map(function (s) {
        return (
          "<tr>" +
          '<td data-label="Sample"><strong>' + esc(s.title) + '</strong><br /><small style="color:var(--wb-ink-400)">' + esc(s.note) + "</small></td>" +
          '<td data-label="Child">' + esc(s.child) + "</td>" +
          '<td data-label="Uploaded">' + esc(s.date) + "</td>" +
          '<td data-label="Review">' + statusBadge(s.status) + "</td>" +
          '<td data-label="Files">' +
          '<a class="wb-link-arrow" href="' + BASE + "assets/images/" + esc(s.before) + '">Before</a> · ' +
          '<a class="wb-link-arrow" href="' + BASE + "assets/images/" + esc(s.after) + '">After</a>' +
          "</td>" +
          '<td data-label="Actions"><button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-sample-view="' + esc(s.id) + '">Preview</button> ' +
          '<button type="button" class="wb-btn wb-btn-outline wb-btn-sm" data-sample-del="' + esc(s.id) + '" aria-label="Remove ' + esc(s.title) + '">Remove</button></td>' +
          "</tr>"
        );
      })
      .join("");

    var drop =
      '<div class="wb-card p-5 sm:p-6 mb-5">' +
      head("up", "Upload a Handwriting Sample", "Photograph or scan a practice page") +
      '<label class="wb-dropzone" id="dropzone" for="sampleInput">' +
      '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="color:var(--wb-primary)" aria-hidden="true"><path d="M12 16V4"/><path d="m7.5 8.5 4.5-4.5 4.5 4.5"/><path d="M4 16v2.5A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V16"/></svg>' +
      '<strong>Drop a file here, or choose one</strong>' +
      '<span class="wb-note">JPG, PNG or PDF up to 5 MB</span>' +
      '<span class="wb-btn wb-btn-primary wb-btn-sm mt-1">Choose File</span>' +
      "</label>" +
      '<input type="file" id="sampleInput" class="wb-sr" accept="image/*,.pdf" />' +
      '<div id="dropPreview" class="mt-4" hidden></div>' +
      '<div class="grid sm:grid-cols-2 gap-4 mt-4">' +
      '<div class="wb-field mb-0"><label class="wb-label" for="upChild">Sample for</label>' +
      '<select class="wb-select" id="upChild">' +
      DATA.children.map(function (c) {
        return '<option value="' + esc(c.id) + '"' + (c.id === state.child ? " selected" : "") + ">" + esc(c.name) + "</option>";
      }).join("") +
      "</select></div>" +
      '<div class="wb-field mb-0"><label class="wb-label" for="upNote">Note for the instructor</label>' +
      '<input class="wb-input" type="text" id="upNote" placeholder="e.g. Joined-letter practice, page 3" /></div>' +
      "</div>" +
      '<p class="wb-note mt-3 mb-0">Uploads are held in this browser tab only. Nothing is stored on a server.</p>' +
      "</div>";

    var list =
      '<div class="wb-card p-5 sm:p-6">' +
      head("list", "Samples Shared", state.samples.length + " samples for both children") +
      '<div class="wb-table-wrap"><div class="wb-table-scroll wb-scroll-thin" tabindex="0" role="region" aria-label="Scrollable table"><table class="wb-table wb-table--cards" id="sampleTable">' +
      '<thead><tr><th scope="col">Sample</th><th scope="col">Child</th><th scope="col">Uploaded</th><th scope="col">Review</th><th scope="col">Files</th><th scope="col">Actions</th></tr></thead>' +
      "<tbody>" + rows + "</tbody></table></div></div></div>";

    return panelWrap("uploads", drop + list);
  }

  /* ---------------------------- PAYMENTS ---------------------------- */
  function paymentsPanel() {
    var paid = DATA.payments.filter(function (p) { return p.status === "Paid"; });
    var pending = DATA.payments.filter(function (p) { return p.status === "Pending"; });
    var totalPaid = paid.reduce(function (a, p) { return a + p.amount; }, 0);
    var due = pending.reduce(function (a, p) { return a + p.amount; }, 0);

    var metrics =
      '<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">' +
      [
        { l: "Paid to date", v: money(totalPaid), t: "success" },
        { l: "Invoices paid", v: paid.length, t: "" },
        { l: "Amount due", v: money(due), t: "accent" },
        { l: "Next billing", v: "01 Nov", t: "cream" }
      ]
        .map(function (m) {
          return (
            '<div class="wb-stat"><p class="m-0 text-[0.8rem] font-semibold" style="color:var(--wb-ink-400)">' + esc(m.l) + "</p>" +
            '<p class="wb-stat-value m-0">' + esc(m.v) + "</p></div>"
          );
        })
        .join("") +
      "</div>";

    var summary =
      '<div class="wb-card p-5 sm:p-6 mb-5">' +
      head("sum", "Payment Summary", "Demo billing overview — no real payments are processed") +
      '<div class="grid sm:grid-cols-2 gap-4">' +
      '<div class="wb-card wb-card-cream p-4"><p class="m-0 text-[0.8rem] font-semibold" style="color:var(--wb-ink-500)">Active plans</p>' +
      '<p class="m-0 mt-1" style="font-size:1.3rem;font-weight:800;color:var(--wb-primary)">Growth + Creative</p>' +
      '<p class="m-0 mt-1 text-[0.85rem]" style="color:var(--wb-ink-500)">' + money(1799 + 2499) + " per month before the 10% sibling discount</p></div>" +
      '<div class="wb-card p-4"><p class="m-0 text-[0.8rem] font-semibold" style="color:var(--wb-ink-400)">Payment method on file</p>' +
      '<p class="m-0 mt-1 font-bold">UPI · demo@writebright</p>' +
      '<button type="button" class="wb-btn wb-btn-outline wb-btn-sm mt-3" data-action="method">Update Method</button></div>' +
      "</div></div>";

    var rows = DATA.payments
      .map(function (p) {
        return (
          "<tr>" +
          '<td data-label="Invoice"><strong>' + esc(p.id) + "</strong></td>" +
          '<td data-label="Description">' + esc(p.desc) + '<br /><small style="color:var(--wb-ink-400)">' + esc(p.child) + "</small></td>" +
          '<td data-label="Date">' + esc(p.date) + "</td>" +
          '<td data-label="Method">' + esc(p.method) + "</td>" +
          '<td data-label="Amount" class="num">' + money(p.amount) + "</td>" +
          '<td data-label="Status">' + statusBadge(p.status) + "</td>" +
          '<td data-label="Actions">' +
          (p.status === "Pending"
            ? '<button type="button" class="wb-btn wb-btn-primary wb-btn-sm" data-pay="' + esc(p.id) + '">Pay Now</button>'
            : '<button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-invoice="' + esc(p.id) + '">View</button>') +
          "</td></tr>"
        );
      })
      .join("");

    var table =
      '<div class="wb-card p-5 sm:p-6">' +
      head("inv", "Invoice History", DATA.payments.length + " invoices on this account") +
      '<div class="wb-table-wrap"><div class="wb-table-scroll wb-scroll-thin" tabindex="0" role="region" aria-label="Scrollable table"><table class="wb-table wb-table--cards">' +
      '<thead><tr><th scope="col">Invoice</th><th scope="col">Description</th><th scope="col">Date</th><th scope="col">Method</th><th scope="col" class="num">Amount</th><th scope="col">Status</th><th scope="col">Actions</th></tr></thead>' +
      "<tbody>" + rows + "</tbody></table></div></div></div>";

    return panelWrap("payments", metrics + summary + table);
  }

  /* ---------------------------- MESSAGES ---------------------------- */
  function messagesPanel() {
    var threads = DATA.messages
      .map(function (m) {
        var active = m.id === state.thread;
        return (
          '<button type="button" class="wb-card text-left w-full" data-thread="' + esc(m.id) + '" style="padding:.9rem 1rem;border:1px solid ' +
          (active ? "var(--wb-primary)" : "rgba(37,37,37,.09)") + ";box-shadow:none;" + (active ? "background:var(--wb-primary-50)" : "") + '">' +
          '<div class="flex items-center gap-3">' +
          '<span class="wb-avatar wb-avatar--cream" style="width:36px;height:36px;flex-basis:36px;font-size:.76rem">' + esc(m.initials) + "</span>" +
          '<span class="min-w-0 flex-1"><span class="flex items-center gap-2"><strong class="text-[0.9rem] truncate">' + esc(m.from) + "</strong>" +
          (m.unread ? '<span class="wb-dot" style="position:static;box-shadow:none;display:inline-block"></span>' : "") + "</span>" +
          '<small class="block truncate" style="color:var(--wb-ink-400)">' + esc(m.text) + "</small></span>" +
          '<small class="wb-shrink-0" style="color:var(--wb-ink-400);font-size:.72rem">' + esc(m.time.split(",")[0]) + "</small>" +
          "</div></button>"
        );
      })
      .join("");

    var active = DATA.messages.filter(function (m) { return m.id === state.thread; })[0] || DATA.messages[0];

    var conversation =
      '<div class="wb-card p-5 sm:p-6 flex flex-col" style="min-height:420px">' +
      '<div class="flex items-start gap-3 pb-4 mb-4" style="border-bottom:1px dashed rgba(37,37,37,.14)">' +
      '<span class="wb-avatar" style="width:42px;height:42px;flex-basis:42px">' + esc(active.initials) + "</span>" +
      '<div class="min-w-0"><h3 class="m-0" style="font-size:1.05rem">' + esc(active.from) + "</h3>" +
      '<p class="m-0 text-[0.8rem]" style="color:var(--wb-ink-400)">' + esc(active.role) + " · " + esc(active.time) + "</p></div>" +
      '<button type="button" class="wb-btn wb-btn-quiet wb-btn-sm ml-auto" data-action="call">Request Call</button></div>' +
      '<div style="flex:1"><div class="wb-card wb-card-paper p-4" style="max-width:min(560px,92%);border-radius:16px 16px 16px 4px">' +
      "<p class=\"m-0\" style=\"font-size:.93rem\">" + esc(active.text) + "</p>" +
      '<p class="m-0 mt-2 text-[0.76rem]" style="color:var(--wb-ink-400)">Sent by ' + esc(active.from) + "</p></div></div>" +
      '<div class="flex justify-end mb-4"><div class="wb-card p-4" style="max-width:min(560px,92%);background:var(--wb-primary);color:#fff;border-radius:16px 16px 4px 16px">' +
      "<p class=\"m-0\" style=\"font-size:.93rem\">Thank you — we will practise this at home and share a photo on Saturday.</p>" +
      '<p class="m-0 mt-2 text-[0.76rem]" style="color:rgba(255,255,255,.7)">Sent by you · Today</p></div></div>' +
      '<form id="messageForm" class="mt-auto" novalidate>' +
      '<div class="wb-field mb-3"><label class="wb-label wb-sr" for="messageText">Message</label>' +
      '<textarea class="wb-textarea" id="messageText" rows="3" placeholder="Write a message to ' + esc(active.from) + '" data-rules="required|minlen:5"></textarea>' +
      '<p class="wb-field-error" id="messageTextError"></p></div>' +
      '<div class="flex flex-wrap gap-2.5 justify-end">' +
      '<button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-action="attach">Attach Sample</button>' +
      '<button type="submit" class="wb-btn wb-btn-primary wb-btn-sm">Send Message</button>' +
      "</div>" +
      '<p class="wb-note mt-3 mb-0">Demo inbox: messages are not delivered to anyone.</p>' +
      "</form></div>";

    return panelWrap(
      "messages",
      head("msg", "Messages", "Four conversations on this account") +
        '<div class="grid gap-5 lg:grid-cols-12">' +
        '<div class="lg:col-span-5 flex flex-col gap-3" id="threadList">' + threads + "</div>" +
        '<div class="lg:col-span-7">' + conversation + "</div>" +
        "</div>"
    );
  }

  /* ------------------------------------------------------------------ */
  function renderNav() {
    var html = SECTIONS.map(function (s) {
      var active = s.id === state.section;
      return (
        '<li><button type="button" class="wb-dash-nav-item' + (active ?" is-active" : "") + '" data-section="' + s.id + '"' +
        (active ? ' aria-current="page"' : "") + '><span class="wb-dash-nav-ico" aria-hidden="true">' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + s.icon + "</svg></span>" +
        "<span>" + esc(s.label) + "</span></button></li>"
      );
    }).join("");
    qs("#dashNav").innerHTML = html;
  }

  function renderPanels() {
    var host = qs("#dashPanels");
    host.innerHTML =
      overviewPanel() + childrenPanel() + enrollmentsPanel() + schedulePanel() +
      progressPanel() + uploadsPanel() + paymentsPanel() + messagesPanel();
    if (window.WB) {
      WB.animateProgress(host);
      WB.accordion && WB.accordion(host);
    }
    bindSliders();
  }

  function setSection(id, push) {
    if (!SECTIONS.some(function (s) { return s.id === id; })) id = "overview";
    state.section = id;
    qsa(".wb-dash-panel").forEach(function (p) {
      p.hidden = p.getAttribute("data-panel") !== id;
    });
    qsa("#dashNav .wb-dash-nav-item").forEach(function (b) {
      var on = b.getAttribute("data-section") === id;
      b.classList.toggle("is-active", on);
      if (on) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
    });
    var t = TITLES[id] || ["Overview", ""];
    qs("#dashTitle").textContent = t[0];
    qs("#dashSubtitle").textContent = t[1] + DATA.parent.name.split(" ")[0];
    if (push) history.replaceState(null, "", "#" + id);
    closeDrawer();
    window.scrollTo({ top: 0, behavior: window.WB && WB.reducedMotion ? "auto" : "smooth" });
  }

  function setChild(id) {
    state.child = id;
    var c = childById(id);
    [qs("#childSwitch"), qs("#childSwitchMobile")].forEach(function (sel) {
      if (sel) sel.value = id;
    });
    var set = qs("#dashSubtitle");
    if (set) set.textContent = "Viewing " + c.name + " · " + c.program;
    renderPanels();
    if (window.WB) WB.toast("Now viewing " + c.name + "'s records.", "info");
  }

  /* ---------------------------- DRAWER ------------------------------ */
  function openDrawer() {
    var sb = qs("#dashSidebar");
    sb.classList.add("is-open");
    qs("#dashScrim").classList.add("is-open");
    qs("#dashToggle").setAttribute("aria-expanded", "true");
    document.body.classList.add("is-locked");
  }
  function closeDrawer() {
    var sb = qs("#dashSidebar");
    if (!sb) return;
    sb.classList.remove("is-open");
    qs("#dashScrim").classList.remove("is-open");
    qs("#dashToggle").setAttribute("aria-expanded", "false");
    document.body.classList.remove("is-locked");
  }

  /* ---------------------------- MODALS ------------------------------ */
  function childModal(id) {
    var c = childById(id);
    if (!window.WB) return;
    WB.modal({
      title: c.name,
      subtitle: "Age " + c.age + " · " + c.grade + " · " + c.program,
      body:
        '<div class="flex flex-col gap-3">' +
        '<div class="wb-metric"><span>Batch</span><strong>' + esc(c.batch) + "</strong></div>" +
        '<div class="wb-metric"><span>Instructor</span><strong>' + esc(c.instructor) + "</strong></div>" +
        '<div class="wb-metric"><span>Enrolled since</span><strong>' + esc(c.since) + "</strong></div>" +
        '<div class="wb-metric"><span>Attendance</span><strong>' + c.attendance + "%</strong></div>" +
        '<div class="wb-metric"><span>Overall score</span><strong>' + c.overall + " / 100</strong></div>" +
        '<div class="wb-metric"><span>Current focus</span><strong>' + esc(c.focus) + "</strong></div>" +
        "</div>",
      footer:
        '<button type="button" class="wb-btn wb-btn-quiet" data-modal-close>Close</button>' +
        '<button type="button" class="wb-btn wb-btn-primary" data-modal-progress>View Progress</button>'
    });
    var go = document.querySelector("[data-modal-progress]");
    if (go) {
      go.addEventListener("click", function () {
        qs("[data-modal-close]").click();
        setChild(c.id);
        setSection("progress");
      });
    }
  }

  function enrolmentModal(id) {
    var e = DATA.enrollments.filter(function (x) { return x.id === id; })[0];
    if (!e || !window.WB) return;
    WB.modal({
      title: "Enrolment " + e.id,
      subtitle: e.program,
      body:
        '<div class="flex flex-col gap-3">' +
        '<div class="wb-metric"><span>Child</span><strong>' + esc(e.child) + "</strong></div>" +
        '<div class="wb-metric"><span>Batch</span><strong>' + esc(e.batch) + "</strong></div>" +
        '<div class="wb-metric"><span>Started</span><strong>' + esc(e.start) + "</strong></div>" +
        '<div class="wb-metric"><span>Plan</span><strong>' + esc(e.plan) + "</strong></div>" +
        '<div class="wb-metric"><span>Fee</span><strong>' + money(e.fee) + "</strong></div>" +
        '<div class="wb-metric"><span>Status</span><strong>' + esc(e.status) + "</strong></div>" +
        "</div>",
      footer:
        '<button type="button" class="wb-btn wb-btn-quiet" data-modal-close>Close</button>' +
        '<button type="button" class="wb-btn wb-btn-primary" data-enrol-contact>Contact Desk</button>'
    });
    var b = document.querySelector("[data-enrol-contact]");
    if (b) {
      b.addEventListener("click", function () {
        window.location.href = BASE + "contact.html?intent=enroll&program=" + encodeURIComponent(e.program);
      });
    }
  }

  function invoiceModal(id) {
    var p = DATA.payments.filter(function (x) { return x.id === id; })[0];
    if (!p || !window.WB) return;
    WB.modal({
      title: "Invoice " + p.id,
      subtitle: p.desc,
      body:
        '<div class="flex flex-col gap-3">' +
        '<div class="wb-metric"><span>Child</span><strong>' + esc(p.child) + "</strong></div>" +
        '<div class="wb-metric"><span>Date</span><strong>' + esc(p.date) + "</strong></div>" +
        '<div class="wb-metric"><span>Method</span><strong>' + esc(p.method) + "</strong></div>" +
        '<div class="wb-metric"><span>Amount</span><strong>' + money(p.amount) + "</strong></div>" +
        '<div class="wb-metric"><span>Status</span><strong>' + esc(p.status) + "</strong></div>" +
        '<p class="wb-note mt-2 mb-0">Sample invoice for demonstration only.</p>' +
        "</div>",
      footer: '<button type="button" class="wb-btn wb-btn-primary" data-modal-close>Done</button>'
    });
  }

  function payModal(id) {
    var p = DATA.payments.filter(function (x) { return x.id === id; })[0];
    if (!p || !window.WB) return;
    var m = WB.modal({
      title: "Pay " + money(p.amount),
      subtitle: p.desc,
      body:
        '<div class="wb-field mb-4"><label class="wb-label" for="payMethod">Payment method</label>' +
        '<select class="wb-select" id="payMethod"><option>UPI · demo@writebright</option><option>Card (demo)</option><option>Net banking (demo)</option></select></div>' +
        '<div class="wb-field mb-4"><label class="wb-label" for="payRef">Reference</label>' +
        '<input class="wb-input" id="payRef" value="' + esc(p.id) + '" /></div>' +
        '<p class="wb-note m-0">No payment gateway is connected. Submitting this demo form simply marks the invoice as paid in this tab.</p>',
      footer:
        '<button type="button" class="wb-btn wb-btn-quiet" data-modal-close>Cancel</button>' +
        '<button type="button" class="wb-btn wb-btn-primary" data-pay-confirm>Pay ' + money(p.amount) + "</button>"
    });
    var b = m.panel.querySelector("[data-pay-confirm]");
    if (b) {
      b.addEventListener("click", function () {
        p.status = "Paid";
        p.method = "UPI";
        m.close();
        renderPanels();
        setSection("payments");
        WB.toast("Demo payment recorded for " + p.id + ".", "success");
      });
    }
  }

  function sampleModal(id) {
    var s = state.samples.filter(function (x) { return x.id === id; })[0];
    if (!s || !window.WB) return;
    WB.modal({
      title: s.title,
      subtitle: s.child + " · " + s.date,
      body:
        '<div class="grid sm:grid-cols-2 gap-4">' +
        '<figure class="m-0">' + picture(BASE + "assets/images/" + esc(s.before), "wb-dropzone-preview", "Earlier sample", 'style="width:100%"') + '<figcaption class="wb-note mt-2">Before</figcaption></figure>' +
        '<figure class="m-0">' + picture(BASE + "assets/images/" + esc(s.after), "wb-dropzone-preview", "Latest sample", 'style="width:100%"') + '<figcaption class="wb-note mt-2">Latest</figcaption></figure>' +
        "</div>" +
        '<p class="wb-note mt-4 mb-0">' + esc(s.note) + "</p>",
      footer: '<button type="button" class="wb-btn wb-btn-primary" data-modal-close>Close</button>'
    });
  }

  function assessmentModal() {
    if (!window.WB) return;
    WB.modal({
      title: "Book a Writing Assessment",
      subtitle: "A 15-minute check of your child's current handwriting.",
      body:
        '<div class="grid sm:grid-cols-2 gap-4">' +
        '<div class="wb-field mb-0"><label class="wb-label" for="asChild">Child</label><select class="wb-select" id="asChild">' +
        DATA.children.map(function (c) { return '<option value="' + esc(c.name) + '">' + esc(c.name) + "</option>"; }).join("") +
        '</select></div>' +
        '<div class="wb-field mb-0"><label class="wb-label" for="asSlot">Preferred slot</label><select class="wb-select" id="asSlot"><option>Saturday, 10:00 AM</option><option>Saturday, 11:30 AM</option><option>Tuesday, 5:30 PM</option></select></div>' +
        "</div>" +
        '<p class="wb-note mt-4 mb-0">Demo request only — the centre desk will not be notified.</p>',
      footer:
        '<button type="button" class="wb-btn wb-btn-quiet" data-modal-close>Cancel</button>' +
        '<button type="button" class="wb-btn wb-btn-primary" data-as-confirm>Request Slot</button>'
    });
    var b = document.querySelector("[data-as-confirm]");
    if (b) {
      b.addEventListener("click", function () {
        var name = (document.getElementById("asChild") || {}).value || "";
        qs("[data-modal-close]").click();
        WB.toast("Assessment requested for " + name + " (demo).", "success");
      });
    }
  }

  function notifications() {
    if (!window.WB) return;
    WB.modal({
      title: "Notifications",
      subtitle: "2 unread items",
      body:
        '<ul class="list-none m-0 p-0 flex flex-col gap-3">' +
        '<li class="wb-card wb-card-cream p-3"><strong class="block text-[0.9rem]">October invoice ready</strong><span class="text-[0.85rem]" style="color:var(--wb-ink-500)">Two invoices totalling ' + money(1799 + 2499) + " are pending.</span></li>" +
        '<li class="wb-card p-3"><strong class="block text-[0.9rem]">New instructor note</strong><span class="text-[0.85rem]" style="color:var(--wb-ink-500)">Meera Krishnan commented on Aarav&rsquo;s latest sample.</span></li>' +
        '<li class="wb-card p-3"><strong class="block text-[0.9rem]">Diwali break confirmed</strong><span class="text-[0.85rem]" style="color:var(--wb-ink-500)">Classes resume 22 October 2025.</span></li>' +
        "</ul>",
      footer: '<button type="button" class="wb-btn wb-btn-quiet" data-modal-close>Mark all read</button>'
    });
  }

  /* ---------------------------- UPLOADS ----------------------------- */
  function handleFile(file) {
    if (!file) return;
    var prev = qs("#dropPreview");
    prev.hidden = false;
    prev.setAttribute("data-file-name", file.name);
    prev.setAttribute("data-file-type", file.type || "document");

    function shell(media) {
      prev.innerHTML =
        '<p class="m-0 mb-2 font-bold text-[0.9rem]">Ready to send: ' + esc(file.name) + "</p>" + media +
        '<div class="flex flex-wrap gap-2 mt-3">' +
        '<button type="button" class="wb-btn wb-btn-primary wb-btn-sm" data-send-sample>Send Sample</button>' +
        '<button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-clear-sample>Clear</button>' +
        "</div>";
    }

    if (/^image\//.test(file.type)) {
      var reader = new FileReader();
      reader.onload = function (e) {
        shell('<img class="wb-dropzone-preview" src="' + e.target.result + '" alt="Preview of the selected sample" />');
      };
      reader.readAsDataURL(file);
    } else {
      shell('<p class="wb-note m-0">' + esc(file.type || "Document") + " · " + Math.max(1, Math.round(file.size / 1024)) + " KB</p>");
    }
  }

  function sendSample(btn) {
    var prev = btn.closest("#dropPreview");
    var name = prev.getAttribute("data-file-name") || "sample.jpg";
    var child = qs("#upChild").value;
    var note = qs("#upNote").value || "New practice page";
    var c = childById(child);
    state.samples.unshift({
      id: "s" + Date.now(),
      child: c.name.split(" ")[0],
      title: name,
      date: "Just now",
      note: note,
      before: c.id + "-before",
      after: c.id + "-after",
      status: "In review"
    });
    prev.hidden = true;
    prev.innerHTML = "";
    qs("#upNote").value = "";
    renderPanels();
    if (window.WB) WB.toast("Sample added to the list for " + c.name + " (demo only).", "success");
  }

  /* ----------------------------- WIRE ------------------------------- */
  function wire() {
    qs("#dashToggle").addEventListener("click", function () {
      var sb = qs("#dashSidebar");
      if (sb.classList.contains("is-open")) closeDrawer();
      else openDrawer();
    });
    qs("#dashScrim").addEventListener("click", closeDrawer);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });
    qs("#dashBell").addEventListener("click", notifications);

    qs("#childSwitch").innerHTML = DATA.children
      .map(function (c) {
        return '<option value="' + esc(c.id) + '">' + esc(c.name) + " · Age " + c.age + "</option>";
      })
      .join("");
    qs("#childSwitchMobile").innerHTML = qs("#childSwitch").innerHTML;
    qs("#childSwitch").value = state.child;
    qs("#childSwitchMobile").value = state.child;
    [qs("#childSwitch"), qs("#childSwitchMobile")].forEach(function (sel) {
      sel.addEventListener("change", function () {
        setChild(sel.value);
      });
    });

    qs("#dashAvatar").textContent = DATA.parent.initials;
    qs("#dashUser").textContent = DATA.parent.name;

    /* delegated clicks */
    document.addEventListener("click", function (e) {
      var t = e.target;

      var nav = t.closest("[data-section]");
      if (nav) {
        setSection(nav.getAttribute("data-section"), true);
        return;
      }
      var go = t.closest("[data-goto]");
      if (go) {
        setSection(go.getAttribute("data-goto"), true);
        return;
      }
      var sw = t.closest("[data-switch-child]");
      if (sw) {
        setChild(sw.getAttribute("data-switch-child"));
        return;
      }
      var cd = t.closest("[data-child-detail]");
      if (cd) {
        childModal(cd.getAttribute("data-child-detail"));
        return;
      }
      var en = t.closest("[data-enrolment]");
      if (en) {
        enrolmentModal(en.getAttribute("data-enrolment"));
        return;
      }
      var inv = t.closest("[data-invoice]");
      if (inv) {
        invoiceModal(inv.getAttribute("data-invoice"));
        return;
      }
      var pay = t.closest("[data-pay]");
      if (pay) {
        payModal(pay.getAttribute("data-pay"));
        return;
      }
      var sv = t.closest("[data-sample-view]");
      if (sv) {
        sampleModal(sv.getAttribute("data-sample-view"));
        return;
      }
      var sd = t.closest("[data-sample-del]");
      if (sd) {
        var sid = sd.getAttribute("data-sample-del");
        var idx = state.samples.findIndex(function (x) { return x.id === sid; });
        if (idx > -1) {
          var removed = state.samples.splice(idx, 1)[0];
          renderPanels();
          if (window.WB) WB.toast("Removed “" + removed.title + "” from this demo list.", "info");
        }
        return;
      }
      var th = t.closest("[data-thread]");
      if (th) {
        state.thread = th.getAttribute("data-thread");
        DATA.messages.forEach(function (m) {
          if (m.id === state.thread) m.unread = false;
        });
        renderPanels();
        return;
      }
      var act = t.closest("[data-action]");
      if (act) {
        var a = act.getAttribute("data-action");
        if (a === "calendar") WB.toast("Demo only — no .ics file is generated.", "info");
        else if (a === "assessment") assessmentModal();
        else if (a === "method") WB.toast("Payment methods cannot be changed in this demo.", "info");
        else if (a === "call") WB.toast("Demo only — no call is scheduled.", "info");
        else if (a === "attach") {
          setSection("uploads");
          WB.toast("Choose a file from the upload area to attach it.", "info");
        }
        return;
      }
      var day = t.closest("[data-day]");
      if (day) {
        var v = day.getAttribute("data-day");
        qsa("[data-day]").forEach(function (p) {
          var on = p === day;
          p.classList.toggle("is-active", on);
          p.setAttribute("aria-pressed", on ? "true" : "false");
        });
        qsa("[data-day-row]").forEach(function (row) {
          row.hidden = v !== "all" && row.getAttribute("data-day-row") !== v;
        });
        return;
      }
      if (t.closest("[data-send-sample]")) {
        sendSample(t.closest("[data-send-sample]"));
        return;
      }
      if (t.closest("[data-clear-sample]")) {
        var p2 = qs("#dropPreview");
        p2.hidden = true;
        p2.innerHTML = "";
        return;
      }
      var goal = t.closest("[data-goal]");
      if (goal) {
        var g = goal.closest("label").querySelector("span");
        g.style.textDecoration = goal.checked ? "line-through" : "";
        g.style.color = goal.checked ? "var(--wb-ink-400)" : "";
        return;
      }
    });

    /* message form (re-rendered, so delegate on submit) */
    document.addEventListener("submit", function (e) {
      var form = e.target;
      if (form.id !== "messageForm") return;
      e.preventDefault();
      var ta = qs("#messageText");
      if (!window.WB || !WB.validateForm(form)) {
        if (window.WB) WB.toast("Please type a message before sending.", "error");
        return;
      }
      var active = DATA.messages.filter(function (m) { return m.id === state.thread; })[0] || DATA.messages[0];
      active.text = ta.value.trim() + "  ·  (your reply)";
      renderPanels();
      WB.toast("Reply added to the demo conversation.", "success");
    });

    /* uploads */
    document.addEventListener("change", function (e) {
      if (e.target.id === "sampleInput") handleFile(e.target.files && e.target.files[0]);
    });
    ["dragenter", "dragover"].forEach(function (ev) {
      document.addEventListener(ev, function (e) {
        var dz = e.target.closest && e.target.closest("#dropzone");
        if (dz) {
          e.preventDefault();
          dz.classList.add("is-drag");
        }
      });
    });
    ["dragleave", "drop"].forEach(function (ev) {
      document.addEventListener(ev, function (e) {
        var dz = e.target.closest && e.target.closest("#dropzone");
        if (dz) dz.classList.remove("is-drag");
      });
    });
    document.addEventListener("drop", function (e) {
      var dz = e.target.closest && e.target.closest("#dropzone");
      if (!dz) return;
      e.preventDefault();
      handleFile(e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]);
    });

    /* sliders inside rendered panels */
  }

  function bindSliders() {
    if (!window.WB) return;
    qsa(".wb-slider-compare").forEach(function (el) {
      if (el.getAttribute("data-wb-slider")) return;
      el.setAttribute("data-wb-slider", "1");
      WB.compareSlider(el);
    });
  }

  /* ----------------------------- BOOT ------------------------------- */
  function init() {
    wire();
    renderNav();
    renderPanels();
    bindSliders();
    var hash = (window.location.hash || "").replace("#", "");
    setSection(hash || "overview", false);
    window.addEventListener("hashchange", function () {
      setSection((window.location.hash || "").replace("#", "") || "overview", false);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
