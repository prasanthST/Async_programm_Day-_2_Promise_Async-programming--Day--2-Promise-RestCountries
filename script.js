  const contanier = document.getElementById("contries_container");

  fetch("https://restcountries.com/v3.1/all")
  .then(response => response.json())
  .then(countries =>{
    countries.forEach(country => {
        const Card = countryCard(country)
        contanier.appendChild(Card)
    });
  })
  .catch(error => console.error("Error accures when data is fetch " , error ))

  function countryCard(country) {

    const col = document.createElement("div")
    col.className = "col-lg-4 col-sm-12 mb-4 "

   const card = document.createElement("div")
   col.className = "card text-center"

   const countryname = document.createElement("h5")
   countryname.className ="card-title mt-2"
   countryname.innerHTML =`${country.name.common}`

   const header = document.createElement("div")
   header.className = "image-container"
   header.innerHTML = `<img src="${country.flags.png}" alt="Flag of ${country.name.common}" style="height:150px;">`;
   
  const cardbody = document.createElement("div")
  cardbody.className = "card-body "
  cardbody.innerHTML = `
  <P className="card-text">Capital: ${country.capital ? country.capital[0] : "N/A"}<p>
  <P className="card-text">Region: ${country.region}<p>
  <p class="card-text">Lat , Lng: ${country.latlng.join(', ')}</p>
  <p class="card-text">Country code: ${country.cca2}</p>
  ` ;

  const weatherButton = document.createElement("button")
  weatherButton.className = 'btn btn-primary mb-3 align-item-center'
  weatherButton.innerHTML = "Click for Weather"
  weatherButton.onclick =()=> fetchWeather(country.capital ? country.capital : " ")

  card.appendChild(countryname)
  card.appendChild(header);
  card.appendChild(cardbody);
  card.appendChild(weatherButton)
  col.appendChild(card);

  return col
  }

  // weather 
  function fetchWeather(city) {
    const ApiKey = "acf05487f10243970858e251ae2cd1b4";

    if (!city) {
        alert("No capital city available for Weather data");
        return;
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`;

    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Weather data not found");
            }
            return response.json();
        })
        .then(data => {
            const temp = data.main.temp;
            const weatherdesc = data.weather[0].description;
            const humidity = data.main.humidity;

            const weatherInfo = `
                <p>Temperature: ${temp} °C</p>
                <p>Weather: ${weatherdesc}</p>
                <p>Humidity: ${humidity}%</p>
            `;

            document.getElementById('modalBody').innerHTML = weatherInfo;

            const weatherModal = new bootstrap.Modal(document.getElementById('weatherModal'));
            weatherModal.show();
        })
        .catch(error => {
            console.error("Error fetching data", error);
            alert("Error fetching weather data. Please try again.");
        });
}