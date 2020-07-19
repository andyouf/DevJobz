const express = require('express');
const server = express();

server.listen(3000, () => {
    console.log('I am listening...');
});

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.static('public'));

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.post('/job-search', (req, res) => {
    res.send({
        searchData: req.body,
        status: "PENDING",
    })
});

