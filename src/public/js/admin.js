/* Form para agregar un nuevo producto a la base de datos */
console.log("Entra al JS");
const newProductForm = document.getElementById("newProductForm");

// Form to upload new products:
newProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(newProductForm);
  fetch("/api/products", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "success") {
        Swal.fire({
          icon: "success",
          text: "Product saved successfully",
          toast: true,
          position: "top-right",
          timer: 2000,
        });
        newProductForm.reset();
      }
      if (res.status === "error") {
        Swal.fire({
          icon: "error",
          text: "Failed to save product",
          toast: true,
          position: "top-right",
          timer: 2000,
        });
      }
    });
});

/* Form para editar un producto existente en la base de datos */

const updateProductForm = document.getElementById("updateProductForm");

updateProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formDataPut = new FormData(updateProductForm);
  fetch("/api/products", {
    method: "PUT",
    body: formDataPut,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.status === "success") {
        Swal.fire({
          icon: "success",
          text: "Product edited successfully",
          toast: true,
          position: "top-right",
          timer: 2000,
        });
        updateProductForm.reset();
      }
      if (res.status === "error") {
        Swal.fire({
          icon: "error",
          text: "Failed to edit product",
          toast: true,
          position: "top-right",
          timer: 2000,
        });
      }
    });
});

/* Orden de hacer fetch de productos */
fetch("/api/products", {
  method: "GET",
})
  .then((res) => res.json())
  .then((products) => {
    let productListContainer = document.querySelector("#productListContainer");
    productListContainer.innerHTML = "";
    if (products.length) {
      productListContainer.innerHTML +=
        '<h2 class="w-100 text-center">Products in Store:</h2>';
      products.forEach((product) => {
        const card = `
          <div class="card card-admin d-flex flex-column align-items-center p-2">
          <div class="d-flex flex-grow-1 flex-column justify-content-end w-75 align-items-center">
              <h6 class="text-center">${product.title}</h6>
              <img src="images/${product.thumbnail}" alt="product">
              <p class="text-center">${product.description}</p>
              <p class="text-center">$${product.price}</p>
              <p class="text-center">Stock: ${product.stock}</p>
              <p class="text-center">Code: ${product.code}</p>
              <button class="btn btn-warning btn-sm w-75 remove">Remove</button>
            </div>
          </div>
        `;
        productListContainer.innerHTML += card;
      });
      document.querySelectorAll(".remove").forEach((button) => {
        button.addEventListener("click", (e) => {
          const code =
            e.target.previousSibling.previousSibling.innerText.split(" ")[1];
          fetch("/api/products?" + new URLSearchParams({ code }), {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.status === "success") {
                Swal.fire({
                  icon: "success",
                  text: "Product removed successfully",
                  toast: true,
                  position: "top-right",
                  timer: 2000,
                });
              }
              if (res.status === "error") {
                Swal.fire({
                  icon: "error",
                  text: "Failed to remove product",
                  toast: true,
                  position: "top-right",
                  timer: 2000,
                });
              }
            });
        });
      });
    } else {
      productListContainer.innerHTML = "<h1>NO PRODUCTS FOUND</h1>";
    }
  });
