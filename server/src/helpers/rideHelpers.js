
/* Check the id of every request to see whether it can be converted to number */
export const parsedInt = id => ((!(/^\d+$/.test(id))) ? NaN : parseInt(id, 10));

/* Validate fields for create new ride offers */
export const isValid = (rideOffer) => {
  // validations
  const name = rideOffer.name.trim() !== '';
  const location = rideOffer.location.trim() !== '';
  const destination = rideOffer.destination.trim() !== '';
  const departureTime = rideOffer.departureTime.trim() !== '';
  const price = typeof (rideOffer.price) === 'number' && rideOffer.price > 0;

  return name && location && destination && departureTime && price;
};

/* returns the response of a request */
export const error = (res, statusCode, message) => res.status(statusCode).json({ message });

/* When a request was successful */
export const success = (res, statusCode, message, data) =>
  res.status(statusCode)
    .json({ message, data });

/* Find ride offer */
export const find = (rideOfferArr, id) => rideOfferArr.find(ride => (id === ride.id));

/* Find request */
export const findRequest = (requestArr, id) => requestArr.find(request => (id === request.rideId));

/* validate request */
export const isRequestValid = (requestOption) => {
  const userId = requestOption.id;
  const seats = requestOption.seats >= 1;
  return userId && seats;
}; // validate request details

/* Check to see if passsenger sit are already filled up */
export const isSeatValid = (noOfSeats, passengerArr, userSeat) => (noOfSeats > passengerArr)
  && (noOfSeats > (passengerArr + userSeat));
