import MemoryContainer from "./MemoryContainer.js";
import Products from "./Products.js";
import moment from "moment";

const productService = new Products();
export default class Carts extends MemoryContainer {
  constructor() {
    super();
  }
  newCart = () => {
    let cart = {};
    if (this.data.length === 0) {
      cart.id = 1;
      cart.date = new moment().format("DD/MM/YYYY HH:mm:ss");
    } else {
      cart.id = this.data[this.data.length - 1].id + 1;
      cart.date = new moment().format("DD/MM/YYYY HH:mm:ss");
    }
    cart.products = [];
    this.save(cart);
    return cart.id;
  };

  addProductToCart = (cid, pid, qty) => {
    let cart = this.getById(cid);
    if (cart.products.some((e) => e.id === pid)) {
      for (const item of cart.products) {
        if (item.id === pid) {
          let condition = (item.quantity += qty);
          if (condition < 1) {
            item.quantity = 1;
          } else {
            item.quantity = condition;
          }
        }
      }
    } else {
      if (qty < 1) {
        throw new Error("Cart manager error:{addProductCart} invalid quantity");
      } else {
        cart.products.push({ id: pid, quantity: qty });
      }
    }
    this.update(cart);
  };

  // return an object with all products' properties of the cart
  getProductsByCid = (cid) => {
    try {
      let cart = this.getById(cid);
      let copyList = [];
      for (const item of cart.products) {
        console.log("cart product:", productService.getById(item.id));
        copyList.push({
          product: productService.getById(item.id),
          quantity: item.quantity,
        });
      }
      return copyList;
    } catch (error) {
      console.log("Cart manager: {getProductCart}");
      console.log(error);
    }
  };

  deleteProductInCart = (cid, pid) => {
    let cart = this.getById(cid);

    let newCartProduts = [];

    if (cart.products.some((e) => e.id === pid)) {
      for (const item of cart.products) {
        if (item.id === pid) {
          continue;
        }
        newCartProduts.push(item);
      }
    }
    cart.products = newCartProduts;
    this.update(cart);
  };
}
