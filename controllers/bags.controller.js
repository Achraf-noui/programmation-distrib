const Bag = require('../models/bags.models');

const controller = {
  getAll: async (res, next) => {
    try {
      const bags = await Bag.find({});
      return res.status(200).json(bags);
    } catch (error) {
      next(error);
    }
  },
  addOne: async (req, res) => {
    try {
      const bag = new Bag({
        businessId: req.body.businessId,
        name: req.body.name,
        bagDescription: req.body.bagDescription,
        price: req.body.price,
        collectTime: req.body.collectTime,
        status: req.body.status,
      });
      bag.save();
      res.status(200).json(bag);
    } catch (error) {}
  },
  deleteAll: async (req, res, next) => {
    try {
      const response = await Bag.deleteMany();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const bag = await Bag.findById(req.params.id);
      res.status(200).json(bag);
    } catch (error) {
      next(error);
    }
  },
  updateOne: async (req, res, next) => {
    try {
      const bag = await Bag.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(bag);
    } catch (error) {
      next(error);
    }
  },
  deleteOne: async (req, res, next) => {
    try {
      const resp = await Bag.findByIdAndDelete(req.params.id);
      res.json(resp);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = controller;
