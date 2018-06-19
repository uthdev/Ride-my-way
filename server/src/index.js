import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// set port for server to listen on
const Port = 5000;

// support parsing of application/json type post data
app.use(bodyParser.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Subscribe server to a particular port
app.listen(Port, (req, res) => console.log(`Server Started At ${Port}`));
