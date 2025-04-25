import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const API_KEY = 'ed85e75c7e07ca579b80f3e1fa9f5a9b'

  const fetchWeatherByCoords = async (lat, lon) => {
    setIsLoading(true)
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
      const data = await res.json()
      setWeatherData(data)
    } catch (err) {
      console.error('Error fetching by coords:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchWeatherByCity = async (city) => {
    if (!city) return
    setIsLoading(true)
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      const data = await res.json()
      setWeatherData(data)
    } catch (err) {
      console.error('Error fetching by city:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude)
        },
        (err) => {
          console.log('Geolocation denied or error:', err.message)
          fetchWeatherByCity('delhi')
        }
      )
    } else {
      console.log('Geolocation not supported; using default city')
      fetchWeatherByCity('delhi')
    }
  }, [])

  const handleSearchChange = (val) => {setSearch(val)}
  const handleSearchSubmit = () => {
    fetchWeatherByCity(search.trim())
  }

  return (
    <div className="p-4 max-w mx-auto bg-[#2A2A72] h-[100dvh] text-white">
      <h1 className="text-3xl font-bold mb-6 text-center z-10">Weather App</h1>

      <SearchBar
        search={search}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      {isLoading && <p className="text-center">Loading…</p>}

      {weatherData?.cod === 200 ? (
        <WeatherCard city={weatherData.name} data={weatherData} />
      ) : (
        !isLoading && (
          <p className="text-center text-red-500">
            Error fetching weather. Try another city.
          </p>
        )
      )}
    </div>
  )
}

export default App
