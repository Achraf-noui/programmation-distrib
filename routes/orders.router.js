import express from "express";
import OrderController from "../controllers/orders.controller";

const auth = require('../middlewares/auth');


const router = express.Router();

router.get("/", auth('user'), OrderController.getMyOrders);


export default router;