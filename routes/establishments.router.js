const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const establishmentController = require('../controllers/establishments.controller');
const establishmentValidation = require('../validations/establishments.validation');

const router = express.Router();

// get all establishments
router.get('/', establishmentController.getAllEstablishments);

// Register a new establishment
router.post('/', auth('create_establishment'), validate(establishmentValidation.registerEstablishment), establishmentController.fetchAndCreateEstablishment);

// Fetch an establishment by ID
router.get('/:establishmentId', auth(['admin', 'establishment_owner']), establishmentController.getEstablishmentById);

// Update an establishment by ID
router.patch('/:establishmentId', auth(['admin', 'establishment_owner']), validate(establishmentValidation.updateEstablishment), establishmentController.updateEstablishment);

// Delete an establishment by ID
router.delete('/:establishmentId', auth(['admin', 'establishment_owner']), establishmentController.deleteEstablishment);

module.exports = router;
