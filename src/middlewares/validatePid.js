import services from "../dao/index.js";

export async function validatePid2(req, res, next) {
  console.log(req.body);
  req.params.product = await services.productService.getById(req.params.pid);
  if (!req.params.product)
    return res
      .status(404)
      .send({ status: "error", error: "Product not founded" });
  next();
}
