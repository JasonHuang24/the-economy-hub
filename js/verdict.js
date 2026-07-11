/* Verdict block print behavior.
 *
 * The expandable source footer is a native <details class="verdict__sources">
 * (keyboard-accessible with no script). Closed <details> don't render their
 * contents when printing, and a printed textbook should show its sources, so
 * every verdict's footer is opened before print and restored after.
 */
(function () {
  "use strict";

  var opened = [];

  window.addEventListener("beforeprint", function () {
    opened = [];
    document.querySelectorAll("details.verdict__sources").forEach(function (d) {
      if (!d.open) {
        d.open = true;
        opened.push(d);
      }
    });
  });

  window.addEventListener("afterprint", function () {
    opened.forEach(function (d) {
      d.open = false;
    });
    opened = [];
  });
})();
