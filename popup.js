function updateCircle(percentage) {
    const circle = document.querySelector('.circle-progress');
    const text = document.querySelector('.circle-text');
    const gradient = document.getElementById('gradient');

    // Assuming a radius of 15.9155 for the SVG path as defined in the "d" attribute.
    const circumference = 2 * Math.PI * 15.9155;
    const offset = circumference - (percentage / 100 * circumference);

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = offset;
    text.textContent = `${percentage}%`;

    // Update the gradient based on the percentage
    updateGradientColors(gradient, percentage);
}

function updateGradientColors(gradient, percentage) {
    const stops = gradient.querySelectorAll('stop');

    if (percentage >= 66) {
        stops[0].style.stopColor = '#1f9c26';
        stops[1].style.stopColor = '#3ad542';
    }
    else if (percentage >= 33) {
        stops[0].style.stopColor = '#d2e039';
        stops[1].style.stopColor = '#dce75f';
    }
    else {
        stops[0].style.stopColor = '#d62222';
        stops[1].style.stopColor = '#de4848';
    }

}


chrome.runtime.sendMessage({action: "background"});

updateCircle(80);



