const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebar engine and view location
app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsPath);

// Setup Static Directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Rakesh Vanand",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Rakesh Vanand",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Rakesh Vanand",
    message: "This is the help message.",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404Page", {
    title: "404",
    errorMessage: "Help article not found.",
    name: "Rakesh Vanand",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address!",
    });
  }

  geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
    if (err) {
      return res.send({err})
    }

    forecast(latitude, longitude, (forecastError, {temperature, feelslike, forecastMessage} = {}) => {
      if (forecastError) {
        return res.send({forecastError})
      }

      return res.send({temperature, feelslike, location, forecastMessage})
    })
  })

});

app.get("*", (req, res) => {
  res.render("404Page", {
    title: "404",
    errorMessage: "404 - The Page can't be found!",
    name: "Rakesh Vanand",
  });
});

app.listen(3000, () => {
  console.log("Listening port no 3000!");
});
