import { useState, useEffect } from "react";

function Input({ value, placeholder, onChange, onKeyDown }) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="border rounded-2xl w-3xs p-2 mt-10"
      onKeyDown={onKeyDown}
    />
  );
}

function App() {
  const [value, setValue] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const apiKey = "17d5b6e184808b79be4d9674201057ae";

  async function getWeather(city) {
    if (!city) {
      setError("please enter a city");
      return;
    }
    try {
      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Network error: ${response.status} `);
      }

      const data = await response.json();

      setWeather(data);

      console.log(data);
    } catch (error) {
      console.error("Something went wrong", error);
      setError("Failed to fetch weather data.");
    }
  }
  useEffect(() => {
    getWeather("Delhi");
  }, []);

  return (
    <>
      <div className="flex  flex-col items-center">
        <h1 className="font-bold text-4xl mt-10">Weather App</h1>
        <div>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getWeather(value);
              }
            }}
            placeholder="Enter the state"
          />
          <button
            onClick={() => getWeather(value)}
            className="ml-3 bg-blue-600 hover:bg-blue-800 p-2 rounded-2xl text-white"
          >
            Get Weather
          </button>
        </div>
      </div>
      {weather && (
        <div className="mt-6 p-4 border rounded-2xl text-center max-w-xl w-full">
          <h2 className="text-2xl font-bold">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-lg">{weather.weather[0].description}</p>
          <p className="text-lg">🌡️ {weather.main.temp} °C</p>
        </div>
      )}

      {error && (
        <p className="text-red-500 mt-3 mr-10 text-center uppercase">{error}</p>
      )}
    </>
  );
}

export default App;
