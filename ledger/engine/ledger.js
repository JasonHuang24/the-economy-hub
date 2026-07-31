/* THE LEDGER — shared scrollytelling engine, schema v1.
 *
 * EDITION-AGNOSTIC IN DATA. This file holds no data values. Era count, era
 * labels, line set, the wage spine, the construct strips, the texture picks
 * and the currency/axis labels all come from the edition's register
 * (ledger/data/<slug>.js), which the page names on
 * <body data-ledger-edition="<slug>"> — labels via the register's `format`
 * block, with this file's fallbacks being the v1 dollar-wage defaults. One
 * v1 assumption IS built in: the second axis is time priced by a wage
 * (price divided by hourly earnings). An edition whose second axis is not a
 * wage needs a schema bump, not just a register. Adding a wage-axis edition
 * means adding a page and a conforming register; this file does not change.
 *
 * What it does, in order:
 *   1. reads the register and checks its declared schema version;
 *   2. builds the persistent ledger panel and the dollars/hours control;
 *   3. tracks which era section the reader is in, off scroll position, and
 *      turns the panel over to it with a brief count-up on change;
 *   4. audits every static no-JS cell in the document against the register and
 *      reports mismatches to the console (the D11 coordinate audit, extended
 *      to a data surface).
 *
 * PROGRESSIVE ENHANCEMENT. With JS off the page is already a complete
 * document: every era's ledger is a static table in flow, with both the money
 * and the work-time column present. Nothing here is required to read the page;
 * this layer only adds the sticky panel, the emphasis toggle and the audit.
 * prefers-reduced-motion is honoured with instant swaps.
 */
(function () {
  "use strict";

  var SCHEMA = 1;
  var W = window.LEDGER || {};
  var body = document.body;
  var slug = body ? body.getAttribute("data-ledger-edition") : null;
  var reg = slug && W.registers ? W.registers[slug] : null;

  if (!reg) { return; }
  if (reg.schema !== SCHEMA) {
    window.console && console.error(
      "Ledger engine speaks schema v" + SCHEMA + "; register '" + slug +
      "' declares v" + reg.schema + ". Not rendering."
    );
    return;
  }

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Currency and axis labels come from the register's format block; the
     fallbacks below are the v1 dollar-wage defaults. */
  var fmt = reg.format || {};
  var CUR_SYMBOL = fmt.symbol || "$";
  var CUR_MINOR = fmt.minorWord || "cents";

  /* ------------------------------------------------------------- helpers - */

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text != null) { n.textContent = text; }
    return n;
  }

  function money(amount) {
    if (amount == null) { return null; }
    if (amount < 1) { return Math.round(amount * 1000) / 10 + " " + CUR_MINOR; }
    return CUR_SYMBOL + amount.toFixed(2);
  }

  /* Work-time is COMPUTED here, never stored: nominal price divided by the
     era's nominal hourly earnings, both from the register. */
  function workTime(price, wagePerHour) {
    if (price == null || !wagePerHour) { return null; }
    var minutes = Math.round((price / wagePerHour) * 60);
    if (minutes < 60) { return minutes + " min"; }
    var h = Math.floor(minutes / 60);
    var m = minutes % 60;
    return h + " hr" + (m ? " " + m + " min" : "");
  }

  function eraById(id) {
    for (var i = 0; i < reg.eras.length; i++) {
      if (reg.eras[i].id === id) { return reg.eras[i]; }
    }
    return null;
  }

  function wageFor(era, colKey) {
    /* A paired era carries one wage per column, keyed by the column label's
       year; a single-column era keys on the era id. Both come from the
       register's wage block, never from the panel. */
    var col = null;
    for (var i = 0; i < era.columns.length; i++) {
      if (era.columns[i].key === colKey) { col = era.columns[i]; }
    }
    var key = col && reg.wage.values[col.label] ? col.label : era.id;
    var v = reg.wage.values[key];
    return v ? v.v : null;
  }

  /* --------------------------------------------------------- the panel --- */

  var panel, panelBody, panelEra, currentMode = "money", currentEra = null;

  function renderBasket(basket, wage) {
    var wrap = el("ul", "ledger-panel__basket");
    for (var i = 0; i < basket.items.length; i++) {
      var it = basket.items[i];
      var li = el("li");
      li.appendChild(el("span", "ledger-panel__basket-label", it.label));
      var val = el("span", "ledger-panel__basket-value");
      if (it.price == null) {
        val.appendChild(el("span", "ledger-panel__na", "not priced"));
      } else {
        var a = el("span", "ledger-panel__money", money(it.price));
        var b = el("span", "ledger-panel__hours", workTime(it.price, wage));
        val.appendChild(a);
        val.appendChild(b);
      }
      li.appendChild(val);
      wrap.appendChild(li);
    }
    return wrap;
  }

  function renderEra(era) {
    panelBody.innerHTML = "";
    panelEra.textContent = era.label;

    for (var c = 0; c < era.columns.length; c++) {
      var col = era.columns[c];
      var wage = wageFor(era, col.key);
      var colBox = el("div", "ledger-panel__col");

      if (era.columns.length > 1) {
        colBox.appendChild(el("p", "ledger-panel__col-head", col.label));
      }

      var dl = el("dl", "ledger-panel__lines");
      for (var i = 0; i < reg.lines.length; i++) {
        var line = reg.lines[i];
        var cellSet = era.cells[line.id];
        if (!cellSet) { continue; }
        var cell = cellSet[col.key];
        if (!cell) { continue; }

        var dt = el("dt", "ledger-panel__label", line.label);
        if (line.group === "texture") { dt.classList.add("is-texture"); }
        var dd = el("dd", "ledger-panel__value");

        if (line.priced && cell.items) {
          dd.appendChild(renderBasket(cell, wage));
        } else {
          dd.textContent = cell.display;
          if (cell.absent) { dd.classList.add("is-absent"); }
        }
        dl.appendChild(dt);
        dl.appendChild(dd);
      }
      colBox.appendChild(dl);
      colBox.appendChild(wageNote(wage));
      panelBody.appendChild(colBox);
    }

    panel.setAttribute("data-mode", currentMode);
    if (!reduceMotion) {
      panel.classList.remove("is-turning");
      /* force reflow so the class re-applies on consecutive era changes */
      void panel.offsetWidth;
      panel.classList.add("is-turning");
    }
  }

  function wageNote(wage) {
    var p = el("p", "ledger-panel__wage");
    if (wage == null) {
      p.textContent = "No wage is pinned for this column.";
      return p;
    }
    p.textContent = (fmt.hourLead || "An hour of work") + ": " + money(wage) + ". Work-time is the price divided by that hour.";
    return p;
  }

  function buildPanel() {
    panel = el("aside", "ledger-panel");
    panel.setAttribute("aria-label", "The household ledger");
    panel.setAttribute("data-mode", currentMode);

    var head = el("div", "ledger-panel__head");
    head.appendChild(el("p", "ledger-panel__kicker", "The ledger"));
    panelEra = el("p", "ledger-panel__era", reg.eras[0].label);
    head.appendChild(panelEra);
    panel.appendChild(head);

    panelBody = el("div", "ledger-panel__body");
    panel.appendChild(panelBody);

    panel.appendChild(buildToggle());
    return panel;
  }

  /* ------------------------------------------------------- the toggle ---- */

  function buildToggle() {
    var box = el("div", "ledger-toggle");
    box.appendChild(el("p", "ledger-toggle__label", "Read prices in"));

    var group = el("div", "ledger-toggle__group");
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", "Emphasise money or work-time. Both are always shown.");

    [["money", fmt.moneyLabel || "dollars"],
     ["hours", fmt.timeLabel || "hours of work"]].forEach(function (pair) {
      var b = el("button", "ledger-toggle__btn", pair[1]);
      b.type = "button";
      b.setAttribute("data-mode", pair[0]);
      b.setAttribute("aria-pressed", String(pair[0] === currentMode));
      b.addEventListener("click", function () { setMode(pair[0]); });
      group.appendChild(b);
    });

    box.appendChild(group);
    box.appendChild(el("p", "ledger-toggle__note",
      "The toggle changes which column is emphasised. Neither column is ever hidden."));
    return box;
  }

  function setMode(mode) {
    currentMode = mode;
    document.documentElement.setAttribute("data-ledger-mode", mode);
    if (panel) { panel.setAttribute("data-mode", mode); }
    var btns = document.querySelectorAll(".ledger-toggle__btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute("aria-pressed",
        String(btns[i].getAttribute("data-mode") === mode));
    }
  }

  /* ------------------------------------------------------- the scrolly --- */

  /* Era tracking runs off scroll position rather than an IntersectionObserver.
     The rule is deterministic and therefore auditable: the live era is the last
     section whose top has passed a focus line set a third of the way down the
     viewport, and the first section until one has. */
  function bindScrolly() {
    var sections = document.querySelectorAll("[data-era]");
    if (!sections.length) { return; }

    function activate(id) {
      if (id === currentEra) { return; }
      var era = eraById(id);
      if (!era) { return; }
      currentEra = id;
      renderEra(era);
    }

    function pick() {
      var line = (window.innerHeight || 800) * 0.34;
      var chosen = sections[0];
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top <= line) { chosen = sections[i]; }
      }
      activate(chosen.getAttribute("data-era"));
    }

    var queued = false;
    function onScroll() {
      if (queued) { return; }
      queued = true;
      window.setTimeout(function () { queued = false; pick(); }, 60);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    /* Exposed so the selection rule can be exercised directly, and so a page
       that changes height under the panel can ask for a re-read. */
    W.refresh = pick;
    pick();
  }

  /* ------------------------------------------------------------ audit ---- */

  /* Every static cell in the no-JS document carries
     data-ledger-cell="<eraId>:<lineId>:<columnKey>" (or, for a basket item,
     data-ledger-price="<eraId>:<index>:<columnKey>"). This walks them and
     compares the rendered text against the register, so the document and the
     register cannot drift apart unnoticed. Findings go to the console. */
  function audit() {
    var problems = [];

    var cells = document.querySelectorAll("[data-ledger-cell]");
    for (var i = 0; i < cells.length; i++) {
      var parts = cells[i].getAttribute("data-ledger-cell").split(":");
      var era = eraById(parts[0]);
      var want = era && era.cells[parts[1]] && era.cells[parts[1]][parts[2]];
      if (!want) { problems.push("no register cell for " + parts.join(":")); continue; }
      var got = cells[i].textContent.replace(/\s+/g, " ").trim();
      var expect = String(want.display).replace(/\s+/g, " ").trim();
      if (got !== expect) {
        problems.push(parts.join(":") + " — document has “" + got +
          "”, register has “" + expect + "”");
      }
    }

    /* The priced line's id comes from the register, not from a constant. */
    var pricedLineId = null;
    for (var pl = 0; pl < reg.lines.length; pl++) {
      if (reg.lines[pl].priced) { pricedLineId = reg.lines[pl].id; }
    }

    var prices = document.querySelectorAll("[data-ledger-price]");
    for (var j = 0; j < prices.length; j++) {
      var p = prices[j].getAttribute("data-ledger-price").split(":");
      var e2 = eraById(p[0]);
      var basket = e2 && pricedLineId && e2.cells[pricedLineId] &&
        e2.cells[pricedLineId][p[2]];
      var item = basket && basket.items[Number(p[1])];
      if (!item) { problems.push("no register basket item for " + p.join(":")); continue; }
      var txt = prices[j].textContent.replace(/\s+/g, " ").trim();
      var wage = wageFor(e2, p[2]);
      var expected = item.price == null
        ? "not priced"
        : money(item.price) + " · " + workTime(item.price, wage);
      if (txt !== expected) {
        problems.push(p.join(":") + " — document has “" + txt +
          "”, register computes “" + expected + "”");
      }
    }

    /* Provenance: every src/srcs key on every cell, basket item and wage
       value must resolve to an entry in the register's sources block. */
    var keyCount = 0;
    function checkKey(key, where) {
      if (!key) { return; }
      keyCount++;
      if (!reg.sources[key]) {
        problems.push("unresolved source key “" + key + "” at " + where);
      }
    }
    for (var ei = 0; ei < reg.eras.length; ei++) {
      var era4 = reg.eras[ei];
      for (var lid in era4.cells) {
        if (!era4.cells.hasOwnProperty(lid)) { continue; }
        var colSet = era4.cells[lid];
        for (var ck in colSet) {
          if (!colSet.hasOwnProperty(ck)) { continue; }
          var c4 = colSet[ck];
          if (!c4) { continue; }
          var at = era4.id + ":" + lid + ":" + ck;
          if (c4.items) {
            for (var bi = 0; bi < c4.items.length; bi++) {
              checkKey(c4.items[bi].src, at + " item " + bi);
            }
          } else {
            checkKey(c4.src, at);
          }
          if (c4.srcs) {
            for (var si = 0; si < c4.srcs.length; si++) { checkKey(c4.srcs[si], at); }
          }
        }
      }
    }
    for (var wy in reg.wage.values) {
      if (reg.wage.values.hasOwnProperty(wy)) {
        checkKey(reg.wage.values[wy].src, "wage:" + wy);
      }
    }

    if (window.console) {
      if (problems.length) {
        console.error("Ledger register audit: " + problems.length + " mismatch(es)");
        problems.forEach(function (m) { console.error("  " + m); });
      } else {
        console.log("Ledger register audit: clean (" + cells.length + " cells, " +
          prices.length + " priced items, " + keyCount + " source keys resolve).");
      }
    }
    return problems;
  }
  W.audit = audit;

  /* ------------------------------------------------------------- start --- */

  function start() {
    var mount = document.querySelector("[data-ledger-panel]");
    if (mount) { mount.appendChild(buildPanel()); }
    setMode(currentMode);
    bindScrolly();
    /* The static tables are the no-JS document. With the panel live they stay
       in the page, one keystroke away, rather than duplicating it in flow. */
    var statics = document.querySelectorAll("[data-ledger-static]");
    for (var s = 0; s < statics.length; s++) { statics[s].removeAttribute("open"); }
    document.documentElement.setAttribute("data-ledger-enhanced", "true");
    audit();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
