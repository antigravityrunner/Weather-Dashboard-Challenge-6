// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// 37.78781, -77.60330

// fetch(
//   "http://api.openweathermap.org/data/3.0/forecast?lat=37.78781&lon=-77.60330&appid=b688d370ba81b97331bf7cfd26c725d2"
// ).then(async (res) => {
//   let forecast = await res.json();
//   console.log(forecast);
// });

function setIcon(id, icon) {
  $(id).removeClass();
  console.log(icon);
  if (icon.startsWith("01")) {
    $(id).addClass("bi bi-brightness-high");
  }

  if (icon.startsWith("02")) {
    $(id).addClass("bi bi-cloud-sun");
  }

  if (icon.startsWith("03")) {
    $(id).addClass("bi bi-cloudy");
  }

  if (icon.startsWith("04")) {
    $(id).addClass("bi bi-clouds");
  }

  if (icon.startsWith("09")) {
    $(id).addClass("bi bi-cloud-drizzle");
  }

  if (icon.startsWith("10")) {
    $(id).addClass("bi bi-cloud-rain-heavy");
  }

  if (icon.startsWith("11")) {
    $(id).addClass("bi bi-cloud-lightning-rain");
  }

  if (icon.startsWith("13")) {
    $(id).addClass("bi bi-snow");
  }

  if (icon.startsWith("50")) {
    $(id).addClass("bi bi-cloud-fog2");
  }
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function writeForecastToScreen(weatherData) {
  $("#CurrentWeather").text("Current Weather: " + weatherData.city.name);
  let day = 1;
  for (var i = 0; i < weatherData.list.length; i++) {
    let forecast = weatherData.list[i];
    let date = new Date(forecast.dt * 1000);
    if (date.getHours() == 11) {
      $("#day" + day + " .forcastDate").text(
        days[date.getDay()] + ". " + date.getDate()
      );

      $("#day" + day + " .temp-input").text(Math.round(forecast.main.temp));
      $("#day" + day + " .wind-input").text(Math.round(forecast.wind.speed));
      $("#day" + day + " .humid-input").text(
        Math.round(forecast.main.humidity)
      );

      setIcon("#day" + day + " #dayIcon", forecast.weather[0].icon);

      day++;
    }
  }
}

function writeCurrentToScreen(weatherData) {
  $("#curWeather .temp-input").text(Math.round(weatherData.main.temp));
  $("#curWeather .wind-input").text(Math.round(weatherData.wind.speed));
  $("#curWeather .humid-input").text(Math.round(weatherData.main.humidity));
  $("#curWeather #dayIcon", weatherData.weather[0].icon);
}

$(function () {
  getWeather("Richmond");

  $("#searchBtn").click(function () {
    console.log("Search Pressed");
    getWeather($("#query").val());
  });
});

function getWeather(city) {
  fetch(
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial&appid=b688d370ba81b97331bf7cfd26c725d2"
  ).then(async (res) => {
    let forecast = await res.json();
    writeForecastToScreen(forecast);
  });

  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=b688d370ba81b97331bf7cfd26c725d2"
  ).then(async (res) => {
    let forecast = await res.json();
    writeCurrentToScreen(forecast);
  });
}
