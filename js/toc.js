/* Chapter table of contents.
 *
 * The sidebar is a native <details class="chapter-toc"> so it works from the
 * keyboard with no script. This file:
 *   1. builds the link list from the h2 headings inside .chapter-body
 *      (headings are the single source of truth; ids are generated when
 *      missing);
 *   2. holds the details open on desktop, where it renders as a sticky
 *      sidebar, and releases it to collapse naturally on small screens;
 *   3. marks the heading currently in view with aria-current="location".
 */
(function () {
  "use strict";

  var toc = document.querySelector(".chapter-toc");
  var body = document.querySelector(".chapter-body");
  if (!toc || !body) {
    return;
  }

  var headings = Array.prototype.slice.call(body.querySelectorAll("h2"));
  if (headings.length === 0) {
    toc.hidden = true;
    return;
  }

  function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  var list = document.createElement("ul");
  list.className = "chapter-toc__list";
  var links = headings.map(function (h) {
    if (!h.id) {
      h.id = slugify(h.textContent);
    }
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    list.appendChild(li);
    return a;
  });
  toc.appendChild(list);

  /* Desktop: the details is held open and its summary becomes a static
     heading (unfocusable, untoggleable). Mobile: a normal disclosure. */
  var desktop = window.matchMedia("(min-width: 60rem)");
  var summary = toc.querySelector("summary");
  function applyBreakpoint() {
    if (desktop.matches) {
      toc.open = true;
      summary.tabIndex = -1;
    } else {
      summary.tabIndex = 0;
    }
  }
  applyBreakpoint();
  if (desktop.addEventListener) {
    desktop.addEventListener("change", applyBreakpoint);
  }
  toc.addEventListener("toggle", function () {
    if (desktop.matches && !toc.open) {
      toc.open = true;
    }
  });

  /* Scrollspy */
  if ("IntersectionObserver" in window) {
    var current = null;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            current = entry.target.id;
          }
        });
        links.forEach(function (a) {
          if (a.getAttribute("href") === "#" + current) {
            a.setAttribute("aria-current", "location");
          } else {
            a.removeAttribute("aria-current");
          }
        });
      },
      { rootMargin: "0px 0px -70% 0px" }
    );
    headings.forEach(function (h) {
      observer.observe(h);
    });
  }
})();
