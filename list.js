"use strict";

const productListUrl = "https://kea-alt-del.dk/t7/api/products";
const productGrid = document.querySelector(".product-grid");

getData();

function getData() {
  fetch(productListUrl)
    .then((response) => response.json())
    .then((products) => showProducts(products));
}

function showProducts(products) {
  // products er et array med produkt-objekter fra API'et
  productGrid.innerHTML = "";

  products.forEach((product) => {
    const discountPrice = Math.round(product.price - (product.price * product.discount) / 100);

    productGrid.innerHTML += `
      <a href="product.html" class="product-card ${product.discount ? "discount" : ""} ${product.soldout ? "soldout" : ""}">
        <div class="product-image">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
          ${product.soldout ? `<span class="badge">Sold out</span>` : product.discount ? `<span class="badge">-${product.discount}%</span>` : ""}
        </div>
        <h2>${product.productdisplayname}</h2>
        <p class="product-info">${product.articletype} | ${product.brandname}</p>
        <p class="price">
          ${product.discount ? `<del>DKK ${product.price},-</del> <span class="new-price">DKK ${discountPrice},-</span>` : `DKK ${product.price},-`}
        </p>
      </a>
    `;
  });
}
