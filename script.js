const url = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4M2QyMGMwNTgzNTAwMTg1MjMwZjUiLCJpYXQiOjE3MDIzNzg3ODQsImV4cCI6MTcwMzU4ODM4NH0.ucOzMYZik6XPeXjnmmJpTuuPoZrqo0tqsNsdcRZ1nwo';

window.onload = async () => {
    try {
        await getProducts();
    } catch (err) {
        console.error(err);
    }
};

let allProducts = [];

const getProducts = async () => {
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        allProducts = data;
        displayProducts(allProducts);
    } catch (err) {
        console.error(err);
    }
};

const productsContainer = document.querySelector("#productsContainer > .row");

const displayProducts = (productsArray) => {
    productsContainer.innerHTML = "";
    const productsHTML = productsArray
        .map(({ name, description, brand, imageUrl, price, _id }) => {
            return `<div class="product-card d-flex col-3 card mb-4 shadow-sm">
                        <div class="m-1"><img class="card-img-top w-100" src="${imageUrl}" alt="product image" /></div>
                        <div class="card-body p-2">
                            <div class="d-flex flex-column justify-content-between align-items-center">
                                <strong class="card-title text-center">${name}</strong>
                                <p class="text-info">${brand}</p>
                                <p class="text-secondary">${description}</p>
                                <p class="text-info">${price === 0 ? "" : `$${price}`}</p>
                            </div>
                        </div>
                    </div>`;
        })
        .join("");
    productsContainer.innerHTML = productsHTML;
};
