function updateCircle(percentage) {
    const circle = document.querySelector('.circle-progress');
    const text = document.querySelector('.circle-text');
    const gradient = document.getElementById('gradient');

    // Assuming a radius of 15.9155 for the SVG path as defined in the "d" attribute.
    const circumference = 2 * Math.PI * 15.9155;
    const offset = circumference - (percentage / 100 * circumference);

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = offset;
    text.textContent = `${percentage}`;

    // Update the gradient based on the percentage
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


chrome.runtime.sendMessage({action: "background"});

updateCircle(20);



