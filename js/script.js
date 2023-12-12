const url = "https://striveschool-api.herokuapp.com/api/product/";
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

const getProducts = async () => {
  try {
    const response = await fetch(url, {
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
    // Handle errors gracefully (e.g., display an error message to the user)
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
                <div class="product-card d-flex col-3 card mb-4 shadow-sm">
                    <div class="m-1"><img class="card-img-top w-100" src="${imageUrl}" alt="product image" /></div>
                    <div class="card-body p-2">
                        <div class="d-flex flex-column justify-content-between align-items-center">
                            <strong class="card-title text-center">${name}</strong>
                            <p class="text-info">${brand}</p>
                            <p class="text-secondary">${description}</p>
                            <p class="text-info">${price === 0 ? "" : `$${price}`}</p>
                        </div>
                    </div>
                    <a href="./detail.html" class="btn btn-primary stretched-link">Details</a>
                    <button class="btn btn-warning mt-2" data-product-id="${_id}">Modifica</button>
                </div>
            `
      )
      .join("");
  } else {
    console.error("Products container not found");
  }
};

// Use the 'DOMContentLoaded' event to ensure the script runs after the DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
  loadingIndicator.show();
  await getProducts();
});

// Use 'click' event on the document to handle button clicks
document.addEventListener("click", (event) => {
  const editButton = event.target.closest(".btn-warning");
  if (editButton) {
    const productId = editButton.getAttribute("data-product-id");
    editProduct(productId);
  }
});

function editProduct(productId) {
  window.location.href = `./backoffice.html?id=${productId}`;
}