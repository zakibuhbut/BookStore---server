import express from "express";
import * as cartController from '../controllers/cart.controller.js';
import userAuth from "../middlewares/user.auth";


const router = new express.Router();

router.post('/cart', userAuth, cartController.addBook);

export default router;