/* Convert GitHub-style alerts (> [!NOTE]) into styled divs so they render on Jekyll/GitHub Pages.
   This runs on DOMContentLoaded and transforms blockquotes that start with [!TYPE]. */
(function () {
  function parseAlertType(text) {
    // Normalize and extract within [!TYPE]
    const m = text.match(/^\s*\[!([A-Z]+)\]\s*(.*)$/);
    if (!m) return null;
    const type = m[1];
    const rest = m[2] || "";
    switch (type) {
      case "NOTE": return { cls: "alert-note", title: "Note", rest };
      case "TIP": return { cls: "alert-tip", title: "Tip", rest };
      case "IMPORTANT": return { cls: "alert-important", title: "Important", rest };
      case "WARNING": return { cls: "alert-warning", title: "Warning", rest };
      case "CAUTION": return { cls: "alert-caution", title: "Caution", rest };
      default: return null;
    }
  }

  function transformBlockquote(bq) {
    // First child paragraph typically contains the [!TYPE]
    const firstP = bq.querySelector(":scope > p");
    const firstNode = firstP || bq.firstChild;
    if (!firstNode) return false;

    const leadingText = (firstP ? firstP.textContent : bq.textContent) || "";
    const info = parseAlertType(leadingText);
    if (!info) return false;

    // Build new alert container
    const alert = document.createElement("div");
    alert.className = `alert ${info.cls}`;

    const titleEl = document.createElement("div");
    titleEl.className = "alert-title";
    // If rest content follows [!TYPE] on first line, append after pseudo title
    if (info.rest && info.rest.trim()) {
      const span = document.createElement("span");
      span.textContent = ` ${info.rest.trim()}`; // leading space after label
      titleEl.appendChild(span);
    }
    alert.appendChild(titleEl);

    // Move remaining content from blockquote into alert
    // Remove the [!TYPE] token from the original first paragraph
    if (firstP) {
      const newFirst = firstP.cloneNode(true);
      const text = newFirst.textContent || "";
      const withoutToken = text.replace(/^\s*\[![A-Z]+\]\s*/, "");
      newFirst.textContent = withoutToken.trim();
      if (newFirst.textContent) {
        alert.appendChild(newFirst);
      }
      // Append siblings
      let sib = firstP.nextSibling;
      while (sib) {
        const next = sib.nextSibling;
        alert.appendChild(sib);
        sib = next;
      }
    } else {
      // Fallback: copy all children, then clear bq
      while (bq.firstChild) alert.appendChild(bq.firstChild);
      // Remove the token at the start of first text node if present
      const first = alert.firstChild;
      if (first && first.nodeType === Node.TEXT_NODE) {
        first.textContent = first.textContent.replace(/^\s*\[![A-Z]+\]\s*/, "");
      }
    }

    // Replace blockquote
    bq.replaceWith(alert);
    return true;
  }

  function run() {
    const bqs = document.querySelectorAll("blockquote");
    bqs.forEach(transformBlockquote);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
