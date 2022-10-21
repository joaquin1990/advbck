import FSContainer from "./FSContainer.js";
import fs from "fs";
import { v4 as uuid } from "uuid";
import __dirname from "../../utils.js";
import moment from "moment";

export default class Products extends FSContainer {
  constructor() {
    super();
    this.path = __dirname + "/files/products.json";
  }

  //Add a new product
  addProduct = async (product) => {
    let items = await this.getAll();
    if (items.length === 0) {
      product.id = 1;
      product.code = uuid();
      product.date = new moment().format("DD/MM/YYYY HH:mm:ss");
      this.save(product);
      return product.id;
    } else {
      product.id = items[items.length - 1].id + 1;
      product.code = uuid();
      product.date = new moment().format("DD/MM/YYYY HH:mm:ss");
      this.save(product);
      return product.id;
    }
  };
}
