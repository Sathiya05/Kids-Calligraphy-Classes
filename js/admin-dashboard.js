/* ==========================================================================
   WriteBright — js/admin-dashboard.js
   Front-end demonstration admin area. Every record below is sample data held
   in memory only; nothing is sent to a server or stored permanently.
   ========================================================================== */
(function () {
  "use strict";

  var BASE = "../";
  var money = function (n) {
    return "₹" + Number(n).toLocaleString("en-IN");
  };

  var DATA = {
    students: [
      { id: "ST-1001", name: "Aarav Sharma", age: 8, parent: "Priya Sharma", phone: "+91 98765 43210", program: "Handwriting Improvement", batch: "Saturday Morning", instructor: "Meera Krishnan", attendance: 92, score: 73, classes: 36, plan: "Growth", status: "Active", joined: "08 Mar 2025" },
      { id: "ST-1002", name: "Myra Nair", age: 11, parent: "Divya Nair", phone: "+91 98860 11223", program: "Calligraphy & Creative Writing", batch: "Saturday Calligraphy", instructor: "Rohan Desai", attendance: 96, score: 84, classes: 28, plan: "Creative", status: "Active", joined: "12 Jun 2025" },
      { id: "ST-1003", name: "Diya Patel", age: 6, parent: "Ravi Patel", phone: "+91 90030 44556", program: "Foundation Writing", batch: "Weekday Evening", instructor: "Fatima Sheikh", attendance: 88, score: 68, classes: 24, plan: "Starter", status: "Active", joined: "19 Jan 2025" },
      { id: "ST-1004", name: "Vivaan Rao", age: 10, parent: "Sneha Rao", phone: "+91 99801 77889", program: "Advanced Handwriting", batch: "Tuesday Letters", instructor: "Anjali Verma", attendance: 79, score: 61, classes: 18, plan: "Growth", status: "Active", joined: "02 Feb 2025" },
      { id: "ST-1005", name: "Anaya Menon", age: 7, parent: "Kiran Menon", phone: "+91 94440 33221", program: "Handwriting Improvement", batch: "Sunday Afternoon", instructor: "Meera Krishnan", attendance: 95, score: 86, classes: 41, plan: "Growth", status: "Active", joined: "07 Nov 2024" },
      { id: "ST-1006", name: "Ishaan Gupta", age: 13, parent: "Nikhil Gupta", phone: "+91 98220 66778", program: "Calligraphy & Creative Writing", batch: "Sunday Script", instructor: "Sanjay Iyer", attendance: 71, score: 64, classes: 12, plan: "Creative", status: "Paused", joined: "15 Jul 2025" },
      { id: "ST-1007", name: "Myra Sharma", age: 5, parent: "Priya Sharma", phone: "+91 98765 43210", program: "Foundation Writing", batch: "Early Birds", instructor: "Fatima Sheikh", attendance: 90, score: 77, classes: 20, plan: "Starter", status: "Active", joined: "22 Apr 2025" },
      { id: "ST-1008", name: "Reyansh Bose", age: 9, parent: "Anita Bose", phone: "+91 91010 55440", program: "Advanced Handwriting", batch: "Saturday Refinement", instructor: "Anjali Verma", attendance: 84, score: 70, classes: 15, plan: "Growth", status: "Active", joined: "05 Sep 2025" }
    ],
    payments: [
      { id: "PAY-9021", student: "Aarav Sharma", plan: "Growth", amount: 1799, date: "01 Oct 2025", method: "UPI", status: "Pending" },
      { id: "PAY-9014", student: "Aarav Sharma", plan: "Growth", amount: 1799, date: "01 Sep 2025", method: "UPI", status: "Verified" },
      { id: "PAY-9008", student: "Myra Nair", plan: "Creative", amount: 2499, date: "01 Sep 2025", method: "Card", status: "Verified" },
      { id: "PAY-8996", student: "Anaya Menon", plan: "Growth", amount: 1799, date: "01 Aug 2025", method: "UPI", status: "Verified" },
      { id: "PAY-8985", student: "Myra Nair", plan: "Creative", amount: 2499, date: "01 Aug 2025", method: "UPI", status: "Verified" },
      { id: "PAY-8971", student: "Aarav Sharma", plan: "Growth", amount: 1799, date: "01 Jul 2025", method: "UPI", status: "Verified" },
      { id: "PAY-8960", student: "Diya Patel", plan: "Starter", amount: 999, date: "01 Jul 2025", method: "Cash", status: "Verified" },
      { id: "PAY-8955", student: "Vivaan Rao", plan: "Growth", amount: 1799, date: "01 Jun 2025", method: "UPI", status: "Refunded" },
      { id: "PAY-8941", student: "Ishaan Gupta", plan: "Creative", amount: 2499, date: "01 Jun 2025", method: "UPI", status: "Verified" },
      { id: "PAY-8930", student: "Reyansh Bose", plan: "Growth", amount: 1799, date: "01 Jun 2025", method: "Net banking", status: "Verified" }
    ],
    reviews: [
      { id: "RV-501", student: "Aarav Sharma", age: 8, submitted: "30 Sep 2025", focus: "Slant consistency", status: "Pending", score: 73, before: "sample-aarav-before", after: "sample-aarav-after", note: "Slant improves across the page, baseline drifts at the end of long lines." },
      { id: "RV-502", student: "Myra Nair", age: 11, submitted: "29 Sep 2025", focus: "Downstroke pressure", status: "Pending", score: 84, before: "sample-myra-before", after: "sample-myra-after", note: "Shading is even on most lines; check the join after 'n'." },
      { id: "RV-503", student: "Anaya Menon", age: 7, submitted: "28 Sep 2025", focus: "Letter spacing", status: "Approved", score: 86, before: "sample-anaya-before", after: "sample-anaya-after", note: "Even spacing and excellent size control. Ready for the next module." },
      { id: "RV-504", student: "Diya Patel", age: 6, submitted: "27 Sep 2025", focus: "Pencil grip", status: "Approved", score: 68, before: "sample-diya-before", after: "sample-diya-after", note: "Grip relaxing nicely. Keep the tripod grip exercises short." },
      { id: "RV-505", student: "Vivaan Rao", age: 10, submitted: "26 Sep 2025", focus: "Writing speed", status: "Changes requested", score: 61, before: "sample-vivaan-before", after: "sample-vivaan-after", note: "Speed is increasing but legibility drops. Request one more page." },
      { id: "RV-506", student: "Ishaan Gupta", age: 13, submitted: "24 Sep 2025", focus: "Script fluency", status: "Pending", score: 64, before: "calligraphy-before", after: "calligraphy-after", note: "Loop joins smooth; capital forms need another week of practice." },
      { id: "RV-507", student: "Reyansh Bose", age: 9, submitted: "22 Sep 2025", focus: "Baseline control", status: "Pending", score: 70, before: "sample-ishaan-before", after: "sample-ishaan-after", note: "Good rhythm; ask for a page in the 'j' and 'y' joins." },
      { id: "RV-508", student: "Myra Sharma", age: 5, submitted: "21 Sep 2025", focus: "Letter shapes", status: "Approved", score: 77, before: "sample-myra-before", after: "sample-myra-after", note: "Clear round shapes. Move to joined letters next month." },
      { id: "RV-509", student: "Anaya Menon", age: 7, submitted: "18 Sep 2025", focus: "Line alignment", status: "Approved", score: 83, before: "sample-anaya-before", after: "sample-anaya-after", note: "Alignment steady across three lines of text." },
      { id: "RV-510", student: "Vivaan Rao", age: 10, submitted: "14 Sep 2025", focus: "Letter formation", status: "Changes requested", score: 58, before: "sample-vivaan-before", after: "sample-vivaan-after", note: "Letter openings closing up; retrain the 'a', 'd' and 'g' forms." }
    ],
    inquiries: [
      { id: "EN-2041", parent: "Priya Sharma", child: "Aarav", age: 8, program: "Handwriting Improvement", received: "02 Mar 2025", status: "Enrolled" },
      { id: "EN-2064", parent: "Ritu Malhotra", child: "Zara", age: 5, program: "Foundation Writing", received: "29 Sep 2025", status: "Assessment booked" },
      { id: "EN-2065", parent: "Ajay Kumar", child: "Neel", age: 12, program: "Advanced Handwriting", received: "30 Sep 2025", status: "New" },
      { id: "EN-2066", parent: "Sneha Rao", child: "Vivaan", age: 10, program: "Summer Writing Intensive", received: "01 Oct 2025", status: "New" },
      { id: "EN-2067", parent: "Nikhil Gupta", child: "Ishaan", age: 13, program: "Calligraphy & Creative Writing", received: "30 Sep 2025", status: "Follow-up" }
    ],
    revenue: [
      { m: "Apr", v: 142000 },
      { m: "May", v: 158000 },
      { m: "Jun", v: 173000 },
      { m: "Jul", v: 169000 },
      { m: "Aug", v: 186000 },
      { m: "Sep", v: 194000 }
    ],
    attendanceByBatch: [
      { label: "Saturday Morning", v: 92 },
      { label: "Sunday Afternoon", v: 95 },
      { label: "Weekday Evening", v: 88 },
      { label: "Tuesday Letters", v: 79 },
      { label: "Saturday Calligraphy", v: 96 },
      { label: "Early Birds", v: 90 },
      { label: "Saturday Refinement", v: 84 },
      { label: "Sunday Script", v: 71 }
    ]
  };

  var SECTIONS = [
    { id: "overview", label: "Overview", icon: '<rect x="3" y="3" width="7" height="9" rx="1.6"/><rect x="14" y="3" width="7" height="5" rx="1.6"/><rect x="14" y="12" width="7" height="9" rx="1.6"/><rect x="3" y="16" width="7" height="5" rx="1.6"/>' },
    { id: "students", label: "Students", icon: '<circle cx="9" cy="8" r="3.4"/><path d="M3 20c.7-3.6 3.1-5.4 6-5.4s5.3 1.8 6 5.4"/>' },
    { id: "batches", label: "Batches & Schedule", icon: '<rect x="3" y="5" width="18" height="16" rx="2.4"/><path d="M3 10h18M8 3v4M16 3v4"/>' },
    { id: "instructors", label: "Instructors", icon: '<path d="M12 3 5 6.5v5.2c0 4 2.9 7.7 7 9.3 4.1-1.6 7-5.3 7-9.3V6.5z"/><path d="m9 12 2 2 4-4"/>' },
    { id: "programs", label: "Programs", icon: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v14H6.5A2.5 2.5 0 0 0 4 19.5z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H19v4H6.5A2.5 2.5 0 0 1 4 19.5z"/>' },
    { id: "reviews", label: "Sample Reviews", icon: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="m9 14 2 2 4-4"/>' },
    { id: "payments", label: "Payments", icon: '<rect x="2.5" y="5.5" width="19" height="13" rx="2.4"/><path d="M2.5 10h19M6 14.5h4"/>' },
    { id: "inquiries", label: "Enquiries", icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>' },
    { id: "reports", label: "Reports", icon: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>' }
  ];

  var TITLES = {
    overview: ["Overview", "Centre snapshot for October 2025"],
    students: ["Students", "All enrolled learners on the centre record"],
    batches: ["Batches & Schedule", "Eight active batches across three rooms"],
    instructors: ["Instructors", "Teaching load and availability"],
    programs: ["Programs", "Core programs and short workshops"],
    reviews: ["Sample Reviews", "Handwriting samples waiting for feedback"],
    payments: ["Payments", "Billing records and verification status"],
    inquiries: ["Enquiries", "New and pending admission enquiries"],
    reports: ["Reports", "Sample centre reports built with CSS only"]
  };

  var state = { section: "overview", student: "ST-1001", batchFilter: "all", reviewFilter: "all", query: "" };

  /* ------------------------------------------------------------------ */
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(v) {
    return String(v === undefined || v === null ? "" : v).replace(/[&<>"']/g, function (c) {
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
  function shared() { return (window.WB_DATA || {}) || {}; }
  function batches() { return shared().batches || []; }
  function instructors() { return shared().instructors || []; }
  function programs() { return shared().programs || []; }
  function workshops() { return shared().workshops || []; }
  function studentById(id) {
    return DATA.students.filter(function (s) { return s.id === id; })[0] || DATA.students[0];
  }
  function statusBadge(s) {
    var map = {
      Active: "wb-badge-success",
      Verified: "wb-badge-success",
      Approved: "wb-badge-success",
      Enrolled: "wb-badge-success",
      Pending: "wb-badge-warning",
      "Almost full": "wb-badge-warning",
      "Changes requested": "wb-badge-danger",
      Refunded: "wb-badge-danger",
      Paused: "wb-badge-neutral",
      New: "wb-badge-purple",
      "Follow-up": "wb-badge-accent",
      "Assessment booked": "wb-badge-cream"
    };
    return '<span class="wb-badge ' + (map[s] ||"wb-badge-neutral") + '">' + esc(s) + "</span>";
  }
  function ring(v, label) {
    return (
      '<div class="wb-ring" data-value="' + v + '" role="img" aria-label="' + esc(label) + ": " + v + ' out of 100">' +
      '<span class="wb-ring-label"><strong>' + v + "</strong><small>" + esc(label) + "</small></span></div>"
    );
  }
  function barRow(label, v, max, tone) {
    var pct = Math.max(2, Math.round((v / (max || 100)) * 100));
    return (
      '<div class="mb-3">' +
      '<div class="flex items-baseline justify-between gap-3 mb-1.5">' +
      '<span class="text-[0.87rem] font-semibold">' + esc(label) + "</span>" +
      '<span class="text-[0.82rem] font-bold" style="color:var(--wb-primary)">' + (tone === "money" ? money(v) : v + "%") + "</span></div>" +
      '<div class="wb-progress wb-progress-sm"><span class="wb-progress-fill" data-value="' + pct + '" style="background:' +
      (tone === "money" ? "linear-gradient(90deg,#F4A261,#E2894A)" : "linear-gradient(90deg,#7A68AD,#5B4B8A)") + '"></span></div></div>'
    );
  }

  function panelWrap(id, inner) {
    var label = (SECTIONS.filter(function (s) { return s.id === id; })[0] || {}).label || id;
    return (
      '<section class="wb-dash-panel" data-panel="' + id + '" aria-label="' + esc(label) + '"' +
      (id === state.section ? "" : " hidden") + ">" + inner + "</section>"
    );
  }
  function head(title, desc, actions) {
    return (
      '<div class="wb-panel-head"><div><h2>' + esc(title) + "</h2>" +
      (desc ? "<p>" + esc(desc) + "</p>" : "") + "</div>" +
      (actions ? '<div class="wb-panel-actions">' + actions + "</div>" : "") +
      "</div>"
    );
  }

  /* ---------------------------- OVERVIEW ---------------------------- */
  function overviewPanel() {
    var students = DATA.students;
    var pendingReviews = DATA.reviews.filter(function (r) { return r.status === "Pending"; }).length;
    var newEnquiries = DATA.inquiries.filter(function (i) { return i.status === "New"; }).length;
    var verified = DATA.payments.filter(function (p) { return p.status === "Verified"; }).reduce(function (a, p) { return a + p.amount; }, 0);
    var seats = batches().reduce(function (a, b) { return a + b.enrolled; }, 0);
    var capacity = batches().reduce(function (a, b) { return a + b.capacity; }, 0);

    var stats =
      '<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">' +
      [
        { v: students.length, l: "Enrolled students", t: "", i: '<circle cx="9" cy="8" r="3.4"/><path d="M3 20c.7-3.6 3.1-5.4 6-5.4s5.3 1.8 6 5.4"/>' },
        { v: batches().length, l: "Active batches", t: "cream", i: '<rect x="3" y="5" width="18" height="16" rx="2.4"/><path d="M3 10h18M8 3v4M16 3v4"/>' },
        { v: money(verified), l: "Verified this quarter", t: "success", i: '<rect x="2.5" y="5.5" width="19" height="13" rx="2.4"/><path d="M2.5 10h19"/>' },
        { v: pendingReviews, l: "Samples to review", t: "accent", i: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>' }
      ]
        .map(function (s) {
          return (
            '<div class="wb-stat"><div class="flex items-start gap-3">' +
            '<span class="wb-stat-ico wb-stat-ico--' + s.t + '" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + s.i + "</svg></span>" +
            '<div class="min-w-0"><p class="m-0 text-[0.8rem] font-semibold" style="color:var(--wb-ink-400)">' + esc(s.l) + "</p>" +
            '<p class="wb-stat-value m-0">' + esc(s.v) + "</p></div></div></div>"
          );
        })
        .join("") +
      "</div>";

    var revenue =
      '<div class="wb-card p-5 sm:p-6">' +
      head("Six-Month Revenue", "Verified payments only", '<button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-goto="reports">Full Report</button>') +
      DATA.revenue.map(function (r) { return barRow(r.m, r.v, 200000, "money"); }).join("") +
      '<p class="wb-note mt-3 mb-0">Figures are sample data for demonstration.</p></div>';

    var alerts =
      '<div class="wb-card p-5 sm:p-6">' +
      head("Needs Attention", "4 items waiting") +
      '<ul class="list-none m-0 p-0 flex flex-col gap-3">' +
      [
        { t: pendingReviews + " samples waiting for review", s: "Oldest submitted 6 days ago", g: "reviews" },
        { t: newEnquiries + " new admission enquiries", s: "Reply within one working day", g: "inquiries" },
        { t: "1 payment pending verification", s: "PAY-9021 · " + money(1799), g: "payments" },
        { t: "Sunday Script batch at 50% capacity", s: "Consider a second Sunday slot", g: "batches" }
      ]
        .map(function (a) {
          return (
            '<li class="wb-card wb-card-cream p-3.5 flex items-start gap-3">' +
            '<span class="wb-pulse-star text-lg leading-none" style="color:var(--wb-accent-ink)" aria-hidden="true">★</span>' +
            '<span class="min-w-0 flex-1"><strong class="block text-[0.9rem]">' + esc(a.t) + "</strong>" +
            '<small class="block" style="color:var(--wb-ink-400)">' + esc(a.s) + "</small></span>" +
            '<button type="button" class="wb-btn wb-btn-outline wb-btn-sm" data-goto="' + a.g + '">Open</button></li>'
          );
        })
        .join("") +
      "</ul></div>";

    var occupancy =
      '<div class="wb-card p-5 sm:p-6">' +
      head("Batch Occupancy", seats + " of " + capacity + " seats filled") +
      '<div class="flex items-center gap-5 mb-5 flex-wrap">' +
      ring(Math.round((seats / capacity) * 100), "Filled") +
      '<div class="flex-1 min-w-[180px]">' +
      '<div class="wb-metric"><span class="text-[0.88rem]">Seats filled</span><strong>' + seats + "</strong></div>" +
      '<div class="wb-metric"><span class="text-[0.88rem]">Seats available</span><strong>' + (capacity - seats) + "</strong></div>" +
      '<div class="wb-metric"><span class="text-[0.88rem]">Instructors on rota</span><strong>' + instructors().length + "</strong></div>" +
      "</div></div>" +
      '<div class="grid sm:grid-cols-2 gap-x-6 gap-y-1">' +
      batches().slice(0, 4).map(function (b) {
        return barRow(b.name, b.enrolled, b.capacity);
      }).join("") +
      "</div></div>";

    var inquiries =
      '<div class="wb-card p-5 sm:p-6">' +
      head("Latest Enquiries", DATA.inquiries.length + " open records") +
      '<div class="wb-table-wrap"><div class="wb-table-scroll wb-scroll-thin" tabindex="0" role="region" aria-label="Scrollable table"><table class="wb-table wb-table--cards">' +
      '<thead><tr><th scope="col">Ref</th><th scope="col">Parent</th><th scope="col">Child</th><th scope="col">Program</th><th scope="col">Received</th><th scope="col">Status</th></tr></thead><tbody>' +
      DATA.inquiries
        .map(function (i) {
          return (
            "<tr>" +
            '<td data-label="Ref"><strong>' + esc(i.id) + "</strong></td>" +
            '<td data-label="Parent">' + esc(i.parent) + "</td>" +
            '<td data-label="Child">' + esc(i.child) + " · " + i.age + "</td>" +
            '<td data-label="Program">' + esc(i.program) + "</td>" +
            '<td data-label="Received">' + esc(i.received) + "</td>" +
            '<td data-label="Status">' + statusBadge(i.status) + "</td></tr>"
          );
        })
        .join("") +
      "</tbody></table></div></div></div>";

    return panelWrap(
      "overview",
      stats +
        '<div class="grid gap-5 xl:grid-cols-2 mb-5">' + revenue + alerts + "</div>" +
        '<div class="grid gap-5 xl:grid-cols-2">' + occupancy + inquiries + "</div>"
    );
  }

  /* ---------------------------- STUDENTS ---------------------------- */
  function studentsPanel() {
    var q = state.query.toLowerCase();
    var list = DATA.students.filter(function (s) {
      if (!q) return true;
      return (s.name + " " + s.parent + " " + s.program + " " + s.batch + " " + s.id).toLowerCase().indexOf(q) > -1;
    });

    var rows = list
      .map(function (s) {
        return (
          "<tr>" +
          '<td data-label="Student"><strong>' + esc(s.name) + "</strong><br /><small style=\"color:var(--wb-ink-400)\">" + esc(s.id) + " · Age " + s.age + "</small></td>" +
          '<td data-label="Parent">' + esc(s.parent) + '<br /><small style="color:var(--wb-ink-400)">' + esc(s.phone) + "</small></td>" +
          '<td data-label="Program">' + esc(s.program) + '<br /><small style="color:var(--wb-ink-400)">' + esc(s.batch) + "</small></td>" +
          '<td data-label="Instructor">' + esc(s.instructor) + "</td>" +
          '<td data-label="Attendance" class="num">' + s.attendance + "%</td>" +
          '<td data-label="Score" class="num"><strong>' + s.score + "</strong></td>" +
          '<td data-label="Plan">' + esc(s.plan) + "</td>" +
          '<td data-label="Status">' + statusBadge(s.status) + "</td>" +
          '<td data-label="Actions">' +
          '<button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-student="' + esc(s.id) + '">Manage</button> ' +
          '<button type="button" class="wb-btn wb-btn-outline wb-btn-sm" data-student-report="' + esc(s.id) + '">Report</button>' +
          "</td></tr>"
        );
      })
      .join("");

    var filters =
      '<div class="wb-card p-5 sm:p-6 mb-5">' +
      head("Directory", list.length + " of " + DATA.students.length + " students shown") +
      '<div class="wb-pills" role="group" aria-label="Filter students by program">' +
      '<button type="button" class="wb-pill is-active" data-sfilter="all" aria-pressed="true">All programs</button>' +
      programs()
        .map(function (p) {
          return '<button type="button" class="wb-pill" data-sfilter="' + esc(p.title) + '" aria-pressed="false">' + esc(p.title) + "</button>";
        })
        .join("") +
      "</div></div>";

    var table =
      '<div class="wb-card p-5 sm:p-6">' +
      head("Students", "Search and manage learner records") +
      (list.length
        ? '<div class="wb-table-wrap"><div class="wb-table-scroll wb-scroll-thin" tabindex="0" role="region" aria-label="Scrollable table"><table class="wb-table wb-table--cards" id="studentTable">' +
          '<thead><tr><th scope="col">Student</th><th scope="col">Parent</th><th scope="col">Program</th><th scope="col">Instructor</th><th scope="col" class="num">Att.</th><th scope="col" class="num">Score</th><th scope="col">Plan</th><th scope="col">Status</th><th scope="col">Actions</th></tr></thead>' +
          "<tbody>" + rows + "</tbody></table></div></div>"
        : '<div class="wb-empty"><p class="m-0 mb-2 font-bold" style="color:var(--wb-ink)">No students match your search.</p><p class="m-0">Try a different name, batch or program.</p></div>') +
      '<div class="flex flex-wrap gap-2.5 mt-5">' +
      '<button type="button" class="wb-btn wb-btn-primary wb-btn-sm" data-action="add-student">Add Student</button>' +
      '<button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-action="export">Export CSV (demo)</button>' +
      '<button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-action="print">Print List</button>' +
      "</div></div>";

    return panelWrap("students", filters + table);
  }

  /* ---------------------------- BATCHES ----------------------------- */
  function batchesPanel() {
    var list = batches().filter(function (b) {
      return state.batchFilter === "all" || b.program === state.batchFilter;
    });

    var pills =
      '<div class="wb-card p-5 sm:p-6 mb-5">' +
      head("Filter", "Filter batches by program") +
      '<div class="wb-pills" role="group" aria-label="Filter batches">' +
      '<button type="button" class="wb-pill' + (state.batchFilter ==="all" ? " is-active" : "") + '" data-bfilter="all" aria-pressed="' + (state.batchFilter === "all") + '">All batches</button>' +
      programs()
        .map(function (p) {
          var on = state.batchFilter === p.title;
          return '<button type="button" class="wb-pill' + (on ?" is-active" : "") + '" data-bfilter="' + esc(p.title) + '" aria-pressed="' + on + '">' + esc(p.title) + "</button>";
        })
        .join("") +
      "</div></div>";

    var rows = list
      .map(function (b) {
        var fill = Math.round((b.enrolled / b.capacity) * 100);
        return (
          "<tr>" +
          '<td data-label="Batch"><strong>' + esc(b.name) + "</strong><br /><small style=\"color:var(--wb-ink-400)\">" + esc(b.day) + " · " + esc(b.time) + "</small></td>" +
          '<td data-label="Program">' + esc(b.program) + "</td>" +
          '<td data-label="Instructor">' + esc(b.instructor) + "</td>" +
          '<td data-label="Mode">' + esc(b.mode) + "</td>" +
          '<td data-label="Seats"><div class="min-w-[120px]"><div class="wb-progress wb-progress-sm"><span class="wb-progress-fill" data-value="' + fill + '"></span></div>' +
          '<small style="color:var(--wb-ink-400)">' + b.enrolled + " / " + b.capacity + "</small></div></td>" +
          '<td data-label="Status">' + statusBadge(b.status) + "</td>" +
          '<td data-label="Actions"><button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-batch="' + esc(b.id) + '">Manage</button></td></tr>'
        );
      })
      .join("");

    var table =
      '<div class="wb-card p-5 sm:p-6">' +
      head("Batches", list.length + " of " + batches().length + " batches") +
      '<div class="wb-table-wrap"><div class="wb-table-scroll wb-scroll-thin" tabindex="0" role="region" aria-label="Scrollable table"><table class="wb-table wb-table--cards">' +
      '<thead><tr><th scope="col">Batch</th><th scope="col">Program</th><th scope="col">Instructor</th><th scope="col">Mode</th><th scope="col">Seats</th><th scope="col">Status</th><th scope="col">Actions</th></tr></thead>' +
      "<tbody>" + rows + "</tbody></table></div></div></div>";

    var att =
      '<div class="wb-card p-5 sm:p-6 mt-5">' +
      head("Attendance by Batch", "Average attendance over the last 30 days") +
      '<div class="grid sm:grid-cols-2 gap-x-6">' +
      DATA.attendanceByBatch.map(function (a) { return barRow(a.label, a.v, 100); }).join("") +
      "</div></div>";

    return panelWrap("batches", pills + table + att);
  }

  /* --------------------------- INSTRUCTORS -------------------------- */
  function instructorsPanel() {
    var cards = instructors()
      .map(function (i) {
        var load = batches().filter(function (b) { return b.instructor === i.name; });
        var seats = load.reduce(function (a, b) { return a + b.enrolled; }, 0);
        return (
          '<article class="wb-card overflow-hidden flex flex-col">' +
          '<div class="relative">' +
          picture(
            BASE + esc(i.image),
            "w-full h-auto aspect-square object-cover",
            "Illustrated portrait of " + esc(i.name) + ", instructor",
            'width="400" height="400" loading="lazy"'
          ) +
          '<span class="absolute bottom-3 left-3 wb-badge" style="background:rgba(91,75,138,.92);color:#FFFFFF">' + esc(i.experience) + " yrs</span></div>" +
          '<div class="p-5 flex flex-col flex-1">' +
          '<h3 class="mb-1" style="font-size:1.1rem">' + esc(i.name) + "</h3>" +
          '<p class="m-0 mb-3 text-[0.84rem] font-semibold" style="color:var(--wb-primary)">' + esc(i.specialization) + "</p>" +
          '<dl class="m-0 mb-4">' +
          '<div class="wb-metric"><dt class="text-[0.85rem]">Batches</dt><dd class="m-0 text-right font-bold">' + load.length + "</dd></div>" +
          '<div class="wb-metric"><dt class="text-[0.85rem]">Students</dt><dd class="m-0 text-right font-bold">' + seats + "</dd></div>" +
          '<div class="wb-metric"><dt class="text-[0.85rem]">Availability</dt><dd class="m-0 text-right text-[0.85rem]">' + esc(i.availability) + "</dd></div>" +
          "</dl>" +
          '<div class="flex flex-wrap gap-2 mt-auto">' +
          '<button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-instructor="' + esc(i.id) + '">Schedule</button>' +
          '<button type="button" class="wb-btn wb-btn-outline wb-btn-sm" data-instructor-load="' + esc(i.id) + '">Teaching Load</button>' +
          "</div></div></article>"
        );
      })
      .join("");

    return panelWrap(
      "instructors",
      head("Teaching Team", instructors().length + " instructors on the rota") +
        '<div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">' + cards + "</div>"
    );
  }

  /* ---------------------------- PROGRAMS ---------------------------- */
  function programsPanel() {
    var enrollment = function (title) {
      var n = DATA.students.filter(function (s) { return s.program === title; }).length;
      return n;
    };

    var core = programs()
      .map(function (p) {
        var n = enrollment(p.title);
        var pct = Math.min(100, Math.round((n / 20) * 100));
        return (
          '<article class="wb-card p-5 flex flex-col">' +
          '<div class="flex items-start justify-between gap-3 mb-3">' +
          '<h3 class="m-0" style="font-size:1.08rem">' + esc(p.title) + "</h3>" +
          '<span class="wb-badge wb-badge-purple">' + esc(p.ageLabel || p.age || "All ages") + "</span></div>" +
          '<p class="m-0 mb-4 text-[0.9rem] flex-1" style="color:var(--wb-ink-500)">' + esc(p.summary || p.description) + "</p>" +
          '<div class="wb-metric"><span class="text-[0.85rem]">Enrolled students</span><strong>' + n + "</strong></div>" +
          '<div class="wb-metric"><span class="text-[0.85rem]">Batches</span><strong>' + batches().filter(function (b) { return b.programId === p.id; }).length + "</strong></div>" +
          '<div class="wb-progress wb-progress-sm mt-3"><span class="wb-progress-fill" data-value="' + pct + '"></span></div>' +
          '<div class="flex flex-wrap gap-2 mt-4">' +
          '<button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-program="' + esc(p.id) + '">Edit</button>' +
          '<a class="wb-btn wb-btn-outline wb-btn-sm" href="' + BASE + "programs.html#prog-panel-" + esc(p.id) + '">View Public Page</a>' +
          "</div></article>"
        );
      })
      .join("");

    var ws = workshops()
      .map(function (w) {
        return (
          "<tr>" +
          '<td data-label="Workshop"><strong>' + esc(w.title) + "</strong></td>" +
          '<td data-label="Format">' + esc(w.duration) + " · " + esc(w.frequency) + "</td>" +
          '<td data-label="Price" class="num">' + money(w.price) + "</td>" +
          '<td data-label="Bookings" class="num">' + (w.bookings || 12) + "</td>" +
          '<td data-label="Status">' + statusBadge(w.bookings > 15 ? "Almost full" : "Active") + "</td>" +
          "</tr>"
        );
      })
      .join("");

    var wsTable =
      '<div class="wb-card p-5 sm:p-6 mt-5">' +
      head("Workshops", workshops().length + " short courses") +
      '<div class="wb-table-wrap"><div class="wb-table-scroll wb-scroll-thin" tabindex="0" role="region" aria-label="Scrollable table"><table class="wb-table wb-table--cards">' +
      '<thead><tr><th scope="col">Workshop</th><th scope="col">Format</th><th scope="col" class="num">Price</th><th scope="col" class="num">Bookings</th><th scope="col">Status</th></tr></thead>' +
      "<tbody>" + ws + "</tbody></table></div></div></div>";

    return panelWrap("programs", head("Programs", "Core programs and short workshops") + '<div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">' + core + "</div>" + wsTable);
  }

  /* ---------------------------- REVIEWS ----------------------------- */
  function reviewsPanel() {
    var list = DATA.reviews.filter(function (r) {
      return state.reviewFilter === "all" || r.status === state.reviewFilter;
    });
    var pending = DATA.reviews.filter(function (r) { return r.status === "Pending"; }).length;

    var pills =
      '<div class="wb-card p-5 sm:p-6 mb-5">' +
      head("Review Queue", pending + " samples waiting") +
      '<div class="wb-pills" role="group" aria-label="Filter reviews by status">' +
      ["all", "Pending", "Approved", "Changes requested"]
        .map(function (f) {
          var on = state.reviewFilter === f;
          return '<button type="button" class="wb-pill' + (on ?" is-active" : "") + '" data-rfilter="' + f + '" aria-pressed="' + on + '">' + (f === "all" ? "All" : f) + "</button>";
        })
        .join("") +
      "</div></div>";

    var rows = list
      .map(function (r) {
        return (
          "<tr>" +
          '<td data-label="Ref"><strong>' + esc(r.id) + "</strong></td>" +
          '<td data-label="Student">' + esc(r.student) + '<br /><small style="color:var(--wb-ink-400)">Age ' + r.age + "</small></td>" +
          '<td data-label="Focus">' + esc(r.focus) + "</td>" +
          '<td data-label="Submitted">' + esc(r.submitted) + "</td>" +
          '<td data-label="Score" class="num"><strong>' + r.score + "</strong></td>" +
          '<td data-label="Status">' + statusBadge(r.status) + "</td>" +
          '<td data-label="Actions">' +
          '<button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-review="' + esc(r.id) + '">Review</button> ' +
          '<button type="button" class="wb-btn wb-btn-primary wb-btn-sm" data-approve="' + esc(r.id) + '">Approve</button>' +
          "</td></tr>"
        );
      })
      .join("");

    var table =
      '<div class="wb-card p-5 sm:p-6">' +
      head("Submitted Samples", DATA.reviews.length + " records · " + list.length + " shown") +
      '<div class="wb-table-wrap"><div class="wb-table-scroll wb-scroll-thin" tabindex="0" role="region" aria-label="Scrollable table"><table class="wb-table wb-table--cards">' +
      '<thead><tr><th scope="col">Ref</th><th scope="col">Student</th><th scope="col">Focus</th><th scope="col">Submitted</th><th scope="col" class="num">Score</th><th scope="col">Status</th><th scope="col">Actions</th></tr></thead>' +
      "<tbody>" + rows + "</tbody></table></div></div></div>";

    return panelWrap("reviews", pills + table);
  }

  /* ---------------------------- PAYMENTS ---------------------------- */
  function paymentsPanel() {
    var verified = DATA.payments.filter(function (p) { return p.status === "Verified"; }).reduce(function (a, p) { return a + p.amount; }, 0);
    var pending = DATA.payments.filter(function (p) { return p.status === "Pending"; }).reduce(function (a, p) { return a + p.amount; }, 0);
    var refunded = DATA.payments.filter(function (p) { return p.status === "Refunded"; }).reduce(function (a, p) { return a + p.amount; }, 0);

    var metrics =
      '<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">' +
      [
        { l: "Verified total", v: money(verified) },
        { l: "Pending", v: money(pending) },
        { l: "Refunded", v: money(refunded) },
        { l: "Transactions", v: DATA.payments.length }
      ]
        .map(function (m) {
          return '<div class="wb-stat"><p class="m-0 text-[0.8rem] font-semibold" style="color:var(--wb-ink-400)">' + esc(m.l) + "</p>" +
            '<p class="wb-stat-value m-0">' + esc(m.v) + "</p></div>";
        })
        .join("") +
      "</div>";

    var rows = DATA.payments
      .map(function (p) {
        return (
          "<tr>" +
          '<td data-label="Ref"><strong>' + esc(p.id) + "</strong></td>" +
          '<td data-label="Student">' + esc(p.student) + "</td>" +
          '<td data-label="Plan">' + esc(p.plan) + "</td>" +
          '<td data-label="Date">' + esc(p.date) + "</td>" +
          '<td data-label="Method">' + esc(p.method) + "</td>" +
          '<td data-label="Amount" class="num">' + money(p.amount) + "</td>" +
          '<td data-label="Status">' + statusBadge(p.status) + "</td>" +
          '<td data-label="Actions">' +
          (p.status === "Pending"
            ? '<button type="button" class="wb-btn wb-btn-primary wb-btn-sm" data-verify="' + esc(p.id) + '">Verify</button>'
            : '<button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-payment="' + esc(p.id) + '">View</button>') +
          "</td></tr>"
        );
      })
      .join("");

    var table =
      '<div class="wb-card p-5 sm:p-6">' +
      head("Transactions", "Sample billing records") +
      '<div class="wb-table-wrap"><div class="wb-table-scroll wb-scroll-thin" tabindex="0" role="region" aria-label="Scrollable table"><table class="wb-table wb-table--cards">' +
      '<thead><tr><th scope="col">Ref</th><th scope="col">Student</th><th scope="col">Plan</th><th scope="col">Date</th><th scope="col">Method</th><th scope="col" class="num">Amount</th><th scope="col">Status</th><th scope="col">Actions</th></tr></thead>' +
      "<tbody>" + rows + "</tbody></table></div></div>" +
      '<div class="flex flex-wrap gap-2.5 mt-5">' +
      '<button type="button" class="wb-btn wb-btn-primary wb-btn-sm" data-action="invoice">Create Invoice (demo)</button>' +
      '<button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-action="export">Export CSV (demo)</button>' +
      "</div></div>";

    return panelWrap("payments", metrics + table);
  }

  /* ---------------------------- INQUIRIES ---------------------------- */
  function inquiriesPanel() {
    var rows = DATA.inquiries
      .map(function (i) {
        return (
          "<tr>" +
          '<td data-label="Ref"><strong>' + esc(i.id) + "</strong></td>" +
          '<td data-label="Parent">' + esc(i.parent) + "</td>" +
          '<td data-label="Child">' + esc(i.child) + " · Age " + i.age + "</td>" +
          '<td data-label="Program">' + esc(i.program) + "</td>" +
          '<td data-label="Received">' + esc(i.received) + "</td>" +
          '<td data-label="Status">' + statusBadge(i.status) + "</td>" +
          '<td data-label="Actions">' +
          '<button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-inquiry="' + esc(i.id) + '">Open</button> ' +
          '<button type="button" class="wb-btn wb-btn-primary wb-btn-sm" data-enrol="' + esc(i.program) + '">Convert</button>' +
          "</td></tr>"
        );
      })
      .join("");

    var table =
      '<div class="wb-card p-5 sm:p-6">' +
      head("Admission Enquiries", DATA.inquiries.length + " records") +
      '<div class="wb-table-wrap"><div class="wb-table-scroll wb-scroll-thin" tabindex="0" role="region" aria-label="Scrollable table"><table class="wb-table wb-table--cards">' +
      '<thead><tr><th scope="col">Ref</th><th scope="col">Parent</th><th scope="col">Child</th><th scope="col">Program</th><th scope="col">Received</th><th scope="col">Status</th><th scope="col">Actions</th></tr></thead>' +
      "<tbody>" + rows + "</tbody></table></div></div>" +
      '<p class="wb-note mt-3 mb-0">“Convert” opens the public enquiry form with the program pre-filled — this demo has no enrolment workflow.</p></div>';

    var funnel =
      '<div class="wb-card p-5 sm:p-6 mt-5">' +
      head("Enquiry Funnel", "Sample conversion figures for the last quarter") +
      '<div class="grid sm:grid-cols-3 gap-4">' +
      [
        { l: "Enquiries received", v: 34 },
        { l: "Assessments booked", v: 21 },
        { l: "Enrolled", v: 14 }
      ]
        .map(function (f, i) {
          return (
            '<div class="wb-card wb-card-cream p-4 text-center">' +
            '<p class="m-0 text-[0.8rem] font-semibold" style="color:var(--wb-ink-500)">' + esc(f.l) + "</p>" +
            '<p class="m-0" style="font-size:1.9rem;font-weight:800;color:var(--wb-primary)">' + f.v + "</p>" +
            '<p class="m-0 text-[0.76rem]" style="color:var(--wb-ink-400)">' + (i === 0 ? "baseline" : Math.round((f.v / 34) * 100) + "% of enquiries") + "</p></div>"
          );
        })
        .join("") +
      "</div></div>";

    return panelWrap("inquiries", table + funnel);
  }

  /* ---------------------------- REPORTS ----------------------------- */
  function reportsPanel() {
    var scores = DATA.students.slice().sort(function (a, b) { return b.score - a.score; });

    var scoreCard =
      '<div class="wb-card p-5 sm:p-6">' +
      head("Skill Scores by Student", "Average handwriting score, highest first") +
      scores.map(function (s) { return barRow(s.name, s.score, 100); }).join("") +
      "</div>";

    var attCard =
      '<div class="wb-card p-5 sm:p-6">' +
      head("Attendance by Student", "Last 30 days") +
      DATA.students.slice().sort(function (a, b) { return b.attendance - a.attendance; })
        .map(function (s) { return barRow(s.name, s.attendance, 100); }).join("") +
      "</div>";

    var revCard =
      '<div class="wb-card p-5 sm:p-6">' +
      head("Revenue by Month", "Verified payments") +
      '<div class="flex items-end gap-3 sm:gap-4" style="height:190px" role="img" aria-label="Revenue over the last six months">' +
      DATA.revenue
        .map(function (r) {
          var h = Math.round((r.v / 200000) * 100);
          var style = "height:" + h + "%;min-height:10px;background:linear-gradient(180deg,#7A68AD,#5B4B8A)";
          return (
            '<div class="flex-1 flex flex-col items-center gap-2">' +
            '<span class="text-[0.72rem] font-bold" style="color:var(--wb-primary)">' + Math.round(r.v / 1000) + "k</span>" +
            '<div class="w-full rounded-t-lg" style="' + style + '" title="' + esc(r.m + ": " + money(r.v)) + '"></div>' +
            '<span class="text-[0.72rem]" style="color:var(--wb-ink-400)">' + esc(r.m) + "</span></div>"
          );
        })
        .join("") +
      "</div></div>";

    var mix =
      '<div class="wb-card p-5 sm:p-6">' +
      head("Program Mix", "Share of enrolled students") +
      '<div class="grid sm:grid-cols-2 gap-x-6">' +
      programs().map(function (p) {
        var n = DATA.students.filter(function (s) { return s.program === p.title; }).length;
        return barRow(p.title, n, DATA.students.length);
      }).join("") +
      "</div></div>";

    var printable =
      '<div class="wb-card wb-card-paper p-5 sm:p-6 mt-5">' +
      head("Centre Summary", "October 2025 · sample report") +
      '<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">' +
      [
        { l: "Students", v: DATA.students.length },
        { l: "Batches", v: batches().length },
        { l: "Instructors", v: instructors().length },
        { l: "Avg. score", v: Math.round(DATA.students.reduce(function (a, s) { return a + s.score; }, 0) / DATA.students.length) }
      ]
        .map(function (m) {
          return '<div class="wb-metric"><span class="text-[0.87rem]">' + esc(m.l) + '</span><strong style="font-size:1.1rem">' + esc(m.v) + "</strong></div>";
        })
        .join("") +
      "</div>" +
      '<div class="flex flex-wrap gap-2.5 mt-5">' +
      '<button type="button" class="wb-btn wb-btn-primary wb-btn-sm" data-action="print">Print / Save as PDF</button>' +
      '<button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-action="export">Export CSV (demo)</button>' +
      "</div>" +
      '<p class="wb-note mt-3 mb-0">Reports are rendered with HTML and CSS only — no chart library is used.</p></div>';

    return panelWrap(
      "reports",
      '<div class="grid gap-5 xl:grid-cols-2">' + scoreCard + attCard + "</div>" +
        '<div class="grid gap-5 xl:grid-cols-2 mt-5">' + revCard + mix + "</div>" +
        printable
    );
  }

  /* ------------------------------------------------------------------ */
  function renderNav() {
    qs("#dashNav").innerHTML = SECTIONS.map(function (s) {
      var on = s.id === state.section;
      return (
        '<li><button type="button" class="wb-dash-nav-item' + (on ?" is-active" : "") + '" data-section="' + s.id + '"' +
        (on ? ' aria-current="page"' : "") + '><span class="wb-dash-nav-ico" aria-hidden="true">' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + s.icon + "</svg></span>" +
        "<span>" + esc(s.label) + "</span></button></li>"
      );
    }).join("");
  }

  function renderPanels() {
    var host = qs("#dashPanels");
    host.innerHTML =
      overviewPanel() + studentsPanel() + batchesPanel() + instructorsPanel() +
      programsPanel() + reviewsPanel() + paymentsPanel() + inquiriesPanel() + reportsPanel();
    if (window.WB) WB.animateProgress(host);
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
    qs("#dashSubtitle").textContent = t[1];
    if (push) history.replaceState(null, "", "#" + id);
    closeDrawer();
    window.scrollTo({ top: 0, behavior: window.WB && WB.reducedMotion ? "auto" : "smooth" });
  }

  /* ---------------------------- DRAWER ------------------------------ */
  function openDrawer() {
    qs("#dashSidebar").classList.add("is-open");
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
  function studentModal(id) {
    var s = studentById(id);
    if (!window.WB) return;
    WB.modal({
      title: s.name,
      subtitle: s.id + " · Age " + s.age + " · " + s.program,
      body:
        '<div class="flex flex-col gap-3">' +
        '<div class="wb-metric"><span>Parent</span><strong>' + esc(s.parent) + "</strong></div>" +
        '<div class="wb-metric"><span>Contact</span><strong>' + esc(s.phone) + "</strong></div>" +
        '<div class="wb-metric"><span>Batch</span><strong>' + esc(s.batch) + "</strong></div>" +
        '<div class="wb-metric"><span>Instructor</span><strong>' + esc(s.instructor) + "</strong></div>" +
        '<div class="wb-metric"><span>Joined</span><strong>' + esc(s.joined) + "</strong></div>" +
        '<div class="wb-metric"><span>Attendance</span><strong>' + s.attendance + "%</strong></div>" +
        '<div class="wb-metric"><span>Score</span><strong>' + s.score + " / 100</strong></div>" +
        "</div>" +
        '<div class="flex flex-wrap gap-2 mt-4">' +
        '<button type="button" class="wb-btn wb-btn-quiet wb-btn-sm" data-modal-toggle>Toggle status</button>' +
        '<button type="button" class="wb-btn wb-btn-outline wb-btn-sm" data-modal-print>Print profile</button>' +
        "</div>",
      footer: '<button type="button" class="wb-btn wb-btn-primary" data-modal-close>Done</button>'
    });
    var tog = document.querySelector("[data-modal-toggle]");
    if (tog) {
      tog.addEventListener("click", function () {
        s.status = s.status === "Active" ? "Paused" : "Active";
        qs("[data-modal-close]").click();
        renderPanels();
        WB.toast(s.name + " is now " + s.status.toLowerCase() + " (demo).", "info");
      });
    }
    var pr = document.querySelector("[data-modal-print]");
    if (pr) {
      pr.addEventListener("click", function () {
        qs("[data-modal-close]").click();
        WB.toast("Demo only — no document was generated.", "info");
      });
    }
  }

  function batchModal(id) {
    var b = batches().filter(function (x) { return x.id === id; })[0];
    if (!b || !window.WB) return;
    var roster = DATA.students.filter(function (s) { return s.batch === b.name; });
    WB.modal({
      title: b.name,
      subtitle: b.day + " · " + b.time + " · " + b.mode,
      body:
        '<div class="flex flex-col gap-3 mb-4">' +
        '<div class="wb-metric"><span>Program</span><strong>' + esc(b.program) + "</strong></div>" +
        '<div class="wb-metric"><span>Instructor</span><strong>' + esc(b.instructor) + "</strong></div>" +
        '<div class="wb-metric"><span>Mode</span><strong>' + esc(b.mode) + "</strong></div>" +
        '<div class="wb-metric"><span>Seats</span><strong>' + b.enrolled + " / " + b.capacity + "</strong></div>" +
        "</div>" +
        (roster.length
          ? '<p class="font-bold mb-2 text-[0.9rem]">Roster (' + roster.length + ")</p><ul class=\"list-none m-0 p-0 flex flex-col gap-2\">" +
            roster.map(function (r) {
              return '<li class="wb-card p-2.5 text-[0.87rem]"><strong>' + esc(r.name) + "</strong> · " + r.score + " · " + esc(r.status) + "</li>";
            }).join("") +
            "</ul>"
          : '<div class="wb-empty"><p class="m-0">No sample students are mapped to this batch yet.</p></div>'),
      footer: '<button type="button" class="wb-btn wb-btn-primary" data-modal-close>Close</button>'
    });
  }

  function reviewModal(id) {
    var r = DATA.reviews.filter(function (x) { return x.id === id; })[0];
    if (!r || !window.WB) return;
    var m = WB.modal({
      title: r.id + " · " + r.student,
      subtitle: "Submitted " + r.submitted + " · focus: " + r.focus,
      body:
        '<div class="grid sm:grid-cols-2 gap-4 mb-4">' +
        '<figure class="m-0">' + picture(BASE + "assets/images/" + esc(r.before), "wb-dropzone-preview", "Earlier sample", 'style="width:100%"') + '<figcaption class="wb-note mt-2">Before</figcaption></figure>' +
        '<figure class="m-0">' + picture(BASE + "assets/images/" + esc(r.after), "wb-dropzone-preview", "Latest sample", 'style="width:100%"') + '<figcaption class="wb-note mt-2">Latest</figcaption></figure>' +
        "</div>" +
        '<div class="wb-field mb-3"><label class="wb-label" for="revNote">Feedback for the parent</label>' +
        '<textarea class="wb-textarea" id="revNote" rows="3">' + esc(r.note) + "</textarea></div>" +
        '<div class="wb-field mb-0"><label class="wb-label" for="revScore">Score out of 100</label>' +
        '<input class="wb-input" type="number" id="revScore" min="0" max="100" value="' + r.score + '" /></div>' +
        '<p class="wb-note mt-3 mb-0">Approving updates this sample record in the demo table only.</p>',
      footer:
        '<button type="button" class="wb-btn wb-btn-quiet" data-modal-close>Cancel</button>' +
        '<button type="button" class="wb-btn wb-btn-outline" data-rev-changes>Request Changes</button>' +
        '<button type="button" class="wb-btn wb-btn-primary" data-rev-approve>Approve Sample</button>'
    });

    function finish(status) {
      var note = m.panel.querySelector("#revNote");
      var score = m.panel.querySelector("#revScore");
      if (note) r.note = note.value;
      if (score) r.score = Math.max(0, Math.min(100, parseInt(score.value, 10) || 0));
      r.status = status;
      m.close();
      renderPanels();
      WB.toast(r.id + " marked as " + status.toLowerCase() + ".", status === "Approved" ? "success" : "info");
    }
    var ap = m.panel.querySelector("[data-rev-approve]");
    if (ap) ap.addEventListener("click", function () { finish("Approved"); });
    var ch = m.panel.querySelector("[data-rev-changes]");
    if (ch) ch.addEventListener("click", function () { finish("Changes requested"); });
  }

  function paymentModal(id) {
    var p = DATA.payments.filter(function (x) { return x.id === id; })[0];
    if (!p || !window.WB) return;
    WB.modal({
      title: p.id,
      subtitle: p.student + " · " + p.plan + " plan",
      body:
        '<div class="flex flex-col gap-3">' +
        '<div class="wb-metric"><span>Date</span><strong>' + esc(p.date) + "</strong></div>" +
        '<div class="wb-metric"><span>Method</span><strong>' + esc(p.method) + "</strong></div>" +
        '<div class="wb-metric"><span>Amount</span><strong>' + money(p.amount) + "</strong></div>" +
        '<div class="wb-metric"><span>Status</span><strong>' + esc(p.status) + "</strong></div>" +
        "</div>",
      footer: '<button type="button" class="wb-btn wb-btn-primary" data-modal-close>Close</button>'
    });
  }

  function inquiryModal(id) {
    var i = DATA.inquiries.filter(function (x) { return x.id === id; })[0];
    if (!i || !window.WB) return;
    WB.modal({
      title: i.id + " · " + i.parent,
      subtitle: i.child + " (age " + i.age + ") · " + i.program,
      body:
        '<div class="flex flex-col gap-3">' +
        '<div class="wb-metric"><span>Received</span><strong>' + esc(i.received) + "</strong></div>" +
        '<div class="wb-metric"><span>Status</span><strong>' + esc(i.status) + "</strong></div>" +
        '<div class="wb-metric"><span>Interested in</span><strong>' + esc(i.program) + "</strong></div>" +
        "</div>" +
        '<p class="wb-note mt-3 mb-0">In a live system this is where the enquiry thread and notes would appear.</p>',
      footer:
        '<button type="button" class="wb-btn wb-btn-quiet" data-modal-close>Close</button>' +
        '<a class="wb-btn wb-btn-primary" href="' + BASE + "contact.html?intent=enroll&program=" + encodeURIComponent(i.program) + '">Open Enquiry Form</a>'
    });
  }

  function instructorModal(id) {
    var i = instructors().filter(function (x) { return x.id === id; })[0];
    if (!i || !window.WB) return;
    var load = batches().filter(function (b) { return b.instructor === i.name; });
    WB.modal({
      title: i.name,
      subtitle: i.qualification,
      body:
        '<div class="flex flex-col gap-3">' +
        '<div class="wb-metric"><span>Specialization</span><strong>' + esc(i.specialization) + "</strong></div>" +
        '<div class="wb-metric"><span>Experience</span><strong>' + i.experience + " years</strong></div>" +
        '<div class="wb-metric"><span>Teaching style</span><strong>' + esc(i.style) + "</strong></div>" +
        '<div class="wb-metric"><span>Availability</span><strong>' + esc(i.availability) + "</strong></div>" +
        '<div class="wb-metric"><span>Batches</span><strong>' + load.length + "</strong></div>" +
        "</div>" +
        (load.length
          ? '<ul class="list-none m-0 p-0 mt-4 flex flex-col gap-2">' +
            load.map(function (b) {
              return '<li class="wb-card p-2.5 text-[0.87rem]"><strong>' + esc(b.name) + "</strong> · " + esc(b.day) + " · " + esc(b.time) + " · " + b.enrolled + "/" + b.capacity + "</li>";
            }).join("") +
            "</ul>"
          : ""),
      footer: '<button type="button" class="wb-btn wb-btn-primary" data-modal-close>Close</button>'
    });
  }

  function addStudentModal() {
    if (!window.WB) return;
    WB.modal({
      title: "Add Student",
      subtitle: "Creates a sample record in this browser tab.",
      body:
        '<div class="grid sm:grid-cols-2 gap-4">' +
        '<div class="wb-field mb-0"><label class="wb-label" for="nsName">Student name</label><input class="wb-input" id="nsName" data-modal-autofocus placeholder="e.g. Tara Menon" /></div>' +
        '<div class="wb-field mb-0"><label class="wb-label" for="nsAge">Age</label><input class="wb-input" type="number" id="nsAge" min="4" max="16" value="8" /></div>' +
        '<div class="wb-field mb-0 sm:col-span-2"><label class="wb-label" for="nsProgram">Program</label><select class="wb-select" id="nsProgram">' +
        programs().map(function (p) { return '<option>' + esc(p.title) + "</option>"; }).join("") +
        "</select></div>" +
        "</div>",
      footer:
        '<button type="button" class="wb-btn wb-btn-quiet" data-modal-close>Cancel</button>' +
        '<button type="button" class="wb-btn wb-btn-primary" data-ns-save>Save Student</button>'
    });
    var b = document.querySelector("[data-ns-save]");
    if (b) {
      b.addEventListener("click", function () {
        var name = (document.getElementById("nsName").value || "").trim();
        if (name.length < 3) {
          WB.toast("Please enter a student name.", "error");
          return;
        }
        var age = parseInt(document.getElementById("nsAge").value, 10) || 8;
        var prog = document.getElementById("nsProgram").value;
        var b2 = batches().filter(function (b3) { return b3.program === prog; })[0];
        DATA.students.push({
          id: "ST-" + (1009 + DATA.students.length),
          name: name,
          age: age,
          parent: "New enquiry",
          phone: "+91 90000 00000",
          program: prog,
          batch: b2 ? b2.name : "Unassigned",
          instructor: b2 ? b2.instructor : "Unassigned",
          attendance: 0,
          score: 0,
          classes: 0,
          plan: "Starter",
          status: "Active",
          joined: "Just now"
        });
        qs("[data-modal-close]").click();
        renderPanels();
        setSection("students");
        WB.toast(name + " added to the demo student list.", "success");
      });
    }
  }

  function invoiceModal() {
    if (!window.WB) return;
    WB.modal({
      title: "Create Invoice (Demo)",
      subtitle: "No invoice is generated or sent anywhere.",
      body:
        '<div class="grid sm:grid-cols-2 gap-4">' +
        '<div class="wb-field mb-0"><label class="wb-label" for="invStudent">Student</label><select class="wb-select" id="invStudent">' +
        DATA.students.map(function (s) { return "<option>" + esc(s.name) + "</option>"; }).join("") +
        "</select></div>" +
        '<div class="wb-field mb-0"><label class="wb-label" for="invAmount">Amount</label><input class="wb-input" type="number" id="invAmount" value="1799" /></div>' +
        "</div>",
      footer:
        '<button type="button" class="wb-btn wb-btn-quiet" data-modal-close>Cancel</button>' +
        '<button type="button" class="wb-btn wb-btn-primary" data-inv-create>Create</button>'
    });
    var b = document.querySelector("[data-inv-create]");
    if (b) {
      b.addEventListener("click", function () {
        var who = document.getElementById("invStudent").value;
        var amt = parseInt(document.getElementById("invAmount").value, 10) || 0;
        qs("[data-modal-close]").click();
        WB.toast("Demo invoice for " + who + " (" + money(amt) + ") created in this tab.", "success");
      });
    }
  }

  function alertsModal() {
    if (!window.WB) return;
    var pending = DATA.reviews.filter(function (r) { return r.status === "Pending"; });
    WB.modal({
      title: "Centre Alerts",
      subtitle: "4 items need attention",
      body:
        '<ul class="list-none m-0 p-0 flex flex-col gap-3">' +
        pending.map(function (r) {
          return '<li class="wb-card wb-card-cream p-3"><strong class="block text-[0.9rem]">' + esc(r.student) + " · " + esc(r.id) + "</strong><span class=\"text-[0.85rem]\" style=\"color:var(--wb-ink-500)\">" + esc(r.focus) + "</span></li>";
        }).join("") +
        '<li class="wb-card p-3"><strong class="block text-[0.9rem]">PAY-9021 pending verification</strong><span class="text-[0.85rem]" style="color:var(--wb-ink-500)">UPI reference not matched</span></li>' +
        "</ul>",
      footer: '<button type="button" class="wb-btn wb-btn-primary" data-modal-close>Close</button>'
    });
  }

  /* ----------------------------- WIRE ------------------------------- */
  function applyStudentFilter(program) {
    qsa("[data-sfilter]").forEach(function (p) {
      var on = p.getAttribute("data-sfilter") === program;
      p.classList.toggle("is-active", on);
      p.setAttribute("aria-pressed", on ? "true" : "false");
    });
    qsa("#studentTable tbody tr").forEach(function (tr) {
      var cell = tr.children[2];
      var match = program === "all" || (cell && cell.textContent.indexOf(program) > -1);
      tr.hidden = !match;
    });
  }

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
    qs("#dashBell").addEventListener("click", alertsModal);

    [qs("#adminSearch"), qs("#adminSearchMobile")].forEach(function (input) {
      if (!input) return;
      input.addEventListener("input", function () {
        state.query = input.value;
        var other = input.id === "adminSearch" ? qs("#adminSearchMobile") : qs("#adminSearch");
        if (other) other.value = input.value;
        if (state.section !== "students") setSection("students", true);
        else {
          var q = state.query.toLowerCase();
          qsa("#studentTable tbody tr").forEach(function (tr) {
            tr.hidden = q ? tr.textContent.toLowerCase().indexOf(q) === -1 : false;
          });
        }
      });
    });

    document.addEventListener("click", function (e) {
      var t = e.target;

      var nav = t.closest("[data-section]");
      if (nav) { setSection(nav.getAttribute("data-section"), true); return; }

      var go = t.closest("[data-goto]");
      if (go) { setSection(go.getAttribute("data-goto"), true); return; }

      var sf = t.closest("[data-sfilter]");
      if (sf) { applyStudentFilter(sf.getAttribute("data-sfilter")); return; }

      var bf = t.closest("[data-bfilter]");
      if (bf) { state.batchFilter = bf.getAttribute("data-bfilter"); renderPanels(); setSection("batches"); return; }

      var rf = t.closest("[data-rfilter]");
      if (rf) { state.reviewFilter = rf.getAttribute("data-rfilter"); renderPanels(); setSection("reviews"); return; }

      var st = t.closest("[data-student]");
      if (st) { studentModal(st.getAttribute("data-student")); return; }

      var sr = t.closest("[data-student-report]");
      if (sr) {
        var s = studentById(sr.getAttribute("data-student-report"));
        state.query = s.name;
        [qs("#adminSearch"), qs("#adminSearchMobile")].forEach(function (i) { if (i) i.value = s.name; });
        setSection("students", true);
        return;
      }

      var bt = t.closest("[data-batch]");
      if (bt) { batchModal(bt.getAttribute("data-batch")); return; }

      var ins = t.closest("[data-instructor]");
      if (ins) { instructorModal(ins.getAttribute("data-instructor")); return; }

      var load = t.closest("[data-instructor-load]");
      if (load) {
        var i2 = instructors().filter(function (x) { return x.id === load.getAttribute("data-instructor-load"); })[0];
        var bs = batches().filter(function (b) { return b.instructor === i2.name; });
        if (window.WB) WB.toast(i2.name + " leads " + bs.length + " batches with " +
          bs.reduce(function (a, b) { return a + b.enrolled; }, 0) + " students.", "info");
        return;
      }

      var pr = t.closest("[data-program]");
      if (pr) {
        var p = programs().filter(function (x) { return x.id === pr.getAttribute("data-program"); })[0];
        if (window.WB) WB.toast("Editing “" + p.title + "” is disabled in this demo.", "info");
        return;
      }

      var rv = t.closest("[data-review]");
      if (rv) { reviewModal(rv.getAttribute("data-review")); return; }

      var ap = t.closest("[data-approve]");
      if (ap) {
        var r2 = DATA.reviews.filter(function (x) { return x.id === ap.getAttribute("data-approve"); })[0];
        r2.status = "Approved";
        renderPanels();
        if (window.WB) WB.toast(r2.id + " approved.", "success");
        return;
      }

      var vf = t.closest("[data-verify]");
      if (vf) {
        var pay = DATA.payments.filter(function (x) { return x.id === vf.getAttribute("data-verify"); })[0];
        pay.status = "Verified";
        renderPanels();
        if (window.WB) WB.toast(pay.id + " verified.", "success");
        return;
      }

      var pm = t.closest("[data-payment]");
      if (pm) { paymentModal(pm.getAttribute("data-payment")); return; }

      var iq = t.closest("[data-inquiry]");
      if (iq) { inquiryModal(iq.getAttribute("data-inquiry")); return; }

      var act = t.closest("[data-action]");
      if (act) {
        var a = act.getAttribute("data-action");
        if (a === "add-student") addStudentModal();
        else if (a === "invoice") invoiceModal();
        else if (a === "export") WB.toast("Demo only — no CSV file is generated.", "info");
        else if (a === "print") window.print();
        return;
      }
    });
  }

  /* ----------------------------- BOOT ------------------------------- */
  function init() {
    wire();
    renderNav();
    renderPanels();
    var hash = (window.location.hash || "").replace("#", "");
    setSection(hash || "overview", false);
    window.addEventListener("hashchange", function () {
      setSection((window.location.hash || "").replace("#", "") || "overview", false);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
