/* Shared site chrome: navbar and footer.
 *
 * Single source of truth for markup that must not drift between pages.
 * Pages carry two placeholders:
 *   <div data-include="site-header"></div>
 *   <div data-include="site-footer"></div>
 * Each placeholder is replaced with the rendered element. The site root is
 * derived from this script's own src, so pages at any depth (and file://
 * previews) resolve links correctly. Sets aria-current="page" on the active
 * nav item. A <noscript> fallback link lives in each page's markup.
 */
(function () {
  "use strict";

  var script = document.currentScript;
  var root = script.src.replace(/js\/include\.js(\?.*)?$/, "");

  var VOLUMES = [
    { num: "I", title: "Frameworks", slug: "frameworks", shipped: true,
      desc: "Economic systems, in theory and in practice." },
    { num: "II", title: "History", slug: "history", shipped: true,
      desc: "Exchange and its institutions, from barter to the attention market." },
    { num: "III", title: "Countries", slug: "countries", shipped: true,
      desc: "Why national outcomes diverge." },
    { num: "IV", title: "Work", slug: "work", shipped: true,
      desc: "Labor, hours, wages, and the purpose of a job." },
    { num: "V", title: "Pathologies", slug: "pathologies", shipped: false,
      desc: "Failure modes, and how economists know what they know." }
  ];

  function volumeHref(vol) {
    return root + "books/" + vol.slug + "/index.html";
  }

  function navItem(vol) {
    var prefix = '<span class="site-nav__vol" aria-hidden="true">' +
      vol.num + " · </span>";
    if (vol.shipped) {
      return "<a href=\"" + volumeHref(vol) + "\">" + prefix + vol.title + "</a>";
    }
    return '<span class="site-nav__soon">' + prefix + vol.title +
      '<span class="visually-hidden"> (forthcoming)</span></span>';
  }

  function renderHeader() {
    var el = document.createElement("header");
    el.className = "site-header";
    el.innerHTML =
      '<div class="container site-header__row">' +
      '<a class="wordmark" href="' + root + 'index.html">The Economy Hub</a>' +
      '<nav class="site-nav" aria-label="Volumes">' +
      '<a href="' + root + 'index.html">The Shelf</a>' +
      VOLUMES.map(navItem).join("") +
      "</nav></div>";
    return el;
  }

  function footerVolume(vol) {
    var status = vol.shipped
      ? '<span class="chip chip--shipped">Available</span>'
      : '<span class="chip chip--forthcoming">Forthcoming</span>';
    var name = vol.shipped
      ? '<a href="' + volumeHref(vol) + '">Volume ' + vol.num + ": " +
        vol.title + "</a>"
      : "<span>Volume " + vol.num + ": " + vol.title + "</span>";
    return "<li>" + name + status + "</li>";
  }

  function renderFooter() {
    var el = document.createElement("footer");
    el.className = "site-footer";
    el.innerHTML =
      '<div class="container">' +
      '<div class="site-footer__grid">' +
      "<div>" +
      '<h2 class="site-footer__heading">The volumes</h2>' +
      "<ul>" + VOLUMES.map(footerVolume).join("") + "</ul>" +
      "</div>" +
      "<div>" +
      '<h2 class="site-footer__heading">Elsewhere</h2>' +
      "<ul>" +
      '<li><a href="' + root + 'index.html">The shelf</a></li>' +
      '<li><a href="' + root + 'components.html">Component library</a></li>' +
      '<li><a href="https://jasonhchronicles.com/the-love-equations/">The Love Equations</a></li>' +
      '<li><a href="https://jasonhuang24.github.io/VMSS">VMSS</a></li>' +
      "</ul>" +
      "</div>" +
      "</div>" +
      '<p class="site-footer__colophon">The Economy Hub reports mechanisms ' +
      "and evidence, and leaves judgment to the reader.</p>" +
      "</div>";
    return el;
  }

  function markCurrent(headerEl) {
    var here = new URL(window.location.href);
    var herePath = here.pathname.replace(/\/$/, "/index.html");
    headerEl.querySelectorAll("a").forEach(function (a) {
      var linkPath = new URL(a.href).pathname.replace(/\/$/, "/index.html");
      if (linkPath === herePath) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  var headerSlot = document.querySelector('[data-include="site-header"]');
  var footerSlot = document.querySelector('[data-include="site-footer"]');
  if (headerSlot) {
    var header = renderHeader();
    markCurrent(header);
    headerSlot.replaceWith(header);
  }
  if (footerSlot) {
    footerSlot.replaceWith(renderFooter());
  }
})();
