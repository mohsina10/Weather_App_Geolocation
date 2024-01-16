import React, { useState, useEffect } from "react";
import axios from "axios";
function MyLocation() {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [lat, setlat] = useState(0);
  const [lon, setlon] = useState(0);
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = "acaffeaecaf82092a7539c1f3f171391";
  // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${API_KEY}`
        );

        setWeatherData(response.data);
        console.log(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(true);
      }
    };

    if (position.latitude !== null && position.longitude !== null) {
      fetchData();
    }
  }, [position.latitude, position.longitude]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (geoPosition) {
        setPosition({
          latitude: geoPosition.coords.latitude,
          longitude: geoPosition.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);
  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       setPosition({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //     });
  //   } else {
  //     console.log("Geolocation is not available in your browser.");
  //   }
  //   if (position.latitude != 0 && position.latitude != 0) {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(
  //         `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${API_KEY}`
  //       );
  //       // const data = await response.json();
  //       setWeatherData(response.data);
  //       console.log(weatherData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching weather data:", error);
  //       setLoading(false);
  //     }
  //   }
  // }, []);
  // setlat(position.latitude);
  // setlon(position.longitude);
  console.log(position.latitude);
  console.log(lon);
  // const fetchWeatherData = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(
  //       `https://api.openweathermap.org/data/3.0/onecall?lat=${position.latitude}&lon=${position.longitude}&exclude={part}&appid=${API_KEY}`
  //     );
  //     // const data = await response.json();
  //     setWeatherData(response.data);
  //     console.log(weatherData);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching weather data:', error);
  //     setLoading(false);
  //   }
  // };
  return (
    <div className="container">
      <br/>
      <h2>My Current Location</h2>
      {position.latitude && position.longitude ? (
        <p>
          Latitude: {position.latitude}, Longitude: {position.longitude}
        </p>
      ) : (
        <p>Loading...</p>
      )} 
       {loading? (
          //  <p>Loading...</p>
           alert("Please Enable Your Location")
       ):(
        
        
      <div className="card" style={{ width: "18rem" }}>
        <img
          src="https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif"
          className="card-img-top"
          alt="..."
        />
        
        <div className="card-body">
          {weatherData && weatherData.main ? (
            <div>
              
              <h5 className="card-title">City you are in</h5>
              <div className="weather-location">
                {weatherData?.name},{weatherData?.sys?.country}
              </div> 
              <br/>
              <div className="element">
              <h5 className="card-title">Temparture</h5> 
              <div className="weather-location">
              {weatherData?.main?.temp}°c
              </div>   
              </div>
              <div className="element">
              <h5 className="card-title">Humidity</h5> 
              <div className="weather-location">
              {weatherData?.main?.humidity}%
              </div>   
              </div>
            </div>
          ) : null}
        </div>
      </div> 
       )}
    </div>
  );
}

export default MyLocation;
