const request = require("request");

const forecast = (latitude, longitude , callback) => {
  const url = 
  `http://api.weatherstack.com/current?access_key=462cd8425e6101a35527c4a18fbfd4f5&query=${encodeURIComponent(
    latitude)},${encodeURIComponent(longitude)}`;

  request({ url, json: true }, (error, {body} = {}) => {
    if (error) {
      callback("Unable to connect with internet!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
        forecastMessage: `It is currently ${body.current.temperature} degree out. There is still ${body.current.is_day == 'yes' ? 'day' : 'night'}.`
      });
    }
  });
};

module.exports = forecast;
