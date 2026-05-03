/**
 * Inject a PDF thumbnail widget at the top of the MkDocs Material secondary
 * sidebar (ToC area) on each CV section page.
 *
 * Works with instant navigation (navigation.instant) by intercepting
 * history.pushState and listening for popstate events.
 */
(function () {
  "use strict";

  var pagePdfs = {
    about:  ["RakitinM_CV.pdf",     "Full CV PDF"],
    jobs:   ["RakitinM_jobs.pdf",   "Experience PDF"],
    edu:    ["RakitinM_edu.pdf",    "Education PDF"],
    pubs:   ["RakitinM_pubs.pdf",   "Publications PDF"],
    confs:  ["RakitinM_confs.pdf",  "Conferences PDF"],
    awards: ["RakitinM_awards.pdf", "Awards PDF"],
    skills: ["RakitinM_skills.pdf", "Skills PDF"],
    refs:   ["RakitinM_refs.pdf",   "References PDF"],
  };

  function injectWidget() {
    var parts = window.location.pathname.replace(/\/+$/, "").split("/");
    var slug = parts[parts.length - 1];
    var parent = parts[parts.length - 2];

    if (parent !== "pages" || !pagePdfs[slug]) return;

    var inner = document.querySelector(
      ".md-sidebar--secondary .md-sidebar__inner"
    );
    if (!inner || inner.querySelector(".sidebar-pdf-widget")) return;

    var entry = pagePdfs[slug];
    var pdfName = entry[0];
    var alt = entry[1];
    var thumbName = pdfName.replace(".pdf", ".png");
    // Navigate from /v2/pages/<slug>/ up two levels to /v2/
    var base = parts.slice(0, -2).join("/") + "/";

    var w = document.createElement("div");
    w.className = "sidebar-pdf-widget";
    w.innerHTML =
      '<a href="' + base + '_static/' + pdfName + '">' +
        '<img src="' + base + '_static/cv_thumbs/' + thumbName +
             '" alt="' + alt + '">' +
      '</a>' +
      '<p><a href="' + base + '_static/' + pdfName +
           '">\uD83D\uDCE5 Download PDF</a></p>';

    inner.prepend(w);
  }

  // Initial page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectWidget);
  } else {
    injectWidget();
  }

  // Instant navigation: intercept history.pushState
  var origPushState = history.pushState;
  history.pushState = function () {
    origPushState.apply(this, arguments);
    setTimeout(injectWidget, 80);
  };

  // Back/forward navigation
  window.addEventListener("popstate", function () {
    setTimeout(injectWidget, 80);
  });
})();
