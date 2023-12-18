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
  loadingIndicator.show();  
   try {
    await getProducts();
  } catch (err) {
    console.error(err);
  } finally {
    loadingIndicator.hide();
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
    throw err;
  }
};


const productsContainer = document.querySelector("#productsContainer > .row");

const displayProducts = (productsArray) => {
  if (productsContainer) {
    productsContainer.innerHTML = productsArray
      .map(
        ({ name, description, brand, imageUrl, price, _id }) => `
          <div class="product-card d-flex col-3 card m-3 shadow-sm p-2">
            <div class="m-1">
            <strong class="shirt_text card-title text-center">${name}</strong>
            <img class="card-img-top w-100" src="${imageUrl}" alt="${description}" /></div>
            <div class="card-body p-2">
              <div class="d-flex flex-column justify-content-between align-items-center">
                
                <p class="text-info">${brand}</p>
                <p class="text-secondary">${description}</p>
                <p class="text-info"> Price : ${price === 0 ? "" : `$${price}`}</p>
              </div>
            </div>
              <div class="btn_main">
              <div class="buy_bt"><a href="#">Buy Now</a></div>
              <div class="seemore_bt"><a href="./detail.html?id=${_id}">Details</a></div>
              </div>
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

