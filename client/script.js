function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }
//fetch("http://localhost:4000/weather?city=${city}")

   fetch(`http://localhost:4000/weather?city=${city}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${data.error}</p>`;
      } else {
        const weather = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
          <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
          <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        `;
        document.getElementById("weatherResult").innerHTML = weather;
      }
    })
    .catch(error => {
      document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}
