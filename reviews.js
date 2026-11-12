"use strict";
// 1. Load the review form and its localised message labels.
const reviewForm = document.querySelector("#review-form");
if (reviewForm) {
  const text = JSON.parse(document.querySelector("#review-translations").textContent);
  const preparedReview = document.querySelector("#review-prepared");
  // 2. Clear a stale prepared message and update the paella rating indicators.
  reviewForm.addEventListener("input", () => {
    preparedReview.hidden = true;
    document.querySelector("#review-whatsapp").removeAttribute("href");
    const selected = Number(new FormData(reviewForm).get("rating") || 0);
    reviewForm.querySelectorAll(".paella-choice").forEach((label) => {
      label.classList.toggle("is-filled", Number(label.querySelector("input").value) <= selected);
    });
  });
  // 3. Validate the review and consent before preparing any message.
  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!reviewForm.reportValidity()) return;
    const data = new FormData(reviewForm);
    const name = String(data.get("displayName") || "").trim();
    const comment = String(data.get("comment") || "").trim();
    // Reject whitespace-only names or comments and focus the field to correct.
    if (!name || !comment) {
      reviewForm.querySelector(!name ? "#review-name" : "#review-comment").focus();
      return;
    }
    // Keep ratings within the five available choices.
    const rating = Number(data.get("rating"));
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) return;
    // Include the authorised display name, rating, comment, and consent in WhatsApp.
    const message =
      text.subject +
      "\n\n" +
      text.ratinglabel +
      ": " +
      "🥘".repeat(rating) +
      " (" +
      rating +
      "/5)\n" +
      text.namelabel +
      ": " +
      name +
      "\n" +
      text.commentlabel +
      ": " +
      comment +
      "\n\n" +
      text.consentmsg;
    document.querySelector("#review-preview").value = message;
    const link = document.querySelector("#review-whatsapp");
    link.href = "https://wa.me/34697305143?text=" + encodeURIComponent(message);
    // Show the prepared message; the visitor must confirm sending in WhatsApp.
    preparedReview.hidden = false;
    link.focus({ preventScroll: true });
    preparedReview.scrollIntoView({ behavior: "auto", block: "nearest" });
  });
}
