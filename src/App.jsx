import { useEffect, useRef, useState } from "react";
import searchIcon from "../src/imgSrc/searchIcon.png";
import windSpeed from "../src/imgSrc/wind-icon.png";
import humidity from "../src/imgSrc/weather-icon.png";
import "./App.css";
import axios from "axios";

function App() {
  const [weatherData, setWeatherData] = useState(false);
  const [error, setError] = useState(false);
  const [input, setInput] = useState(false)
  const inputRef = useRef();

  const search = async (city) => {
    try {
      setError('')
      setInput('')
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&aqi=no`
      );
      const data = response.data;

      setWeatherData({
        location: data.location.name,
        windSpeed: data.current.wind_kph,
        humidity: data.current.humidity,
        temperature: Math.floor(data.current.temp_c),
        feelsTemp: Math.floor(data.current.feelslike_c),
        dateTime: data.location.localtime,
        condition: data.current.condition.text,
      });
      console.log(data.location);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    search("new delhi");
  }, []);

  return (
    <>
      <div id="container" className="text-white">
        <div id="temp-container" className="rounded-lg py-12 px-10 mx-8">
          <div className="flex justify-center">{error && <p className="text-red-100 mb-2">Enter a valid city name</p>}</div>
          <div className="flex w-full gap-2 mb-8">
            <input
              type="text"
              placeholder="search city..."
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              className="bg-gray-200 opacity-95 w-full text-md py-2 px-6 rounded-full shadow-lg text-black"
            />
            <img
              src={searchIcon}
              onClick={() => search(inputRef.current.value)}
              className="bg-gray-50 opacity-95 rounded-full p-2 w-[40px] shadow-lg hover:cursor-pointer"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <p className="text-6xl font-bold">{weatherData.temperature}°C</p>
              <p>feels like {weatherData.feelsTemp}°C</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-4xl font-bold">{weatherData.location}</p>
              <p className="">{weatherData.dateTime}</p>
            </div>
          </div>
          <div className="mb-5 mt-8 flex flex-col justify-center items-center">
            <p className="font-semibold">
              Condition :{" "}
              <span className=" font-normal">{weatherData.condition}</span>
            </p>
          </div>

          <div className="flex justify-between">
            <div className="flex justify-between items-center gap-2">
              <img src={humidity} alt="humdityIcon-png" className="w-[25px]" />
              <div className="">
                <span className="font-normal">{weatherData.humidity}%</span>
                <p className="font-semibold text-xs">Humidity</p>
              </div>
            </div>

            <div className="flex justify-between items-center gap-2">
              <img
                src={windSpeed}
                className="w-[25px] fill-white "
                alt="wind-speed-png"
              />
              <div className="">
                <span className="font-normal">{weatherData.windSpeed}km/h</span>
                <p className="font-semibold text-xs">Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
