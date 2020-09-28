// sys update

require("dotenv").config();
const { PORT = 3000, WEATHER_KEY } = process.env;

// pulls in library from node_modules I installed
const express = require("express");
// instantiates a new app (web server)
const server = express();

const axios = require("axios");
const cowsay = require("cowsay");
const Quote = require("inspirational-quotes");
// middleware - runs between a request making it to server and responding to it
const morgan = require("morgan");
// actually hooks up morgan middleware to instance of web server
server.use(morgan("dev"));
// static middleware - serves up files stored in the given folder if requested
server.use(express.static("public"));

const bodyParser = require("body-parser");
// body parser - unpack the HTTP request body and put it in a format that's nice to work with ... puts it on the req.body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false })); // unpacking requests that came in urlencoded
// if someone makes a GET request to app at this URI: run this code...
server.post("/job-search", async (req, res) => {
  try {
    const { description, fulltime, location } = req.body;

    const URL = `https://jobs.github.com/positions.json?${
      description ? `description=${description}&` : ""
    }${fulltime ? "fulltime=true" : ""}${
      location ? `location=${location}` : ""
    }`;

    const { data } = await axios.get(URL);
    res.send({ results: data });
  } catch (error) {
    res.send({ error });
  }
});

server.get("/cowspiration", (req, res) => {
  const { text, author } = Quote.getQuote();

  const cow = cowsay.say({
    text: `${text}\n\n- ${author}`,
    W: 80,
  });

  res.send({ cow });
});

// server.get("/hello", (req, res, next) => {
//   res.send(`
//     <html>
//     <head></head>
//     <body>
//       <h3>Hello!</h3>
//     </body>
//     </html>
//     `);
// });

console.log(
  cowsay.say({
    text: "Bah!",
  })
);
console.log(Quote.getQuote());

server.get("/weather", async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}`;

    const { data } = await axios.get(URL);
    res.send({ results: data });
  } catch (error) {
    res.send({ error });
  }
});

// setting up app to run indefinitely, listening on given port
server.listen(PORT, () => {
  console.log("I am listening....");
});
