function updateCircle(percentage) {
    const circle = document.querySelector('.circle-progress');
    const text = document.querySelector('.circle-text');
    const gradient = document.getElementById('gradient');

    const circumference = 2 * Math.PI * 15.9155;
    const offset = circumference - (percentage / 100 * circumference);

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = offset;
    text.textContent = `${percentage}`;

    updateGradientColors(gradient, percentage);
}

function updateGradientColors(gradient, percentage) {
    const stops = gradient.querySelectorAll('stop');

    if (percentage >= 95) {
        stops[0].style.stopColor = '#00cccc';
        stops[1].style.stopColor = '#00ffff';
    }
    else if (percentage >= 90) {
        stops[0].style.stopColor = '#00cdab';
        stops[1].style.stopColor = '#00ffd5';
    }
    else if (percentage >= 85) {
        stops[0].style.stopColor = '#00cd78';
        stops[1].style.stopColor = '#00ff96';
    }
    else if (percentage >= 80) {
        stops[0].style.stopColor = '#00b369';
        stops[1].style.stopColor = '#00e687';
    }
    else if (percentage >= 75) {
        stops[0].style.stopColor = '#1fc71f';
        stops[1].style.stopColor = '#47e038';
    }
    else if (percentage >= 70) {
        stops[0].style.stopColor = '#49c71f';
        stops[1].style.stopColor = '#51dd22';
    }
    else if (percentage >= 65) {
        stops[0].style.stopColor = '#73c71f';
        stops[1].style.stopColor = '#8de038';
    }
    else if (percentage >= 60) {
        stops[0].style.stopColor = '#9ec71f';
        stops[1].style.stopColor = '#b7e038';
    }
    else if (percentage >= 55) {
        stops[0].style.stopColor = '#c7c61f';
        stops[1].style.stopColor = '#e0e038';
    }
    else if (percentage >= 50) {
        stops[0].style.stopColor = '#ddad22';
        stops[1].style.stopColor = '#e0b538';
    }
    else if (percentage >= 45) {
        stops[0].style.stopColor = '#c7801f';
        stops[1].style.stopColor = '#e09938';
    }
    else if (percentage >= 40) {
        stops[0].style.stopColor = '#dd6f22';
        stops[1].style.stopColor = '#e48c4e';
    }
    else if (percentage >= 35) {
        stops[0].style.stopColor = '#c7561f';
        stops[1].style.stopColor = '#e06f38';
    }
    else if (percentage >= 30) {
        stops[0].style.stopColor = '#dd4022';
        stops[1].style.stopColor = '#e4664e';
    }
    else if (percentage >= 20) {
        stops[0].style.stopColor = '#dd2223';
        stops[1].style.stopColor = '#e44e4f';
    }
    else if (percentage >= 10) {
        stops[0].style.stopColor = '#9b1818';
        stops[1].style.stopColor = '#c71e1f';
    }
    else {
        stops[0].style.stopColor = '#590e0e';
        stops[1].style.stopColor = '#851414';
    }
}

function updateBar(id, value) {
    // TODO: add color; ideally we use the same color variables as in updateGradientColors
    // TODO: add values when you hover or something
const bar = document.getElementById(id);
bar.style.width = value + '%';
}

function updateInfoBarGradient(barId, percentage2) {
    var percentage = 100 - percentage2;
    var startColor, endColor;

    if (percentage >= 95) {
        startColor = '#00cccc';
        endColor = '#00ffff';
    }
    else if (percentage >= 90) {
        startColor = '#00cdab';
        endColor = '#00ffd5';
    }
    else if (percentage >= 85) {
        startColor = '#00cd78';
        endColor = '#00ff96';
    }
    else if (percentage >= 80) {
        startColor = '#00b369';
        endColor = '#00e687';
    }
    else if (percentage >= 75) {
        startColor = '#1fc71f';
        endColor = '#47e038';
    }
    else if (percentage >= 70) {
        startColor = '#49c71f';
        endColor = '#51dd22';
    }
    else if (percentage >= 65) {
        startColor = '#73c71f';
        endColor = '#8de038';
    }
    else if (percentage >= 60) {
        startColor = '#9ec71f';
        endColor = '#b7e038';
    }
    else if (percentage >= 55) {
        startColor = '#c7c61f';
        endColor = '#e0e038';
    }
    else if (percentage >= 50) {
        startColor = '#ddad22';
        endColor = '#e0b538';
    }
    else if (percentage >= 45) {
        startColor = '#c7801f';
        endColor = '#e09938';
    }
    else if (percentage >= 40) {
        startColor = '#dd6f22';
        endColor = '#e48c4e';
    }
    else if (percentage >= 35) {
        startColor = '#c7561f';
        endColor = '#e06f38';
    }
    else if (percentage >= 30) {
        startColor = '#dd4022';
        endColor = '#e4664e';
    }
    else if (percentage >= 20) {
        startColor = '#dd2223';
        endColor = '#e44e4f';
    }
    else if (percentage >= 10) {
        startColor = '#9b1818';
        endColor = '#c71e1f';
    }
    else {
        startColor = '#590e0e';
        endColor = '#851414';
    }

    var infoBar = document.getElementById(barId);
    if (infoBar) {
      infoBar.style.background = `linear-gradient(to right, ${startColor}, ${endColor})`;
    }
  }
  

function calculate_updates(co2_pred, energy_pred, water_pred, waste_pred) {

    let log_co2 = Math.log10(co2_pred);
    let log_energy = Math.log10(energy_pred);
    let log_water = Math.log10(water_pred);
    let log_waste = Math.log10(waste_pred);

    const co2_log_mean = 1.226684272;
    const energy_log_mean = 2.440005955;
    const water_log_mean = 2.71419296;
    const waste_log_mean = -0.3910466762;
    const co2_log_sd = 0.2516036864;
    const energy_log_sd = 0.3137632172;
    const water_log_sd = 1.279850314;
    const waste_log_sd = 0.3037760121;

    let dist_co2 = (log_co2 - co2_log_mean) / co2_log_sd;
    let dist_energy = (log_energy - energy_log_mean) / energy_log_sd;
    let dist_water = (log_water - water_log_mean) / water_log_sd;
    let dist_waste = (log_waste - waste_log_mean) / waste_log_sd;

    let co2_final = 100 * Math.min(Math.max(0.01, 0.5 - 0.3 * dist_co2), 1);
    let energy_final = 100 * Math.min(Math.max(0.01, 0.5 - 0.3 * dist_energy), 1);
    let water_final = 100 * Math.min(Math.max(0.01, 0.5 - 0.3 * dist_water), 1);
    let waste_final = 100 * Math.min(Math.max(0.01, 0.5 - 0.3 * dist_waste), 1);

    console.log(water_final);

    final_score = Math.round((0.25*co2_final + 0.15*energy_final + 0.5*water_final + 0.1*waste_final));

    co2_final = 100 - co2_final;
    energy_final = 100 - energy_final;
    water_final = 100 - water_final;
    waste_final = 100 - waste_final;

    updateBar('water-fill', water_final);
    updateBar('co2-fill', co2_final);
    updateBar('energy-fill', energy_final);
    updateBar('waste-fill', waste_final);

    updateInfoBarGradient('water-fill', water_final);
    updateInfoBarGradient('co2-fill', co2_final);
    updateInfoBarGradient('energy-fill', energy_final);
    updateInfoBarGradient('waste-fill', waste_final);

    updateCircle(final_score);
}
  




chrome.runtime.sendMessage({action: "background"});

chrome.runtime.onMessage.addListener(async(message) => {
    if (message.action === "request") {
        console.log(message.html);
        let response = await fetch('http://localhost:8000/request_eval', {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                page_data: message.html
            })
        });
        

        let data = await response.json();

        if (data.output === "error") {
            console.log("ERROR")
            return
        }
        // data = [59.42028986, 1023.07009, 58460.06815, 0.9760425909]
        let [co2_pred, energy_pred, water_pred, waste_pred] = data.output
        
        
        calculate_updates(co2_pred, energy_pred, water_pred, waste_pred);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var myButton = document.getElementById('calculate');
    myButton.addEventListener('click', function() {
      // Call your function here
      console.log("WHATS UP");
    });
  });








