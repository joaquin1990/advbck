import MemoryContainer from "./MemoryContainer.js";
import { v4 as uuid } from "uuid";
import moment from "moment";

export default class Products extends MemoryContainer {
  constructor() {
    super();
  }
  //Add a new product
  addProduct = (product) => {
    if (this.data.length === 0) {
      product.id = 1;
      product.code = uuid();
      product.date = new moment().format("DD/MM/YYYY HH:mm:ss");
      this.save(product);
      return product.id;
    } else {
      product.id = this.data[this.data.length - 1].id + 1;
      product.code = uuid();
      product.date = new moment().format("DD/MM/YYYY HH:mm:ss");
      this.save(product);
      return product.id;
    }
  };
}
