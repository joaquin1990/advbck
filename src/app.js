import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import __dirname from "./utils.js";
import config from "./config/config.js";

const app = express();
const PORT = config.app.PORT;
const server = app.listen(PORT, () => console.log("Now Listening on 8080"));
const admin = true;

app.use(express.json()); //Its a middleware because all its going to be JSON.
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use(express.static(__dirname + "/public"));
