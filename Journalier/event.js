/*
let n = new Date();
  let jour = n.getDate();
    if (jour < 10){
      jour = '0' + jour;
      }
  let mois = n.getMonth()+1;
    if (mois < 10){
      mois = '0' + mois;
      }
  let année = n.getFullYear();

let countDownDate = new Date(année+'-'+mois+'-'+jour+'T23:59:59').getTime();

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
*/