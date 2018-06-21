import express from 'express';
import bodyParser from 'body-parser';
import rideRoute from './routes/index';

const app = express();

// set port for server to listen on
const Port = 5000;

// support parsing of application/json type post data
app.use(bodyParser.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/rides', rideRoute);

// Subscribe server to a particular port
app.listen(Port, () => console.log(`Server Started At ${Port}`));

// export app
export default app;
