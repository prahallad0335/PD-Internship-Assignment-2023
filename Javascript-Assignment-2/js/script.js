const apiKey = 'fa851ab80f4fa215e2190e039f146a2a'; // Replace with your API key

document.getElementById('get-forecast').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    if (location) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.main && data.weather[0]) {
                    document.getElementById('location-name').textContent = data.name;
                    document.getElementById('temperature').textContent = `${(data.main.temp - 273.15).toFixed(2)}°C / ${(((data.main.temp-273.15)*1.8)+32).toFixed(2)}°F`;
                    document.getElementById('weather-icon').src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                    document.getElementById('description').textContent=data.weather[0].description
                    document.getElementById('error-message').classList.add('hidden');
                    document.querySelector('.weather-info').style.display = 'block';
                } else {
                    showError();
                }
            })
            .catch(() => {
                showError();
            });
    } else {
        showError();
    }
});

function showError() {
    document.getElementById('error-message').classList.remove('hidden');
    document.querySelector('.weather-info').style.display = 'none';
}