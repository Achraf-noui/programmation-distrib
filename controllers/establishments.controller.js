const httpStatus = require('http-status');
const Establishment = require('../models/establishments.model');

const { fetchEstablishmentById, fetchMedia } = require('../api/GooglePlaces');

const getAllEstablishments = async (req, res) => {
  try {
    const establishments = await Establishment.find().populate('bags');
    res.status(httpStatus.OK).json(establishments);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
  }
};

const fetchAndCreateEstablishment = async (req, res) => {
  try {
    const { placeId } = req.body;

    // Fetch establishment details from Google Places API
    const establishmentData = await fetchEstablishmentById(placeId);

    // Check if establishment data is valid
    if (!establishmentData) {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'Establishment not found' });
    }

    const photosPromises = establishmentData.photos.map(async (photo) => {
      try {
        const photoData = await fetchMedia(photo.name);
        return photoData.photoUri;
      } catch (error) {
        console.error(`Error fetching photo: ${error.message}`);
      }
    });
    const photos = await Promise.all(photosPromises);

    console.log(establishmentData.name);
    console.log(establishmentData.location);

    // Extract relevant establishment details
    const establishment = await Establishment.create({
      name: establishmentData.displayName.text,
      googlePlaceId: establishmentData.id,
      photos,
      address: establishmentData.formattedAddress,
      location: {
        type: 'Point',
        coordinates: [establishmentData.location.longitude, establishmentData.location.latitude]
      },
      owner: req.user.id,
    });

    // Send success response with created establishment data
    res.status(httpStatus.CREATED).json(establishment);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
  }
};

const getEstablishmentById = async (req, res) => {
  try {
    const { establishmentId } = req.params;

    // Find the establishment by ID
    const establishment = await Establishment.findById(establishmentId);

    // Check if the establishment exists
    if (!establishment) {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'Establishment not found' });
    }

    // If the establishment exists, send it as a response
    res.status(httpStatus.OK).json(establishment);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
  }
};

const updateEstablishment = async (req, res) => {
  try {
    const { establishmentId } = req.params;
    const establishment = await Establishment.findById(establishmentId);

    if (!establishment) {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'Establishment not found' });
    }

    if (!establishment.owner.equals(req.user.id)) {
      return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Unauthorized' });
    }

    Object.assign(establishment, req.body);
    await establishment.save();
    res.json(establishment);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
  }
  return null;
};

const deleteEstablishment = async (req, res) => {
  try {
    const { establishmentId } = req.params;
    const establishment = await Establishment.findById(establishmentId);

    if (!establishment) {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'Establishment not found' });
    }

    if (!establishment.owner.equals(req.user.id)) {
      return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Unauthorized' });
    }

    await establishment.deleteOne();
    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
  }

  return null;
};

module.exports = {
  getAllEstablishments,
  fetchAndCreateEstablishment,
  updateEstablishment,
  deleteEstablishment,
  getEstablishmentById,
};
