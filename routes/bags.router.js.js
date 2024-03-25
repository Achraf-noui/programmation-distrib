const express = require("express");
const router = express.Router();
const bagsController = require("../controllers/bags.controller")

router.route("/")
    .get(bagsController.getAll)
    .post(bagsController.addOne)
    .delete(bagsController.deleteAll)


router.route("/:id")
    .get(bagsController.getOne)
    .put(bagsController.updateOne)
    .delete(bagsController.deleteOne)


module.exports = router;