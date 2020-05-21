let end = 0
let start = 0
let diff = 0
let resetid = 0
function chronometre(){
	end = new Date()
	diff = end - start
	diff = new Date(diff)
	let msec = diff.getMilliseconds()
  let csec = (msec/10).toFixed(0);
	let sec = diff.getSeconds()
	let min = diff.getMinutes()
	if (min < 10){
		min = "0" + min
	}
  if (min > 29){
    document.getElementById("TimerDisplay").innerHTML = '30:00:00'
  }
	if (sec < 10){
		sec = "0" + sec
	}
	if(csec < 10){
		csec = "0" +csec
	}
	else if(csec < 10){
		csec = "0" +csec
	}
	document.getElementById("TimerDisplay").innerHTML = min + ":" + sec + ":" + csec
	resetid = setTimeout("chronometre()", 10)
}

function chronostart(){
  document.chronoForm.startstop.value = "stop!"
	document.chronoForm.startstop.onclick = chronoStop
	document.chronoForm.reset.onclick = chronoReset
	start = new Date()
	chronometre()
}

function chronoContinue(){
	document.chronoForm.startstop.value = "stop!"
	document.chronoForm.startstop.onclick = chronoStop
	document.chronoForm.reset.onclick = chronoReset
	start = new Date()-diff
	start = new Date(start)
	chronometre()
}

function chronoReset(){
	document.getElementById("TimerDisplay").innerHTML = "00:00:00"
	start = new Date()
}

function chronoStopReset(){
	document.getElementById("TimerDisplay").innerHTML = "00:00:00"
	document.chronoForm.startstop.onclick = chronoStart
}

function chronoStop(){
	document.chronoForm.startstop.value = "start!"
	document.chronoForm.startstop.onclick = chronoContinue
	document.chronoForm.reset.onclick = chronoStopReset
	clearTimeout(resetid)
}