const url = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4M2QyMGMwNTgzNTAwMTg1MjMwZjUiLCJpYXQiOjE3MDIzNzg3ODQsImV4cCI6MTcwMzU4ODM4NH0.ucOzMYZik6XPeXjnmmJpTuuPoZrqo0tqsNsdcRZ1nwo";

// Reusable Headers
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: apiKey,
});

// Centralized Error Handling
const handleError = (error) => {
  console.error(error);
};



const removeElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) element.remove();
};


const reset = () => {
  if (confirm("Are you sure you want to reset the form?")) {
    document.querySelector("#productForm").reset();
  }
};

window.onload = async () => {
  try {
    const parameters = new URLSearchParams(location.search);
    ID = parameters.get("id");
    if (ID !== null) {
      // Editing a product
      removeElement("#publishButton");
      removeElement("#publishedProducts table");

      const response = await fetch(`${url}/${ID}`, {
        headers: getHeaders(),
      });

      if (response.ok) {
        const { name, description, brand, imageUrl, price } = await response.json();
        document.querySelector("#productName").value = name;
        document.querySelector("#productDescription").value = description;
        document.querySelector("#productBrand").value = brand;
        document.querySelector("#productImageURL").value = imageUrl;
        document.querySelector("#productPrice").value = price;
      } else {
        handleError(response);
      }
    } else {
      getProducts();
      removeElement("#editButton");
      removeElement("#backButton");
    }
  } catch (error) {
    handleError(error);
  }
};

const publish = async (publishEvent) => {
  try {
    publishEvent.preventDefault();

    const newProduct = {
      name: document.querySelector("#productName").value,
      description: document.querySelector("#productDescription").value,
      brand: document.querySelector("#productBrand").value,
      imageUrl: document.querySelector("#productImageURL").value,
      price: document.querySelector("#productPrice").value,
    };

    const optionsForPublishing = {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: new Headers(getHeaders()),
    };

    const response = await fetch(url, optionsForPublishing);

    if (response.ok) {
      console.log("Publishing successful");
      resetForm();
      getProducts();
    } else {
      handleError("Publishing error");
    }
  } catch (error) {
    handleError(error);
  }
};

const edit = async (editEvent) => {
  try {
    editEvent.preventDefault();

    const editedProduct = {
      name: document.querySelector("#productName").value,
      description: document.querySelector("#productDescription").value,
      brand: document.querySelector("#productBrand").value,
      imageUrl: document.querySelector("#productImageURL").value,
      price: document.querySelector("#productPrice").value,
    };

    const optionsForEditing = {
      method: "PUT",
      body: JSON.stringify(editedProduct),
      headers: new Headers(getHeaders()),
    };

    const response = await fetch(`${url}/${ID}`, optionsForEditing);

    if (response.ok) {
      console.log("Editing Successful");
    } else {
      handleError("Editing error");
    }
  } catch (error) {
    handleError(error);
  }
};

const getProducts = async () => {
  console.log("Getting products");
  try {
    const response = await fetch(url, {
      headers: getHeaders(),
    });
    const productsData = await response.json();
    displayProductsToAdmin(productsData);
  } catch (error) {
    handleError(error);
  }
};

const publishedProductsContainer = document.querySelector("#publishedProducts tbody");

const displayProductsToAdmin = (productsArray) => {
  const productsHTML = productsArray
    .map(({ name, brand, _id, imageUrl }) => `
      <tr>
        <td class="w-25"><img src="${imageUrl}" style="object-fit: contain; width:45px; height: 45px"></td>
        <td class="w-25">${name}, ${brand}</td>
        <td class="w-25">${_id}</td>
        <td class="w-25">
          <div class="btn-group mx-auto">
            <a href='./backoffice.html?id=${_id}' type="button" class="btn btn-sm btn-outline-secondary">Edit Product</a>
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="deleteProduct('${_id}')">Delete Listing</button>
          </div>
        </td>
      </tr>`
    ).join("");

  publishedProductsContainer.innerHTML = productsHTML;
};

const deleteProduct = async (productToDeleteID) => {
  try {
    if (confirm("Are you sure you want to delete this product?")) {
      const response = await fetch(`${url}/${productToDeleteID}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (response.ok) {
        getProducts();
      } else {
        handleError("Error deleting product");
      }
    }
  } catch (error) {
    handleError(error);
  }
};
