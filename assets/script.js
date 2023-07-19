// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// 37.78781, -77.60330

// fetch(
//   "http://api.openweathermap.org/data/3.0/forecast?lat=37.78781&lon=-77.60330&appid=b688d370ba81b97331bf7cfd26c725d2"
// ).then(async (res) => {
//   let forecast = await res.json();
//   console.log(forecast);
// });

function writeForecastToScreen(weatherData) {
  for (var i = 0; i < weatherData.list.length; i++) {
    let forecast = weatherData.list[i];
    let date = new Date(forecast.dt * 1000);
    if (date.getHours() == 11) {
      console.log(forecast);
    }
  }
}

$(function () {
  fetch(
    "http://api.openweathermap.org/data/2.5/forecast?q=richmond&appid=b688d370ba81b97331bf7cfd26c725d2"
  ).then(async (res) => {
    let forecast = await res.json();
    writeForecastToScreen(forecast);
  });
});
