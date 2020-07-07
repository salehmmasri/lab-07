'use strict';

const express = require('express');
// who can touch my server
const cors = require('cors');
// import .env LY
require('dotenv').config();

const superagent = require('superagent');

const PORT = process.env.PORT || 3030;

const app = express();

app.use(cors());

app.get('/', (req, response) => {

    response.status(200).send('good job');
});

http://localhost:3400/location?city=Lynnwood

app.get('/location', (req, res) => {
    // console.log(city);
    // const geoData=require('./data/location.json');
    // const locationData=new Location(city,geoData);
    // console.log(geoData);
    // res.send(locationData);

    const city = req.query.city;
    const key = process.env.LOCATION_KEY;
    const url = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;
    // this one superagent we should use it to grt the raspon from api then pass it to constractour
    superagent.get(url)
        .then(geoData => {
            const locationData = new Location(city, geoData.body);
            console.log(geoData.body);
            res.status(200).json(locationData);
        });


});
http://localhost:3400/weather
app.get('/weather', (req, res) => {
    const key = process.env.WEATHER_KEY;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${arrOfObj[0].latitude}&lon=${arrOfObj[0].longitude}&key=${key}`;
    superagent.get(url)
    .then(dataOFweather =>{
        let arr=dataOFweather.body.data.map((val,ind)=> {
        const weatherData=new Weather(val);
        return weatherData;
        });
        console.log(arr);
        res.status(200).json(arr);
    });
});
app.get('/trails', (req, res) => {
    const key = process.env.HIKENG_KEY;
    const url =`https://www.hikingproject.com/data/get-trails?lat=${arrOfObj[0].latitude}&lon=${arrOfObj[0].longitude}&key=${key}`;

    superagent.get(url)
    .then(dataOFtrails =>{
        let arr=dataOFtrails.body.trails.map((value,ind)=> {
        const trail = new Trail(value);
        return trail;
        });
        console.log(arr);
        res.status(200).json(arr);
    });
});

function Trail (value){
    this.longitude = value.longitude;
    this.latitude = value.latitude;
    this.name = value.name;
    this.location = value.location;
    this.length = value.length;
    this.stars = value.stars;
    this.star_votes = value.starVotes;
    this.summary = value.summary;
    this.trail_url = value.url;
    this.conditions = value.conditionStatus;
    this.condition_date = value.conditionDate.split(' ',1).toString();
    this.condition_time = value.conditionDate.split(' ',2).slice(1).toString();

}

let arrOfObj = [];
function Location(city, geoData) {
    this.search_query = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
    arrOfObj.push(this);
}

function Weather(obj) {
    this.forecast = obj.weather.description;
    this.time = new Date(obj.datetime).toDateString();
}
app.get('*', (req, res) => {
    res.status(500).send('Sorry, something went wrong');
});



app.listen(PORT, () => {
    console.log(`on port ${PORT}`);
});

