const apiKey = "4ec34a8918585571a7c02be74c81ec7b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(cityName) {
    try {
        const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        console.log(data); // Debugging output

        document.querySelector(".cityname").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        // Ensure correct weather condition mapping
        const weatherCondition = data.weather[0].main.toLowerCase();

        switch (weatherCondition) {
            case "clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "snow":
                weatherIcon.src = "images/snow.png";
                break;
            case "drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            case "mist":
                weatherIcon.src = "images/mist.png";
                break;
            default:
                weatherIcon.src = "images/default.png"; // Fallback image
                break;
        }

        // Add animation effect
        weatherIcon.classList.add("fade-in");
        setTimeout(() => weatherIcon.classList.remove("fade-in"), 1000);

    } catch (error) {
        alert("City not found. Please enter a valid city name.");
        console.error(error);
    }
}

// Search button click event
searchBtn.addEventListener("click", () => {
    const cityName = searchBox.value.trim();
    if (cityName) {
        checkWeather(cityName);
    } else {
        alert("Please enter a city name.");
    }
});

// Optional: Handle "Enter" key press
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});
