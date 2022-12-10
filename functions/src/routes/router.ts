import * as express from "express";
//import { createCart, deleteCart } from "../controllers/carts";
import { getMenu } from "../controllers/menu";
import { create_orders, getOrdersOfCustomer } from "../controllers/orders";
import {
  getProductByCollection,
  getProductDetails,
} from "../controllers/products";
import {
  createCustomer,
  getCustomerAddress,
  getCustomer,
} from "../controllers/users";
//import { createWishlist, deleteWishlist } from "../controllers/wishlist";
const router = express.Router();

router.get("/menu", getMenu);

router.post("/customer", createCustomer);

router.get("/customer/:customerId", getCustomer);

router.get("/customer/:customerId/addresses", getCustomerAddress);

router.post("/products", getProductByCollection);

router.get("/product/:productId", getProductDetails);

router.post("/orders", create_orders);

router.get("/customer/:customerId/orders", getOrdersOfCustomer);

//router.post("/cart", createCart);

//router.delete("/cart", deleteCart);

//router.post("/wishlist", createWishlist);

//router.delete("/wishlist", deleteWishlist);

//app.get("/products/:productId", productDetails);

export { router };
