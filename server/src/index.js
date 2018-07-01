import express from 'express';
import bodyParser from 'body-parser';
import rideRoute from './routes/rides/rideRoutes';
import userRoute from './routes/user/userRoutes';
import { errorHandler, clientErrorHandler } from './middleware/errorhandler/errorHandler';

const app = express();

// set port for server to listen on
const Port = process.env.PORT || 5000;

// support parsing of application/json type post data
app.use(bodyParser.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/rides', rideRoute);
app.use('/api/v1/auth', userRoute);

/* Handle client side err */
app.use(clientErrorHandler);
if (app.get('env') === 'development') {
  app.use(errorHandler);
}


// production error handler
// no stacktraces leaked to user
app.use(errorHandler);

// Subscribe server to a particular port
app.listen(Port, () => console.log(`Server Started At ${Port}`));

// export app
export default app;
