const Bag = require("../models/bags.models");

const controller = {
    getAll: async (req, res, next) => {
        try {
            const bags = await Bag.find({});
            return res.status(200).json(bags);
        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    addOne: async (req, res, next) => {
        try {
            const bag = new Bag({
                businessId: req.body.businessId,
                name: req.body.name,
                bagDescription: req.body.bagDescription,
                price: req.body.price,
                collectTime: req.body.collectTime,
                status: req.body.status
            });
            bag.save();
            res.status(200).json(bag)
        } catch (error) {

        }
    },
    deleteAll: async (req, res, next) => {
        try {
            let response = await Bag.deleteMany();
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }

    },
    getOne: async (req, res, next) => {

        try {
            let bag = await Bag.findById(req.params.id)
            res.status(200).json(bag)
        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    updateOne: async (req, res, next) => {

        try {
            let bag = await Bag.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(bag);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    deleteOne: async (req, res, next) => {

        try {
            let resp = await Bag.findByIdAndDelete(req.params.id);
            res.json(resp);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
}

module.exports = controller;