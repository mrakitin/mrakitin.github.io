# Sphinx configuration for mrakitin/CV

import datetime
from datetime import datetime as _dt
from zoneinfo import ZoneInfo as _ZoneInfo

# Compute the Eastern timezone abbreviation (EDT/EST) at build time so we can
# embed it as a literal in html_last_updated_fmt (the %Z strftime code gives
# the UTC offset "-0400" on some platforms rather than the abbreviation "EDT").
_tz_abbr = _dt.now(tz=_ZoneInfo("America/New_York")).strftime("%Z")

# ── Project info ──────────────────────────────────────────────────────────────
project   = "Max Rakitin — CV"
author    = "Max Rakitin"
copyright = f"2015–{datetime.date.today().year}, {author}"
release   = ""

# ── Extensions ────────────────────────────────────────────────────────────────
extensions = [
    "myst_parser",
    "sphinx_design",
]

myst_enable_extensions = ["colon_fence", "fieldlist", "attrs_inline"]

# ── Source ────────────────────────────────────────────────────────────────────
source_suffix = {
    ".rst": "restructuredtext",
    ".md":  "markdown",
}
master_doc = "index"
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store", "index_mkdocs.md"]

# ── HTML output ───────────────────────────────────────────────────────────────
html_theme = "pydata_sphinx_theme"

html_theme_options = {
    "github_url":        "https://github.com/mrakitin",
    "navbar_end":        ["theme-switcher", "navbar-icon-links"],
    "secondary_sidebar_items": ["page-toc"],
    "footer_start":      ["copyright"],
    "footer_end":        ["last-updated"],
    "show_toc_level":    2,
    "navigation_depth":  2,
    "logo": {
        "text": "Max Rakitin",
        "image_light": "_static/profile.jpg",
        "image_dark":  "_static/profile.jpg",
    },
    "announcement": (
        '🚀 A new version of this site is available at '
        '<a href="https://mrakitin.github.io/v2/">mrakitin.github.io/v2/</a>'
        ' — powered by MkDocs Material theme.'
    ),
}

html_title  = "Max Rakitin — CV"
html_short_title = "CV"
html_favicon = "_static/favicon.png"

# Show build date/time in the footer (America/New_York; CI job sets TZ env var).
# Embed the tz abbreviation as a literal so Sphinx shows "EDT" not "-0400".
html_last_updated_fmt = f"%B %-d, %Y at %H:%M {_tz_abbr}"

# Base URL for the deployed site (root of mrakitin.github.io)
html_baseurl = "https://mrakitin.github.io/"

# Copy PDF files into _static so they can be downloaded
html_static_path = ["_static"]

html_css_files = ["custom.css"]

# Sidebar links to PDF downloads
html_context = {}

# ── Misc ──────────────────────────────────────────────────────────────────────
nitpicky = False
