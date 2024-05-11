// API key 注册账号时给的
const apikey = "5d50cb77a4d850371ce5a430e31c9b24";
const weatherDataEl=document.getElementById('weather-data')
const cityInputEl = document.getElementById('city-input')
const formEl = document.querySelector('form')

const getWeatherData = async (cityValue)=>{
  console.log('city',cityValue);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`;
  try{
    const response = await fetch(url)
    console.log(response);
    if(!response.ok){
      throw new Error('Network response was not on')
    }
    const data = await response.json()
    console.log('data',data);
    const temperature = Math.round(data.main.temp)
    const description = data.weather[0].description
    const icon = data.weather[0].icon
    const details =[
      `Feels like: ${Math.round(data.main.feels_like)}°C`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed}m/s`
    ]
    weatherDataEl.querySelector('.icon').innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon"/>`
    weatherDataEl.querySelector('.temperature').textContent = `${temperature}°C`
    weatherDataEl.querySelector('.description').textContent = description
    weatherDataEl.querySelector('.details').innerHTML = details.map(detail=>`<div>${detail}</div>`).join('')
  } catch (error){
    
  }
}
const updateTime = ()=>{
  let timeString =new Date().toLocaleString()
  document.getElementById('timeString').innerHTML=timeString
  setInterval(updateTime,1000)
}

formEl.addEventListener('submit',(event)=>{
  // 防止跳转preventDefault()
  event.preventDefault()
  const cityValue = cityInputEl.value
  updateTime()
  getWeatherData(cityValue)
})