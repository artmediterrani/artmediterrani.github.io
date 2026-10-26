'use strict';
const reviewForm = document.querySelector('#review-form');
if (reviewForm) {
  const text = JSON.parse(document.querySelector('#review-translations').textContent);
  const preparedReview = document.querySelector('#review-prepared');
  reviewForm.addEventListener('input', () => {
    preparedReview.hidden = true;
    document.querySelector('#review-whatsapp').removeAttribute('href');
    const selected = Number(new FormData(reviewForm).get('rating') || 0);
    reviewForm.querySelectorAll('.paella-choice').forEach(label => {
      label.classList.toggle('is-filled', Number(label.querySelector('input').value) <= selected);
    });
  });
  reviewForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!reviewForm.reportValidity()) return;
    const data = new FormData(reviewForm);
    const name = String(data.get('displayName') || '').trim();
    const comment = String(data.get('comment') || '').trim();
    if (!name || !comment) {
      reviewForm.querySelector(!name ? '#review-name' : '#review-comment').focus();
      return;
    }
    const rating = Number(data.get('rating'));
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) return;
    const message = text.subject + '\n\n' + text.ratinglabel + ': ' + '🥘'.repeat(rating) + ' (' + rating + '/5)\n' + text.namelabel + ': ' + name + '\n' + text.commentlabel + ': ' + comment + '\n\n' + text.consentmsg;
    document.querySelector('#review-preview').value = message;
    const link = document.querySelector('#review-whatsapp');
    link.href = 'https://wa.me/34697305143?text=' + encodeURIComponent(message);
    preparedReview.hidden = false;
    link.focus({preventScroll: true});
    preparedReview.scrollIntoView({behavior: 'auto', block: 'nearest'});
  });
}
