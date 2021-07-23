const request = require('request')

const geocode = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address) +
      ".json?access_token=pk.eyJ1IjoicmFrZXNodjExMDgiLCJhIjoiY2twOXBnaXNiMGc4YjJwbGxxcHQyNTcwdCJ9.pDDLWMEWlJO-XEQAPMK7cA";
  
    request({ url, json: true }, (error, {body} = {}) => {
      if (error) {
        callback("Unable to connect with internet!", undefined);
      } else if (body.features.length == 0) {
        callback("Unable to find location!", undefined);
      } else {
        const latitude = body.features[0].center[1];
        const longitude = body.features[0].center[0];
        const location = body.features[0].place_name;
        callback(undefined, {
           latitude,
           longitude,
           location,
        });
      }
    });
  };
  
  module.exports = geocode