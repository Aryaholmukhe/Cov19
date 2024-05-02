const express = require("express");
const bodyParser = require("body-parser");
const api = require('novelcovid');
const moment = require('moment');

const app = express()

api.settings({
  baseUrl: 'https://disease.sh'
})

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(bodyParser.json());

let countryName = []
let pastCountryDeaths = []
let pastCountryRecovered = []
let pastCountryCases = []
let date = []
let worldDeaths = []
let worldCases = []


// seprate by commas function
function numberWithCommas(x) {
  x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// get route for each country specifically
// Countries' own data

app.get("/data/:countryName", async (req, res) => {

  let cntry = req.params.countryName;
  const countries = await api.countries({ sort: 'cases' });
  const specifiedCountry = await api.countries({ country: cntry });
  console.log(cntry)
  cntry.replace(/%20/g, " ");

  countries.forEach((country) => {
    countryName.push(country)
  })

  // Past data for the specified country
  cntry = cntry.toString()
  const historyData = await api.historical.countries({ country: cntry, days: "all" });
  const pastdata = historyData.timeline;

  for (const i in pastdata.cases) {
    var dateFormatting = new Date(i).toLocaleString('default', { year: 'numeric', month: 'short', day: 'numeric' })
    date.push(dateFormatting.toString());
    pastCountryCases.push(pastdata.cases[i]);
  }
  for (const i in pastdata.recovered) {
    pastCountryRecovered.push(pastdata.recovered[i]);
  }
  for (const i in pastdata.deaths) {
    pastCountryDeaths.push(pastdata.deaths[i]);
  }
  countryName.forEach((country) => {
    const cntryName = country.toString()
    if (cntry === cntryName) {
      console.log("match found");
    }
  })
  res.render("country", { specifiedCountry: specifiedCountry, cntry, date, pastCountryCases, pastCountryRecovered, pastCountryDeaths })
  pastCountryCases = []
  pastCountryRecovered = []
  pastCountryDeaths = []

})
// get route for the home page

app.get('/', async (req, res) => {


  // the heading information:
  const worldWide = await api.all()

  // The countries data

  const countryAll = await api.countries({ sort: 'cases' })
  const historical = await api.historical.all()

  const updated = new Date(worldWide.updated)
  const time = moment(updated).calendar();
  const timeAgo = moment(updated).fromNow();

  for (const i in historical.deaths) {
    worldDeaths.push(historical.deaths[i]);
  }
  for (const i in historical.cases) {
    var dateFormatting = new Date(i).toLocaleString('default', { year: 'numeric', month: 'short', day: 'numeric' })
    date.push(dateFormatting.toString());
    worldCases.push(historical.cases[i]);
  }

  res.render("home", {
    // world data
    worldWide: worldWide,
    // country data
    countryAll: countryAll,
    countryName: countryName,
    time: time,
    timeAgo: timeAgo,
    worldCases,
    worldDeaths,
    date
  })
  countryName = [];
  worldCases = [];
  worldDeaths = [];
  date = [];
});

app.get("/covid", (req, res) => {
  res.render("covid")
})
app.get("/about", (req, res) => {
  res.render("about")
})

let port = process.env.PORT;
 if(port===null||port===""){
   port = 8000;
 }
app.listen(port, function() {
  console.log('server started on successfully');
});