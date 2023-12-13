const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4M2QyMGMwNTgzNTAwMTg1MjMwZjUiLCJpYXQiOjE3MDIzNzg3ODQsImV4cCI6MTcwMzU4ODM4NH0.ucOzMYZik6XPeXjnmmJpTuuPoZrqo0tqsNsdcRZ1nwo";


const productDetailsContainer = document.querySelector("#productDetailsContainer > .row");

document.addEventListener("DOMContentLoaded", async () => {
      await getProductDetails();
    
  });

const getProductDetails = async () => {
    console.log("Getting product details");
    try {
        const productId = getProductIdFromURL();
        const response = await fetch(`${apiUrl}/${productId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Product details details: " + displayProductDetails(data));
        displayProductDetails(data);
    } catch (err) {
        console.error(err);
    }
  };
  
  const displayProductDetails = (productsD) => {
    if (productDetailsContainer) {
      const { name, description, brand, imageUrl, price, rating, category, stock, createdAt } = productsD;
      productDetailsContainer.innerHTML = `
        <div class="col-12">
          <h1>${name}</h1>
          <img src="${imageUrl}" alt="${description}" class="img-fluid mb-4" />
          <p>Description: ${description}</p>
          <p>Brand: ${brand}</p>
          <p>Price: ${price === 0 ? 'Free' : `$${price}`}</p>
          <p>Rating: ${rating || 'N/A'}</p>
          <p>Category: ${category || 'N/A'}</p>
          <p>Stock: ${stock || 'N/A'}</p>
          <p>Created At: ${createdAt || 'N/A'}</p>
        </div>`;
    } else {
      console.error("Product details container not found");
    }
  };
  function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
  }

  function backoffice() {
    window.location.href = "./backoffice.html";
  }

  console.log("Product Details Container:", productDetailsContainer);

