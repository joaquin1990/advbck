const persistence = "MONGO";
let productService;
let cartService;
let usersService;
switch (persistence) {
  case "MEMORY":
    const { default: MemProduct } = await import("./MemoryDAO/Products.js");
    const { default: MemCart } = await import("./MemoryDAO/Carts.js");
    const { default: MemUser } = await import("./MemoryDAO/Users.js");
    productService = new MemProduct();
    cartService = new MemCart();
    usersService = new MemUser();
    break;
  case "MONGO":
    const { default: MongoProduct } = await import("./MongoDAO/Products.js");
    const { default: MongoCart } = await import("./MongoDAO/Carts.js");
    const { default: MongoUser } = await import("./MongoDAO/Users.js");
    productService = new MongoProduct();
    cartService = new MongoCart();
    usersService = new MongoUser();
    break;
  case "FileSystem":
    const { default: FSProduct } = await import("./FileSystemDAO/Products.js");
    const { default: FSCart } = await import("./FileSystemDAO/Carts.js");
    const { default: FSUser } = await import("./FileSystemDAO/Users.js");
    productService = new FSProduct();
    cartService = new FSCart();
    usersService = new FSUser();
    break;
}

const services = {
  productService,
  cartService,
  usersService,
};

export default services;
