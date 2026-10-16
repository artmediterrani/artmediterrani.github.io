'use strict';
const form = document.querySelector('#quote-form');
if (form) {
  const t = JSON.parse(document.querySelector('#translations').textContent);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const keys = ['name', 'email', 'date', 'location', 'guests', 'service', 'message'];
    const message = t.subject + '\n\n' + keys.map((key, i) => t.labels[i] + ': ' + (data.get(key) || '—')).join('\n');
    document.querySelector('#message-preview').value = message;
    document.querySelector('#send-email').href = 'mailto:robertolorente98@gmail.com?subject=' + encodeURIComponent(t.subject) + '&body=' + encodeURIComponent(message);
    document.querySelector('#send-whatsapp').href = 'https://wa.me/34697305143?text=' + encodeURIComponent(message);
    document.querySelector('#prepared').hidden = false;
    document.querySelector('#prepared').scrollIntoView({behavior: 'auto', block: 'nearest'});
    document.querySelector('#send-email').focus({preventScroll: true});
  });
  document.querySelector('#copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(document.querySelector('#message-preview').value);
      document.querySelector('#copy-status').textContent = t.copied;
    } catch {
      document.querySelector('#message-preview').select();
      document.querySelector('#copy-status').textContent = t.copyfail;
    }
  });
  form.addEventListener('input', () => {
    document.querySelector('#prepared').hidden = true;
    document.querySelector('#copy-status').textContent = '';
  });
}
