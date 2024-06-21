const express = require('express')
//create a router instance
const weatherRouter = express.Router()

let data = [
  {
    activity: ["morning jog", "breakfast", "work", "lunch", "gym"],
    weather: "sunny",
  },
  {
    activity: ["work", "coffee break", "meetings", "dinner", "movie"],
    weather: "cloudy",
  },
  {
    activity: ["weekend", "hiking", "picnic", "reading", "gardening"],
    weather: "rainy",
  },
];

//GET retrieve the entire list
//http://localhost:8000/api/list
weatherRouter.get('/list',(req,res)=>{
  res.send(data)
})

//GET item by query parameter ?activity=work
//http://localhost:8000/api/activities?activity=movie
weatherRouter.get('/activities',(req,res)=>{
  const activityToFind = req.query.activity
  if(!activityToFind){
    return res.status(400).send('Activity parameter is missing')
  }
  const foundItems = data.filter(item=>item.activity.includes(activityToFind))
  if(!foundItems.length){
    return res.status(404).send('Activity not found')
  }
  res.send(foundItems)
})

//POST add a new item
//http://localhost:8000/api/activities
weatherRouter.post('/activities',(req,res)=>{
  console.log('body',req.body);
  const {activity,weather} =req.body
  if(!activity || !weather){
    return res.status(400).send('Activity and weather are required')
  }
  data.push({activity,weather})
  res.status(201).send({msg:'Add activity successful'})
})

//GET activities based on weather condition   /api/activities/weather/:condition
//http://localhost:8000/api/activities/weather/cloudy
weatherRouter.get('/activities/weather/:condition',(req,res)=>{
  const weatherCondition = req.params.condition
  const itemWithCondition = data.filter(
    (item)=>item.weather===weatherCondition
  )
  res.send(itemWithCondition)
})

//DELETE items based on weather condition    /activities/weather/:condition/rainy
//http://localhost:8000/api/activities/weather/cloudy
weatherRouter.delete('/activities/weather/:condition',(req,res)=>{
  const weatherCondition = req.params.condition
  const foundIndex = data.findIndex(item=>item.weather ===weatherCondition)
  if(foundIndex===-1){
    return res.status(404).send('Weather condition not found')
  }
  const deleteWeather = data.splice(foundIndex,1)
  res.send({
    msg:'Activities deleted',
    deleteWeather:deleteWeather[0]
  })
})


module.exports = weatherRouter