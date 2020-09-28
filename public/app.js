async function fetchResults() {
  try {
    const url = `/job-search`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": `application/json`,
      },
      body: JSON.stringify({
        description: $("#description").val(),
        fulltime: $("#fulltime").val(),
      }),
    });
    const { results } = await response.json();
    console.log(results, "results");
    renderResults(results);
  } catch (error) {
    console.error(error);
  }
}

function createResults(result) {
  const {
    title,
    type,
    created_at,
    company,
    company_url,
    location,
    description,
    how_to_apply,
    company_logo,
  } = result;

  return `
  <div class='result'>
  <h2>${title}</h2>
  <p>${description}</p>
  <p>Job type: ${type}</p>
  <p>${location}</p>
  <p>${company}</p>
  <p>${company_url}</p>
  <img src="${company_logo}" />
  <p>${created_at}</p>
  <p>${how_to_apply}</p>
  </div>
  `;
}

function renderResults(results) {
  results.forEach((result) => {
    $("#results").append(createResults(result));
  });
}

$("#job-search").on("submit", function (event) {
  event.preventDefault();

  fetchResults();
});

//cowspiration rendered pre-search
async function fetchQuote() {
  const response = await fetch("/cowspiration");
  const { cow } = await response.json();

  $("#results")
    .empty()
    .append($(`<pre>${cow}</pre>`));
}

async function fetchWeather() {
  // testing browser geolocation compatibility
  if (!navigator || !navigator.geolocation) {
    $("#weather").append($("<h3>Weather not available on this browser</h3>"));
  }

  // browser needs to get geoloation with permissions
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const {
        coords: { latitude, longitude },
      } = position;

      // request data from the API
      const response = await fetch(`/weather?lat=${latitude}&lon=${longitude}`);
      const { results } = await response.json();

      // AJAX request to grab the data and icons then append
      if (results.daily) {
        $("#weather").empty();

        results.daily.forEach((day) => {
          const {
            weather: [{ icon }],
          } = day;

          $("#weather").append(
            $(`
          <img src="http://openweathermap.org/img/wn/${icon}@2x.png" />
        `)
          );
        });
      }
    },
    // geolocation error
    async (error) => {
      const result = await navigator.permissions.query({ name: "geolocation" });
      if (result.state == "denied") {
        $("#weather").html(
          $(`<div>
            <h3>You have denied access to location services.</h3>
            <h4>If you wish to see your forecast, update your settings and refresh.</h4>
          </div>`)
        );
      }
    }
  );
}

function bootstrap() {
  fetchWeather();
  fetchQuote();
}

bootstrap();
