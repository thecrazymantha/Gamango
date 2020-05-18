let m = new Date();
let n = m.getDay();
let o = m.getDate();
let p = m.getHours();
  m.setDate(o + (7 - n) % 7);
  m.setHours(23,59,59);

let countDownDate = new Date(m).getTime();

let x = setInterval(function() {
  let now = new Date().getTime();
  let distance = countDownDate - now;
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("demo").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "cheh, c'est trop tard";
    document.getElementById("bouton").disabled = true; 
  }
}, 1000);