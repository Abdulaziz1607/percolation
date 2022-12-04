const btn_play = document.querySelector("#play");
const btn_stop = document.querySelector("#stop");
const btn_reset = document.querySelector("#reset");
var slider = document.getElementById("myRange");

console.log(slider.value)
simu = new Simulation(slider.value)
document.getElementById("proba_vac").innerHTML = slider.value
simu.setup()


slider.oninput = function() {
    simu.setproba(slider.value)
    simu.setup()
    document.getElementById("proba_vac").innerHTML = slider.value


  }

btn_play.addEventListener("click", function () {

    simu.setstop(false)
    simu.startSimu_display()
});

btn_stop.addEventListener("click", function () {
    simu.setstop(true)
});

btn_reset.addEventListener("click", function () {
    simu.setup()
});