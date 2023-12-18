import axios from "axios";
import { useEffect, useState } from "react";

export const useWeather = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);

  const onPositionUpdate = (position: any) => {
    setLat(position.coords.latitude);
    setLon(position.coords.longitude);
  };

  const handleGeolocationError = () => {
    alert("You can't see the temperature, Please Allow Your current Location");
  };

  const fetchTemperature = async () => {
    const weatherApiKey = import.meta.env.VITE_TEST;
    console.log({ weatherApiKey });

    try {
      // ISSUE FROM open weather map side =>
      // Gives 401 and the solution is to wait couple of hours but this will not fit the task time limit
      const res = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=7b03172e17d40da134bcd46da9ca17d5`
      );
      console.log({ res });
    } catch (error) {}
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        onPositionUpdate,
        handleGeolocationError
      );
    } else alert("Geolocation is not available");
  }, []);

  useEffect(() => {
    if (lat && lon) {
      fetchTemperature();
    }
  }, [lat, lon]);

  return { lat, lon };
};
