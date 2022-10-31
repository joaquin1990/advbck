import { Router } from "express";
import Contenedor from "../managers/productsContainer.js";
import validateAdmin from "../middlewares/validateAdmin.js";
import { validatePid2 } from "../middlewares/validatePid.js";
import { uploader } from "../utils/uploader.js";
import services from "../dao/index.js";

const router = Router();
const container = new Contenedor();

//GET '/api/products' -> returns all the products
router.get("/", async (req, res) => {
  let getAllProducts = await services.productService.getAll();
  res.send(getAllProducts);
});

//GET '/api/products' -> returns 1 product by its id
router.get("/:id", async (req, res) => {
  let allProducts = await services.productService.getAll();
  let id1 = Number(req.params.id);
  let item = allProducts.find(
    (item) => (item.id ? item.id : item._id) == (id1 ? id1 : req.params.id)
  );
  console.log(item);
  item ? res.send(item) : res.send("404 El valor pedido no existe");
});

// POST '/api/products' - recieves and adds a product
router.post("/", uploader.single("file"), async (req, res) => {
  let newProduct = req.body;
  newProduct.thumbnail = req.file.filename;
  if (!req.file)
    return res
      .status(500)
      .json({ status: "error", error: "Could not upload file" });
  if (
    !newProduct.title ||
    !newProduct.price ||
    !newProduct.description ||
    !newProduct.stock
  )
    return res.status(400).send({
      status: "error",
      error: "Product name, price, description and stock are required",
    });
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.thumbnail ||
    !req.body.price ||
    !req.body.stock
  )
    return res.status(400).send({
      message:
        "Product name, description, code, thumbnail, price, and stock are required",
    });
  if (!Number(req.body.price) || !Number(req.body.stock))
    return res
      .status(400)
      .send({ message: "Product price and stock must be numbers" });
  console.log("newProduct");
  console.log(newProduct);
  await services.productService.addProduct(newProduct);
  res.send({ status: "success", message: "Product Added" });
});

//PUT '/api/products/:id' -> recieves and updates a product
// router.put("/", validatePid2, uploader.single("file"), async (req, res) => {
router.put("/", uploader.single("file"), async (req, res) => {
  try {
    let productToModify = await services.productService.getByCode(
      req.body.code
    );
    console.log(productToModify);
    if (!req.body.code) {
      return res.status(400).send({ message: "Must put a product code" });
    }
    if (!productToModify) {
      res.status(400).send({
        message: `Product code: ${req.body.code} does not match any product`,
      });
    }
    req.body.id = req.params.pid;
    await services.productService.update(req.body);
    res.send({ status: "success", message: "successfully saved" });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", error: "it couldn't update the product" });
  }
});

//DELETE '/api/products/:id' -> deletes a product by id
router.delete("/:pid", validatePid2, async (req, res) => {
  try {
    await services.productService.deleteById(req.params.pid);
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", error: "it couldn't delete the product" });
  }
  res.send({ status: "success", message: "successfully deleted" });
});

export default router;
