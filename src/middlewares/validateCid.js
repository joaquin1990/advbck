import services from "../dao/index.js";

export async function validateCid2(req, res, next) {
  try {
    req.params.cart = await services.cartService.getById(req.params.cid);
  } catch (error) {
    return res.status(300).send({ status: "error", error: "Invalid id" });
  }
  if (!req.params.cart)
    return res.status(404).send({ status: "error", error: "Cart not found" });
  next();
}
