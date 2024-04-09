const express = require('express');
const router = express.Router();
const bagsController = require('../controllers/bags.controller');
const auth = require('../middlewares/auth');

router.route('/:establishmentID/bags')
    .get(bagsController.getAllBags)
    .post(bagsController.addOneBag)
    .delete(bagsController.deleteAllBags);

router.route('/:establishmentID/bags/:bagID')
    .get(bagsController.getOneBag)
    .put(bagsController.updateOneBag)
    .delete(bagsController.deleteOneBag);

module.exports = router;
