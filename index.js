// const { PORT = 3000, WEATHER_KEY } = process.env;
const express = require('express');
const server = express();
const axios = require('axios')
const cowsay = require('cowsay');
const Quote = require('inspirational-quotes')

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.static('public'));

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
// server.post('/job-search', (req, res) => {
//     res.send({
//         searchData: req.body,
//         status: "PENDING",
//     })
// });
server.post('/job-search', async (req, res) => {
    try {
        const { description, fulltime } = req.body;

        const URL = `https://jobs.github.com/positions.json?${
            description ? `description=${description}&` : ''
            }${
            fulltime ? 'fulltime=true' : ''
            }`;

        const { data } = await axios.get(URL);
        res.send({ results: data });






    } catch (error) {
        res.send({ error });
    }
});

server.get('/cowspiration', (req, res) => {
    const { text, author } = Quote.getQuote();

    const cow = cowsay.say({
        text: `${text}\n\n- ${author}`,
        W: 80,
    });

    res.send({ cow });
});
server.get('/hello', (req, res, next) => {
    res.send(`
    <html>
    <head></head>
    <body>
      <h3>Hello!</h3>
    </body>
    </html>
    `)
});

console.log(cowsay.say({
    text: "Bah!"
}));
console.log(Quote.getQuote())

server.listen(3000, () => {
    console.log('I am listening...');
});