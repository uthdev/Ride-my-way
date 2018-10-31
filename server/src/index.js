import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import path from 'path';
import { errorHandler, clientErrorHandler } from './middleware/errorhandler/errorHandler';
import { rideRoute, userRoute, rideOffersRoute, authRoute } from './routes';
import swaggerDocument from './../../swagger.json';


const app = express();

// set port for server to listen on
const Port = process.env.PORT || 5000;

// support parsing of application/json type post data
app.use(bodyParser.json({ limit: '50mb' }));

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


/* Connect static files */
app.use(express.static(path.resolve(__dirname, '../../frontend/')));


/* Use cors to connect to any origin */
app.options('http://ridemw.herokuapp.com/', cors({
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));


app.get('/', (req, res) => res.sendFile('../../frontend/index.html'));

app.use('/api/v1/rides', rideRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', rideOffersRoute);
app.use('/api/v1/profile/', userRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* Handle client side err */
app.use(clientErrorHandler);


if (app.get('env') === 'development') {
  app.use(errorHandler);
}


// production error handler
// no stacktraces leaked to user
app.use(errorHandler);

// Subscribe server to a particular port
// eslint-disable-next-line
app.listen(Port, () => console.log(`Server Started At ${Port}`));

// export app
export default app;
