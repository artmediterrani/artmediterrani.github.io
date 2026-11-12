"use strict";

// 1. Open credited gallery photographs in the shared dialog.
const viewer = document.querySelector(".gallery-viewer");
if (viewer && typeof viewer.showModal === "function") {
  // Close the dialog using native focus restoration.
  const closeViewer = () => viewer.close();
  document.querySelectorAll(".gallery-photo").forEach((link) => {
    link.addEventListener("click", (event) => {
      // Preserve modified clicks so visitors can open the original photograph.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      // Copy the selected photograph and credit into the dialog.
      event.preventDefault();
      viewer.querySelector("img").src = link.href;
      viewer.querySelector("img").alt = link.querySelector("img").alt;
      viewer.querySelector("figcaption").textContent = link
        .closest("figure")
        .querySelector("figcaption").textContent;
      viewer.showModal();
    });
  });
  // Support the close control and clicks outside the photograph.
  viewer.querySelector("button").addEventListener("click", closeViewer);
  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) closeViewer();
  });
}

// 2. Prepare the quotation message; visitors confirm sending in their chosen app.
const form = document.querySelector("#quote-form");
if (form) {
  const t = JSON.parse(document.querySelector("#translations").textContent);
  // Validate the form and prepare email and WhatsApp links.
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const keys = ["name", "email", "date", "location", "guests", "service", "message"];
    const message =
      t.subject +
      "\n\n" +
      keys.map((key, i) => t.labels[i] + ": " + (data.get(key) || "—")).join("\n");
    document.querySelector("#message-preview").value = message;
    document.querySelector("#send-email").href =
      "mailto:robertolorente98@gmail.com?subject=" +
      encodeURIComponent(t.subject) +
      "&body=" +
      encodeURIComponent(message);
    document.querySelector("#send-whatsapp").href =
      "https://wa.me/34697305143?text=" + encodeURIComponent(message);
    document.querySelector("#prepared").hidden = false;
    document.querySelector("#prepared").scrollIntoView({ behavior: "auto", block: "nearest" });
    document.querySelector("#send-email").focus({ preventScroll: true });
  });
  // Copy the message, or select the text if clipboard access fails.
  document.querySelector("#copy").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(document.querySelector("#message-preview").value);
      document.querySelector("#copy-status").textContent = t.copied;
    } catch {
      document.querySelector("#message-preview").select();
      document.querySelector("#copy-status").textContent = t.copyfail;
    }
  });
  // Hide the prepared message after any form edit.
  form.addEventListener("input", () => {
    document.querySelector("#prepared").hidden = true;
    document.querySelector("#copy-status").textContent = "";
  });
}
