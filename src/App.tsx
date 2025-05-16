import { useState, type ChangeEvent } from "react";
import "./App.css";
import { Weather } from "./Weather";

function App() {
  const [cityName, setCityName] = useState<string>("");
  const [error, setError] = useState<null | string>(null);
  const [weather, setWeather] = useState<{
    temp: number;
    description: string;
  } | null>(null);

  const apiKey = "a05bb01f6b54469a2886d75e27e4cffc";

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCityName(e.currentTarget.value);
  };

  const fetchWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod === "404") {
          setError("City not found");
		  } else {
			  console.log(json)
          setWeather({
            temp: json.main.temp,
            description: json.weather[0].description,
          });
          setError(null);
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
        setError("An error occurred");
      });
  };

  return (
	  <div>
		  <h1 className="title">Weather App</h1>
		  <div className="search">
			  <input
        type="text"
        onChange={(e) => onChangeHandler(e)}
				  value={cityName}
				  placeholder="Enter city"
      />
      <button onClick={fetchWeather}>Get weather</button></div>
		  {error && <p style={{ color: "red" }}>{error}</p>}
		  {weather && <Weather temp={weather.temp } description={weather.description } />}
    </div>
  );
}

export default App;
