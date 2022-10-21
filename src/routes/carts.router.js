import { Router } from "express";
import Container from "../managers/cartsContainer.js";
import services from "../dao/index.js";
import { validateCid2 } from "../middlewares/validateCid.js";

const router = Router();
const container = new Container();

//GET "/api/carts" -> returns all the carts
router.get("/", async (req, res) => {
  let getAllCarts = await services.cartService.getAll();
  res.send(getAllCarts);
});

// GET "/api/carts/:cid/products" - returns all products from cart
router.get("/:cid/products", validateCid2, async (req, res) => {
  try {
    let cid = Number(req.params.cid);
    let products = await services.cartService.getProductsByCid(req.params.cid);
    res.send({ products });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", error: "Products couldn't be shown" });
  }
});

//POST "/api/carts/" - adds a cart
router.post("/", async (req, res) => {
  res.send({ status: "succes", message: "Cart Added" });
  await services.cartService.newCart();
});

// POST "/api/carts/:cid/products" - Add products to a specific cart (cid)
router.post("/:cid/products", validateCid2, async (req, res) => {
  const { id, quantity } = req.body;
  if (!id || !quantity) {
    return res
      .status(300)
      .send({ status: "error", error: "You Must Send All the parameters" });
  } else {
    try {
      await services.cartService.addProductToCart(
        req.params.cid,
        id,
        parseInt(quantity)
      );
      res.send({
        status: "success",
        message: "successfully saved into the cart",
      });
    } catch (error) {
      return res.status(500).send({
        status: "error",
        error: "it couldn't upload the product into the cart",
      });
    }
  }
});

//DELETE "/api/carts/:cid" - deletes a carts by its id
router.delete("/:cid", async (req, res) => {
  let cid2 = req.params.cid;
  await services.cartService.deleteById(cid2);
  res.send({ status: `Cart with id '${cid2}' has been deleted` });
});

// DELETE "/api/carts/:cid/products/:pid" - Delete a product by its id in a cart located by its id.
router.delete("/:cid/products/:pid", validateCid2, async (req, res) => {
  try {
    await services.cartService.deleteProductInCart(
      req.params.cid,
      req.params.pid
    );
    res.send({ status: "success", message: "successfully deleted" });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", error: "product couldn't been deleted" });
  }
});

export default router;
