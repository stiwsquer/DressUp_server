const {
  getAllProductsDAO,
  getProductByTitleDAO,
  getProductByIdDAO,
  getProductsByPriceDAO,
  getProductsByQuantityDAO,
  saveProductDAO,
  removeProductDAO,
  removeProductByIdDAO,
  removeProductByTitleDAO,
  updateProductDAO,
} = require("../dao/productDao");

const Product = require("../models/Product").Product;

async function getAllProducts() {
  try {
    const allProducts = await getAllProductsDAO();
    return allProducts;
  } catch (err) {
    console.log(err);
  }
}

async function getProductById(id) {
  try {
    return await getProductByIdDAO(id);
  } catch (err) {
    console.log(err);
  }
}

async function getProductByTitle(title) {
  try {
    return await getProductByTitleDAO(title);
  } catch (err) {
    console.log(err);
  }
}

async function getProductsByPrice(price) {
  try {
    return await getProductsByPriceDAO(price);
  } catch (err) {
    console.log(err);
  }
}

async function getProductsByQuantity(quantity) {
  try {
    return await getProductsByQuantityDAO(quantity);
  } catch (err) {
    console.log(err);
  }
}

async function saveProduct(title, text, price, quantity) {
  try {
    const newProduct = new Product();
    newProduct.title = title;
    newProduct.text = text;
    newProduct.price = price;
    newProduct.quantity = quantity;
    return await saveProductDAO(newProduct);
  } catch (err) {
    console.log(err);
  }
}

async function updateProduct(title, text, price, quantity) {
  try {
    const productToUpdate = id
      ? await getProductByIdDAO(id)
      : await getProductByEmailDAO(email);
    productToUpdate.title = title ? title : productToUpdate.title;
    productToUpdate.text = text ? text : productToUpdate.text;
    productToUpdate.price = price ? price : productToUpdate.price;
    productToUpdate.quantity = quantity ? quantity : productToUpdate.quantity;

    return await updateProductDAO(productToUpdate);
  } catch (err) {
    console.log(err);
  }
}

async function removeProduct(productObj) {
  try {
    return await removeProductDAO(productObj);
  } catch (err) {
    console.log(err);
  }
}

async function removeProductById(id) {
  try {
    return await removeProductByIdDAO(id);
  } catch (err) {
    console.log(err);
  }
}

async function removeProductByTitle(title) {
  try {
    return await removeProductByTitleDAO(title);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  saveProduct,
  updateProduct,
  removeProduct,
  removeProductById,
  getProductByTitle,
  getProductsByPrice,
  getProductsByQuantity,
  removeProductByTitle,
};
