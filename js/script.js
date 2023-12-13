const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4M2QyMGMwNTgzNTAwMTg1MjMwZjUiLCJpYXQiOjE3MDIzNzg3ODQsImV4cCI6MTcwMzU4ODM4NH0.ucOzMYZik6XPeXjnmmJpTuuPoZrqo0tqsNsdcRZ1nwo";

class LoadingIndicator {
  constructor() {
    this.element = document.getElementById("loadingIndicator");
  }

  show() {
    if (this.element) {
      this.element.style.display = "block";
    }
  }

  hide() {
    if (this.element) {
      this.element.style.display = "none";
    }
  }
}

const loadingIndicator = new LoadingIndicator();


document.addEventListener("DOMContentLoaded", async () => {
  loadingIndicator.show(); {
    await getProducts();
  }
});

const getProducts = async () => {
  console.log("Getting products");
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    displayProducts(data);
  } catch (err) {
    console.error(err);
  } finally {
    loadingIndicator.hide();
  }
};


const productsContainer = document.querySelector("#productsContainer > .row");

const displayProducts = (productsArray) => {
  if (productsContainer) {
    productsContainer.innerHTML = productsArray
      .map(
        ({ name, description, brand, imageUrl, price, _id }) => `
          <div class="product-card d-flex col-3 card m-4 shadow-sm">
            <div class="m-1"><img class="card-img-top w-100" src="${imageUrl}" alt="${description}" /></div>
            <div class="card-body p-2">
              <div class="d-flex flex-column justify-content-between align-items-center">
                <strong class="card-title text-center">${name}</strong>
                <p class="text-info">${brand}</p>
                <p class="text-secondary">${description}</p>
                <p class="text-info">${price === 0 ? "" : `$${price}`}</p>
              </div>
            </div>
            <a href="./detail.html?id=${_id}" class="btn btn-primary stretched-link mb-4">Details</a>
          </div>`
      )
      .join("");
  } else {
    console.error("Products container not found");
  }
};


function backoffice() {
  window.location.href = "./backoffice.html";
}
console.log("Products Container:", productsContainer);

