function WeatherCard({ city, data }) {
  const { main, weather, wind } = data;
  const iconCode = weather[0]?.icon;
  const iconUrl = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    : null;

  return (
    <div className="max-w-sm w-full mx-auto bg-[#1576A2] border-[#F9E900] border-[2px] rounded-2xl shadow-xl p-6 space-y-4 text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{city}</h2>
        {iconUrl && <img src={iconUrl} alt="icon" className="w-12 h-12" />}
      </div>
      <div className="text-5xl font-extrabold">{main?.temp}°C</div>
      <div className="space-y-1">
        <p>Feels Like: {main?.feels_like}°C</p>
        <p>Humidity: {main?.humidity}%</p>
      </div>
      <p className="capitalize">{weather[0]?.description}</p>
      <p>Wind Speed: {wind?.speed} m/s</p>
    </div>
  );
}
export default WeatherCard