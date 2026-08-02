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
 *      to a data surface): displayed value strings, basket arithmetic, the
 *      completeness of the document against the register in both directions
 *      (a register cell with no static element is drift too), the resolution
 *      of every provenance key, the per-era texture log — presence AND a
 *      non-empty reason — against what each era actually renders, and the
 *      agreement of every static row header's deep link with the register's
 *      line home.
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

      /* Since the standardisation amendment every line prints on every panel,
         so the panel is grouped: one band per section, in the register's own
         band order, and the SAME order on the static tables and the century
         matrix. A heading is not valid inside a <dl>, so each band gets its
         own section with its own list. */
      var bands = reg.groups || [{ id: null, label: "" }];
      for (var b = 0; b < bands.length; b++) {
        var band = bands[b];
        var dl = el("dl", "ledger-panel__lines");
        var printed = 0;

        for (var i = 0; i < reg.lines.length; i++) {
          var line = reg.lines[i];
          if (band.id && line.band !== band.id) { continue; }
          var cellSet = era.cells[line.id];
          if (!cellSet) { continue; }
          var cell = cellSet[col.key];
          if (!cell) { continue; }

          /* A line with a canonical home in the register becomes a deep link into
             that chapter (CHARTER §PURPOSE 1). A line the wiring map gives no
             home keeps its plain label. The VALUE cell is never touched: the
             register audit compares displayed value text, and a label link
             cannot move it. */
          var dt = el("dt", "ledger-panel__label");
          if (line.href) {
            var a = el("a", "ledger-panel__label-link", line.label);
            a.setAttribute("href", line.href);
            dt.appendChild(a);
          } else {
            dt.textContent = line.label;
          }
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
          printed++;
        }

        if (!printed) { continue; }
        var bandBox = el("section", "ledger-panel__band");
        if (band.label) {
          bandBox.appendChild(el("h3", "ledger-panel__band-head", band.label));
        }
        bandBox.appendChild(dl);
        colBox.appendChild(bandBox);
      }
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
     register cannot drift apart unnoticed — in either direction: a document
     cell the register does not hold is flagged, and a register cell or basket
     item with no static element in the document is flagged too, because a
     whole row silently omitted is drift as much as a wrong digit is.
     Findings go to the console. */
  function audit() {
    var problems = [];

    var foundCells = {}, foundPrices = {};

    var cells = document.querySelectorAll("[data-ledger-cell]");
    for (var i = 0; i < cells.length; i++) {
      foundCells[cells[i].getAttribute("data-ledger-cell")] = true;
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
      foundPrices[prices[j].getAttribute("data-ledger-price")] = true;
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

    /* Completeness: every register cell and basket item must have a static
       element in the document. The loops above walk what the document has;
       this walks what the register expects, so a silently omitted row cannot
       return a clean audit. */
    for (var ce = 0; ce < reg.eras.length; ce++) {
      var era6 = reg.eras[ce];
      for (var lid6 in era6.cells) {
        if (!era6.cells.hasOwnProperty(lid6)) { continue; }
        var set6 = era6.cells[lid6];
        for (var ck6 in set6) {
          if (!set6.hasOwnProperty(ck6) || !set6[ck6]) { continue; }
          if (lid6 === pricedLineId) {
            var items6 = set6[ck6].items || [];
            for (var bi6 = 0; bi6 < items6.length; bi6++) {
              if (!foundPrices[era6.id + ":" + bi6 + ":" + ck6]) {
                problems.push("register basket item " + era6.id + ":" + bi6 +
                  ":" + ck6 + " has no static element in the document");
              }
            }
          } else if (!foundCells[era6.id + ":" + lid6 + ":" + ck6]) {
            problems.push("register cell " + era6.id + ":" + lid6 + ":" + ck6 +
              " has no static element in the document");
          }
        }
      }
    }

    /* The century matrix is a data surface like any other: every cell in it
       must carry the register's own short form for that line and era, and no
       line-era slot may be missing from it. */
    var matrixNodes = document.querySelectorAll("[data-ledger-short]");
    var foundShorts = {}, matrixCount = 0;
    for (var mx = 0; mx < matrixNodes.length; mx++) {
      matrixCount++;
      var mkey = matrixNodes[mx].getAttribute("data-ledger-short");
      foundShorts[mkey] = true;
      var mp = mkey.split(":");
      var mera = null;
      for (var mi = 0; mi < reg.eras.length; mi++) {
        if (reg.eras[mi].id === mp[0]) { mera = reg.eras[mi]; }
      }
      var mwant = mera && mera.cells[mp[1]] && mera.cells[mp[1]][mp[2]];
      if (!mwant) { problems.push("no register cell for matrix " + mkey); continue; }
      var mgot = matrixNodes[mx].textContent.replace(/\s+/g, " ").trim();
      var mexp = String(mwant.short).replace(/\s+/g, " ").trim();
      if (mgot !== mexp) {
        problems.push("matrix " + mkey + " — document “" + mgot + "” vs register “" + mexp + "”");
      }
    }
    for (var em = 0; em < reg.eras.length; em++) {
      for (var lm = 0; lm < reg.lines.length; lm++) {
        if (reg.lines[lm].priced) { continue; }
        for (var cm = 0; cm < reg.eras[em].columns.length; cm++) {
          var mk = reg.eras[em].id + ":" + reg.lines[lm].id + ":" + reg.eras[em].columns[cm].key;
          if (!foundShorts[mk]) { problems.push("matrix has no cell for " + mk); }
        }
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

    /* THE STANDARDISATION AMENDMENT (2026-08-02) moved this check. Every line
       now carries a cell on every panel, so displaying a texture line is no
       longer an editorial choice and the cap no longer bounds what is shown.
       What the writer still chooses is which lines are DRAWN OUT into a prose
       block, and that is what the charter's 3-to-6 now bounds. So: every
       logged pick must be a texture line that has a cell, every pick must
       carry its reason, and each era must log between 3 and 6 of them. */
    var textureIds = {}, lineHref = {}, textureCount = 0;
    for (var li = 0; li < reg.lines.length; li++) {
      if (reg.lines[li].group === "texture") { textureIds[reg.lines[li].id] = true; }
      if (reg.lines[li].href) { lineHref[reg.lines[li].id] = reg.lines[li].href; }
    }
    for (var ex = 0; ex < reg.eras.length; ex++) {
      var era5 = reg.eras[ex];
      var picks = era5.texture || [];
      for (var tx = 0; tx < picks.length; tx++) {
        if (!picks[tx].reason || !String(picks[tx].reason).replace(/\s+/g, "")) {
          problems.push("era " + era5.id + " logs texture pick “" +
            picks[tx].lineId + "” without a reason");
        }
        if (!textureIds[picks[tx].lineId]) {
          problems.push("era " + era5.id + " draws out “" + picks[tx].lineId +
            "”, which is not a texture line");
        } else if (!era5.cells[picks[tx].lineId]) {
          problems.push("era " + era5.id + " draws out “" + picks[tx].lineId +
            "”, for which it has no cell");
        }
      }
      if (picks.length < 3 || picks.length > 6) {
        problems.push("era " + era5.id + " draws out " + picks.length +
          " texture lines; the charter allows 3 to 6");
      }
      textureCount += picks.length;
    }

    /* No line may be omitted from any panel any more: a gap is printed, never
       left blank. Every line needs a cell in every column of every era, and
       every non-priced cell needs a short form for the century matrix whose
       every numeral appears in the display string it abbreviates — so the
       matrix cannot introduce a digit the panel does not carry. */
    var shortCount = 0;
    for (var ez = 0; ez < reg.eras.length; ez++) {
      var era6 = reg.eras[ez];
      for (var lz = 0; lz < reg.lines.length; lz++) {
        var line6 = reg.lines[lz];
        for (var cz = 0; cz < era6.columns.length; cz++) {
          var key6 = era6.columns[cz].key;
          var cell6 = era6.cells[line6.id] && era6.cells[line6.id][key6];
          if (!cell6) {
            problems.push("era " + era6.id + " omits line “" + line6.id +
              "” in column " + key6);
            continue;
          }
          if (line6.priced) { continue; }
          if (!cell6.short) {
            problems.push("era " + era6.id + ":" + line6.id + ":" + key6 +
              " has no short form for the matrix");
            continue;
          }
          shortCount++;
          var nums = String(cell6.short).match(/[\d][\d,.\-]*/g) || [];
          for (var nz = 0; nz < nums.length; nz++) {
            var tok = nums[nz].replace(/[.,]$/, "");
            if (String(cell6.display).indexOf(tok) < 0) {
              problems.push("era " + era6.id + ":" + line6.id + ":" + key6 +
                " short form carries “" + tok + "”, which its display does not");
            }
          }
        }
      }
    }

    /* Every rendered deep link must point at a line the register gives a home,
       and every static row header carrying a link must agree with it. */
    var heads = document.querySelectorAll("[data-ledger-line]");
    var linkCount = 0;
    for (var hx = 0; hx < heads.length; hx++) {
      var lineId = heads[hx].getAttribute("data-ledger-line");
      var anchor = heads[hx].querySelector("a");
      var want = lineHref[lineId] || null;
      var got = anchor ? anchor.getAttribute("href") : null;
      if (want !== got) {
        problems.push("row header for “" + lineId + "” links to " +
          (got || "nothing") + ", register says " + (want || "nothing"));
      }
      if (got) { linkCount++; }
    }

    if (window.console) {
      if (problems.length) {
        console.error("Ledger register audit: " + problems.length + " mismatch(es)");
        problems.forEach(function (m) { console.error("  " + m); });
      } else {
        console.log("Ledger register audit: clean (" + cells.length + " cells, " +
          prices.length + " priced items, " + matrixCount + " matrix cells, " +
          keyCount + " source keys resolve, " +
          textureCount + " texture picks logged, " + shortCount + " short forms hold, " +
          linkCount + " row-header links agree).");
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
