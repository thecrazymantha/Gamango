const m = new Date();
const n = m.getDay();
const o = m.getDate();
const p = m.getHours();
m.setDate(o + (7 - n) % 7);
m.setHours(23, 59, 59);

const countDownDate = new Date(m).getTime();

const x = setInterval(function() {
  const now = new Date().getTime();
  const distance = countDownDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById('demo').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s `;
  if (distance < 0) {
    clearInterval(x);
    document.getElementById('demo').innerHTML = "cheh, c'est trop tard";
    document.getElementById('bouton').disabled = true;
  }
}, 1000);
