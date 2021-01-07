const functions = require("firebase-functions");
const fetch = require('node-fetch');
const _ = require('lodash');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.weather = functions.https.onRequest(async (request, response) => {
  // functions.logger.info("Hello logs!", {structuredData: true});
  // response.send("Hello from Firebase!");
  const city = request.query.city;
  functions.logger.info("Getting weather for city", {city});
  const weather = await getWeather(city);
  functions.logger.info("Fetch weather data", {weather});
  response.send(weather);
});

async function getWeather(city) {
    let functionResponse;

    const searchtextcity = city
    console.log(city)
    const result = await fetch(`https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=tKR5gDoDal2N5VSGcFZb_5WIuncU67Qs3Q223kLCR2o&searchtext=${searchtextcity}`);
    const responseJson = await result.json();
    const location = await responseJson.Response.View[0].Result[0].Location.Address.City;
    const latitude = await responseJson.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude;
    const longitude = await responseJson.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude;
    //console.log (longitude, latitude, location);

    const resultWeather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=aa8d626b207c05983b2f726026e95581&lang=fr&units=metric`);
    const responseJsonWeather = await resultWeather.json();
    const sevenDaysWeather = responseJsonWeather.daily;

    functionResponse = {
      city : city,
      latitude : latitude,
      longitude : longitude,
      location : location,
      daily : sevenDaysWeather
    }
    
    return functionResponse;
}
