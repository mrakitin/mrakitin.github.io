/**
 * Inject a PDF thumbnail widget at the top of the MkDocs Material secondary
 * sidebar (ToC area) on each CV section page.
 *
 * Uses MkDocs Material's document$ observable when available (instant
 * navigation), which fires *after* the DOM is fully updated — eliminating the
 * race condition where a fixed setTimeout could fire before MkDocs Material
 * finishes replacing the ToC, causing the injected widget to be wiped.
 *
 * Falls back to DOMContentLoaded + history.pushState intercept for
 * non-instant-navigation builds.
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
    // Always remove any widget left over from a previous page so that
    // navigating away from a section page cleans up correctly.
    var old = document.querySelector(".sidebar-pdf-widget");
    if (old) old.remove();

    var parts = window.location.pathname.replace(/\/+$/, "").split("/");
    var slug = parts[parts.length - 1];
    var parent = parts[parts.length - 2];

    if (parent !== "pages" || !pagePdfs[slug]) return;

    var inner = document.querySelector(
      ".md-sidebar--secondary .md-sidebar__inner"
    );
    if (!inner) return;

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

  // MkDocs Material exposes document$ — an RxJS Subject that emits *after*
  // each page's DOM (including the ToC sidebar) has been fully updated.
  // Using it avoids the timing race with navigation.instant.
  if (typeof document$ !== "undefined" && typeof document$.subscribe === "function") {
    document$.subscribe(injectWidget);
    return;
  }

  // Fallback for builds without navigation.instant.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectWidget);
  } else {
    injectWidget();
  }

  var origPushState = history.pushState;
  history.pushState = function () {
    origPushState.apply(this, arguments);
    setTimeout(injectWidget, 200);
  };

  window.addEventListener("popstate", function () {
    setTimeout(injectWidget, 200);
  });
})();
