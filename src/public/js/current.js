fetch("/api/products", {
  method: "GET",
})
  .then((res) => res.json())
  .then((products) => {
    let productListContainer = document.querySelector("#productListContainer");
    productListContainer.innerHTML = "";
    if (products.length) {
      products.forEach((product) => {
        const card = `
          <div class="card d-flex flex-column align-items-center p-2">
            <img src="images/${product.thumbnail}" alt="product">
            <div class="d-flex flex-grow-1 flex-column justify-content-end w-100 m-2 align-items-center">
              <p class="text-center">${product.title}</p>
              <p class="text-center">$${product.price}</p>
              <p class="text-center">Stock: ${product.stock}</p>
              <p class="hidden-product-code">${product.code}</p>
              <div class="w-100 d-flex flex-row justify-content-between align-items-center">
                <button class="card-button btn btn-primary btn-sm">Add to Cart</button>
                <button type="button" class="card-button detail-button btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#product-detail-modal">Product Details</button>
              </div>
            </div>
          </div>
        `;
        productListContainer.innerHTML += card;
      });
      document.querySelectorAll(".detail-button").forEach((button) => {
        button.addEventListener("click", (e) => {
          const code =
            e.target.parentNode.previousSibling.previousSibling.innerText;
          fetch("/api/products?" + new URLSearchParams({ code }), {
            method: "GET",
          })
            .then((res) => res.json())
            .then((product) => {
              document.getElementById(
                "det-prod-img"
              ).src = `images/${product.thumbnail}`;
              document.getElementById("det-prod-name").innerText = product.name;
              document.getElementById("det-prod-desc").innerText =
                product.description;
              document.getElementById(
                "det-prod-price"
              ).innerText = `$${product.price}`;
              document.getElementById(
                "det-prod-stock"
              ).innerText = `Stock: ${product.stock}`;
              document.getElementById(
                "det-prod-code"
              ).innerText = `Product Code: ${product.code}`;
            });
        });
      });
    } else {
      productListContainer.innerHTML = "<h1>NO PRODUCTS FOUND</h1>";
    }
  });
