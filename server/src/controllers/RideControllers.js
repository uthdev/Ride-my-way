import rideOffersDb from '../dummydata/rideoffers';

/**
 * This is a representation of the recipes data
 * @class RideController
 */

class RideController {
  /**
   *
   * @returns {Object} Array ride offers
   */
  static allRideOffer(req, res) {
    return (rideOffersDb.length > 0) ? res.status(200).json(rideOffersDb) : res.status(404).json({ message: 'No Ride Offer' });
  }

  /**
   *
   * @returns {Object} information about a ride
   */
  static getRideOffer(req, res) {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);
    let rideDetails = '';

    // if id is a number
    if (typeof (parsedId) === 'number') {
      rideOffersDb.find((ride) => {
        if (parsedId === ride.id) {
          rideDetails = ride;
        }
        return null;
      });
      return res.status(200).json(rideDetails);
    }
    return res.status(404).json({
      message: 'Could not find ride or the ride is invalid',
    });
  }

  static createRideOffer(req, res) {
    const rideOffer = req.body;

    // validations
    const name = rideOffer.name.trim() !== '';
    const location = rideOffer.location.trim() !== '';
    const destination = rideOffer.destination.trim() !== '';
    const departureTime = rideOffer.departureTime.trim() !== '';
    const price = typeof (rideOffer.price) === 'number' && rideOffer.price > 0;

    // check is rid
    if (name && location && destination && departureTime && price) {
      rideOffersDb.push({
        id: rideOffersDb.length + 1,
        ...rideOffer,
      });
      res.status(201).json({
        message: 'New ride offer has been created',
        rideOffersDb,
      });
    } else {
      res.status(400).json({
        error: 'Please enter the missing fields',
      });
    }
  }
}


export default RideController;
