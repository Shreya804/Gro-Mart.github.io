import express from "express";
import { isSellerAuth, sellerLogin, sellerLogout } from "../controllers/sellerController.js";
import authSeller from "../middlewares/authSeller.js";

const sellerRouter = express.Router();

sellerRouter.post(`/login`, sellerLogin); // ✅ login
sellerRouter.get(`/is-auth`, authSeller, isSellerAuth); // ✅ <- THIS IS REQUIRED
sellerRouter.get(`/logout`, sellerLogout);

export default sellerRouter;