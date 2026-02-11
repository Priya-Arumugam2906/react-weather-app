import { useState } from "react";
import "./App.css";
import searchIcon from "./assets/search.png";
import clearIcon from "./assets/sun.png";
import cloudIcon from "./assets/clouds.png";
import drizzleIcon from "./assets/rain.png";
import rainIcon from "./assets/storm.png";
import windIcon from "./assets/wind.png";
import snowIcon from "./assets/snowflake.png";
import humidityIcon from "./assets/humidity.png";

const WeatherDetails = ({
  icon,
  temp,
  city,
  country,
  lat,
  log,
  humidity,
  wind,
}) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="Image" />
      </div>
      <div className="temp">{temp} &deg;C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude </span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">Longitude </span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="wind" className="icon" />
          <div className="data">
            <div className="wind-percent">{wind}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  const [icon, setIcon] = useState(snowIcon);
  const [count, setCount] = useState(0);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Chennai");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [text, setText] = useState("Chennai");
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(icon);
  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  let api_url = "875b00f6c3a1d0565bb380b8a6a50dd4";
  const search = async () => {
    if (!text) return;

    setLoading(true);
    setCityNotFound(false);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_url}&units=metric`;

    try {
      let response = await fetch(url);

      if (!response.ok) {
        setCityNotFound(true);
        return;
      }

      let data = await response.json();

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);

      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            className="cityInput"
            placeholder="Search City"
            value={text}
            onChange={handleCity}
            onKeyDown={handleKeyDown}
          />
          <div className="search-icon" onClick={() => search()}>
            <img src={searchIcon} alt="search" className="searchSizeReducer" />
          </div>
        </div>
        

        <WeatherDetails
          icon={icon}
          temp={temp}
          city={city}
          country={country}
          lat={lat}
          log={log}
          humidity={humidity}
          wind={wind}
        />
      </div>
    </>
  );
}

export default App;
