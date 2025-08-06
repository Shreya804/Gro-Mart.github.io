import express from "express";
import { getAllOrders, getUserOrders, placeOrderCOD } from "../controllers/orderController.js";
import authSeller from "../middlewares/authSeller.js";
import authUser from "../middlewares/authUser.js";

const orderRoute = express.Router();

orderRoute.post('/cod', authUser,placeOrderCOD)
orderRoute.get('/user', authUser,getUserOrders)
orderRoute.get('/seller', authSeller,getAllOrders)


export default orderRoute;

