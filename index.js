const express = require("express");
const ejs = require("ejs");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

// make public folder a static folder to use in any ejs file
app.use(express.static('public'));

const data = require("./countries.json");
const data2 = require("./country-coords.json");

const data3 = require("./data.json");
console.log(data3.currency)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine("html", ejs.renderFile); //npm i ejs
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("home",{
    item:data,
  });
});

// search form
app.post('/search', (req, res) => {
  
  const country = (req.body.country).toLowerCase();
  const check1 = data.find(c => c.country.toLowerCase() === country);
  const check2 = data2.find(c => c.country.toLowerCase() === country);
  
  const continents = {
      'as': '🌏 Asia',
      'eu': '🌍 Europe',
      'af': '🌍 Africa',
      'na': '🌎 North America',
      'sa': '🌎 South America',
      'oc': '🌏 Oceania',
      'an': '🌎 Antarctica',
  };
  // to check if the couuntry exists in the database  (countries.json)
  if (check1) {
    res.render('country', {
      country: check1,
      continents: continents,
      
    });
  } else if (check2) {
    console.log(check2);
    res.render('country', {
      country: data.find(c => c.country.toLowerCase() === check2.name.toLowerCase()),
      continents: continents,
    });
  } else {
    return res.render('error', {
      error: 'Tere baap ne hi banayi yeh country??'
    });
  }

  // if it exists render this
  // res.render('country', {
  //   country: check1,
  //   coords: check2,
  // });
});

//api
app.get("/api/country", (req, res) => {
  
  const countryName = req.query.name;
  if (!countryName) return res.json({ error: "Provide me with a valid country or ur gay" })
  
  const check1 = data.find(c => c.country.toLowerCase() === countryName.toLowerCase());
  const check2 = data2.find(c => c.country.toLowerCase() === countryName.toLowerCase());

  if (check1) {
    res.json({ country: check1});
  } else if (check2) {
    res.json({ country: data.find(c => c.country.toLowerCase() === check2.name.toLowerCase())});
  } else {
    res.status(404).json({ error: 'Country not found' });
  }
});

app.listen(
  console.log(`app is running`)
);

//code stops here


// comments


// app.get("/country/:id", (req, res) => {
//   const id = req.params.id.toLowerCase();
//   const check = data.find(c => c.country.toLowerCase() === id);
//   // to check if the couuntry exists in the database 
//   if (!check) {
//     return res.render(
//       "error", //.ejs file
//       {
//         error: "country not found",
//       },
//     );
//   }
//   // if it exists render this
//   res.render(
//     "country", //.ejs file
//     {
//       country: data.find(c => c.country.toLowerCase() === id),
//     },
//   );
// });