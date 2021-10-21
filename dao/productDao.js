const Product = require("../models/Product").Product;
const getConnection = require("typeorm").getConnection;

function getAllProductsDAO() {
  const connection = getConnection();
  const productRepository = connection.getRepository(Product);
  return productRepository.find();
}

function getProductByIdDAO(id) {
  const connection = getConnection();
  const productRepository = connection.getRepository(Product);
  return productRepository.findOne(id);
}

function getProductByTitleDAO(title) {
  const connection = getConnection();
  const productRepository = connection.getRepository(Product);
  return productRepository.findOne({ title: title });
}
function getProductsByPlainObjectDAO(plainObject) {
  const connection = getConnection();
  const productRepository = connection.getRepository(Product);
  return productRepository.find(plainObject);
}

function getProductsByPriceDAO(price) {
  const connection = getConnection();
  const productRepository = connection.getRepository(Product);
  return productRepository.find({ price: price });
}

function getProductsByQuantityDAO(quantity) {
  const connection = getConnection();
  const productRepository = connection.getRepository(Product);
  return productRepository.find({ quantity: quantity });
}

function saveProductDAO(product) {
  const connection = getConnection();
  const productRepository = connection.getRepository(Product);
  return productRepository.save(product);
}

function updateProductDAO(product) {
  const connection = getConnection();
  const productRepository = connection.getRepository(Product);
  return productRepository.update(product);
}

function removeProductDAO(product) {
  const connection = getConnection();
  const productRepository = connection.getRepository(Product);
  return productRepository.remove(product);
}

async function removeProductByIdDAO(id) {
  try {
    const connection = getConnection();
    const productRepository = connection.getRepository(Product);
    const productToRemove = await productRepository.findOne(id);
    return productRepository.remove(productToRemove);
  } catch (err) {
    console.log(err);
  }
}

async function removeProductByTitleDAO(title) {
  try {
    const connection = getConnection();
    const productRepository = connection.getRepository(Product);
    const productToRemove = await productRepository.findOne({ title: title });
    return productRepository.remove(productToRemove);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
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
  getProductsByPlainObjectDAO,
};
