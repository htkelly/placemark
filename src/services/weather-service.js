import axios from "axios";

export const weatherService = {
    async weatherRequest(latitude, longitude) {
        const requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.owm_key}`;
        const response = await axios.get(requestUrl);
        return {
            "description": response.data.current.weather[0].description,
            "temperature": response.data.current.temp,
            "tomorrowDayTemp": response.data.daily[1].temp.day,
            "nextdayDayTemp": response.data.daily[2].temp.day,
        };
    },
}