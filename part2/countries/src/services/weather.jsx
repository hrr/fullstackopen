import axios from 'axios'
const baseUrl = 'https://openweathermap.org'
const api_key = import.meta.env.VITE_WEATHER_MAP_KEY

const getByName = ({ lat, lon }) => {
  const request = axios.get(`${baseUrl}/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
  return request.then(response => response.data)
}

export default { getByName }
