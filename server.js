'use strict';

const express=require('express');

// who can touch my server
const cors=require('cors');
// import .env LY
require('dotenv').config();

const PORT=process.env.PORT||3030 ;

const app = express();

app.use(cors());

app.get('/',(req,response)=> {

    response.status(200).send('good job');
});

http://localhost:3400/location?data=Lynnwood

app.get('/location',(req,res)=>{
    const city =req.query.data;
    console.log(city);
    const geoData=require('./data/location.json');
    console.log(geoData);
    
    const locationData=new Location(city,geoData);
    res.send(locationData);

});
http://localhost:3400/weather

app.get('/weather',(req,res)=>{

    const weaData=require('./data/weather.json');
    // const weatherData=new Weather(weaData);
    res.send(getweatherinfo(weaData));

});

function getweatherinfo(weather){
    let arrWeather=[];
    weather.data.forEach(element => {
        let theTime=new Date(element.datetime);
        arrWeather.push(new Weather(element.weather.description,theTime.toDateString()));
        
    });
    console.log(arrWeather);
    return arrWeather ;
}

function Location(city,geoData){
    this.search_query = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
}

function Weather(forecast,time){
    // {
    //     "forecast": "Partly cloudy until afternoon.",
    //     "time": "Mon Jan 01 2001"
    //   },
    this.forecast = forecast;
    this.time = time;
    
}
app.get('*', (req, res) => {
    res.status(500).send('Sorry, something went wrong');
});



app.listen(PORT,()=>{
    console.log(`on port ${PORT}`);
});

