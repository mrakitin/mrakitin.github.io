// ── Search ────────────────────────────────────────────
(function () {
  // Determine path prefix relative to site root
  const inUnits = window.location.pathname.includes('/units/');
  const base = inUnits ? '../' : '';

  // Resolve absolute URLs for results
  function resolveUrl(relUrl) {
    return base + relUrl;
  }

  // Load Fuse.js from CDN, then initialize
  function loadFuse(cb) {
    if (window.Fuse) { cb(); return; }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js';
    s.onload = cb;
    document.head.appendChild(s);
  }

  let fuse = null;

  function initFuse() {
    fuse = new Fuse(SEARCH_INDEX, {
      keys: [
        { name: 'title', weight: 3 },
        { name: 'keywords', weight: 2 },
        { name: 'snippet', weight: 1 }
      ],
      threshold: 0.35,
      minMatchCharLength: 2,
      includeScore: true
    });
  }

  function renderResults(query) {
    const resultsEl = document.getElementById('search-results');
    if (!resultsEl) return;

    if (!query.trim()) {
      resultsEl.innerHTML = '';
      return;
    }

    const hits = fuse.search(query).slice(0, 8);

    if (hits.length === 0) {
      resultsEl.innerHTML = '<div class="search-no-results">No results for <strong>' +
        escHtml(query) + '</strong></div>';
      return;
    }

    resultsEl.innerHTML = hits.map(({ item }) =>
      `<a href="${resolveUrl(item.url)}" class="search-result-item">
        <div class="search-result-title">${escHtml(item.title)}</div>
        <div class="search-result-snippet">${escHtml(item.snippet)}</div>
      </a>`
    ).join('');
  }

  function escHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('search-btn');
    const popup = document.getElementById('search-popup');
    const input = document.getElementById('search-input');
    if (!btn || !popup || !input) return;

    // Toggle popup
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isHidden = popup.hasAttribute('hidden');
      if (isHidden) {
        popup.removeAttribute('hidden');
        loadFuse(function () {
          if (!fuse) initFuse();
          input.focus();
        });
      } else {
        popup.setAttribute('hidden', '');
        input.value = '';
        document.getElementById('search-results').innerHTML = '';
      }
    });

    // Live search
    input.addEventListener('input', function () {
      if (fuse) renderResults(this.value);
    });

    // Keyboard: Escape closes, Enter follows first result
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        popup.setAttribute('hidden', '');
        input.value = '';
        document.getElementById('search-results').innerHTML = '';
        btn.focus();
      } else if (e.key === 'Enter') {
        const first = document.querySelector('.search-result-item');
        if (first) first.click();
      }
    });

    // Click outside to close
    document.addEventListener('click', function (e) {
      if (!popup.hasAttribute('hidden') &&
          !popup.contains(e.target) && e.target !== btn) {
        popup.setAttribute('hidden', '');
        input.value = '';
        document.getElementById('search-results').innerHTML = '';
      }
    });
  });
})();
