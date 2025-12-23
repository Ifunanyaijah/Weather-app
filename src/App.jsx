import React, { useState } from 'react'
import './App.css'

function App() {
const [input, setInput] = useState("")
//this crates a value called input and setinput is a function updates input when you type//  
const [weather, setWeather] = useState(
  {
    loading: false,
    data: {},
    error: false
  }
)
const API_KEY = "13b37cdb0d7aac29aa27cfe2d9e969fc";
//the data holds the weather info, loading is true when fetching data, false otherwise, //
const search = async (event) => {
  
if(event.key === "Enter") {
  const cityName = input
  setInput('')
  setWeather({...weather, loading:true})

//listens for the enter key, so when you press enter, it clears the searchbox thru setinput sets loading to true and keeps the remaing weather properties//
try {
  //this fetches the weather data//
  const response = await 
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=13b37cdb0d7aac29aa27cfe2d9e969fc&units=metric`
  );
  const data = await response.json();
  //update weather state with data//
  setWeather({
    loading: false,
    data: data,
    error: false
  });
} catch (error) {
  setWeather({
    loading: false,
    data: {},
    error: error.message || 'Failed to fetch weather'
  });
}
}
}


  return (
   <div className='App'>
    <div className='weather-app'>
      <div className='city-search'>
        <input type='text' className='city' placeholder='Enter city name'value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={search}/> 
        
      </div>
      {weather.loading && (
        <div className="loading">Loading weather data...</div>
      )
      }
      {weather.error && (
<div className='error'>{weather.error} 
  </div>
      )}
      {weather.data.main && (
        <div className='weather-info'>
          <h2>{weather.data.name},
            {weather.data.sys.country}
          </h2>
          <div className='temperature'>
            {Math.round(weather.data.main.temp)}C
          </div>
          <div className='weather-description'>
      {weather.data.weather[0].description}
      </div>
      <div className='details'>
        <div> Feels like:{Math.round(weather.data.main.feels_like)}C</div>
        <div>?Humidity:{weather.data.main.humidity}%</div>
        <div>Wind:{weather.data.wind.speed} m/s</div>
</div>
</div>
)}




    </div>
   </div>
  )
}
//onchange stores the updated new value you type to input, valu=imput makes imput box show what is stored as input//

export default App
