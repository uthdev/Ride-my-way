
const helpers = {};

/* Check the id of every request to see whether it can be converted to number */
helpers.parsedId = id => ((!(/^\d+$/.test(id))) ? NaN : parseInt(id, 10));

/* Validate fields for create new ride offers */
helpers.isValid = (rideOffer) => {
  // validations
  const name = rideOffer.name.trim() !== '';
  const location = rideOffer.location.trim() !== '';
  const destination = rideOffer.destination.trim() !== '';
  const departureTime = rideOffer.departureTime.trim() !== '';
  const price = typeof (rideOffer.price) === 'number' && rideOffer.price > 0;

  return name && location && destination && departureTime && price;
};

/* returns the response of a request */
helpers.error = (res, statusCode, message) => res.status(statusCode).json({ message });

/* When a request was successful */
helpers.success = (res, statusCode, message, data) =>
  res.status(statusCode)
    .json({ message, data });

/* Find ride offer */
helpers.find = (rideOfferArr, id) => rideOfferArr.find(ride => (id === ride.id));

/* Find request */
helpers.findRequest = (requestArr, id) => requestArr.find(request => (id === request.rideId));
export default helpers;

helpers.isRequestValid = (requestOption) => {
  const userId = requestOption.id;
  const seats = requestOption.seats >= 1;
  return userId && seats;
}; // validate request details
