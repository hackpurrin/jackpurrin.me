const f = document.getElementById('form');
const q = document.getElementById('query');
const google = 'https://www.google.com/search?q=';
const stanford = 'https://www.stanford.edu/search/?q=url'

function submitted(event) {
  event.preventDefault();
  const gurl = google + '+' + q.value;
  const surl = stanford + '+' + q.value;
  const gwin = window.open(gurl, '_blank');
  const swin = window.open(surl, '_blank');
  win.focus();
}

f.addEventListener('submit', submitted);
