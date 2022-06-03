import axios from "axios";

export const weatherService = {
    async weatherRequest(latitude, longitude) {
        const requestUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=83ae501fb6a6ba884f41b59a81333b5d`;
        const response = await axios.get(requestUrl);
        return {
            "description": response.data.current.weather[0].description,
            "temperature": response.data.current.temp,
        };
    },
}