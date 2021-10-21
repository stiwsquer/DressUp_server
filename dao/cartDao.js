const Cart = require("../models/Cart").Cart;
const getConnection = require("typeorm").getConnection;

function getAllCartsDAO() {
  const connection = getConnection();
  const cartRepository = connection.getRepository(Cart);
  return cartRepository.find();
}

function getCartByIdDAO(id) {
  const connection = getConnection();
  const cartRepository = connection.getRepository(Cart);
  return cartRepository.findOne(id);
}

function getCartByStatusDAO(status) {
  const connection = getConnection();
  const cartRepository = connection.getRepository(Cart);
  return cartRepository.findOne({ status: status });
}

function getCartByUserIdDAO(userId) {
  const connection = getConnection();
  const cartRepository = connection.getRepository(Cart);
  return cartRepository.findOne(userId);
}

function saveCartDAO(cart) {
  const connection = getConnection();
  const cartRepository = connection.getRepository(Cart);
  return cartRepository.save(cart);
}

function updateCartDAO(cart) {
  const connection = getConnection();
  const cartRepository = connection.getRepository(Cart);
  return cartRepository.update(cart);
}

function removeCartDAO(cart) {
  const connection = getConnection();
  const cartRepository = connection.getRepository(Cart);
  return cartRepository.remove(cart);
}

async function removeCartByIdDAO(id) {
  try {
    const connection = getConnection();
    const cartRepository = connection.getRepository(Cart);
    const cartToRemove = await cartRepository.findOne(id);
    return cartRepository.remove(cartToRemove);
  } catch (err) {
    console.log(err);
  }
}

async function removeCardByUserIdDAO(userId) {
  try {
    const connection = getConnection();
    const cartRepository = connection.getRepository(Cart);
    const cartToRemove = await cartRepository.findOne({ userId: userId });
    return cartRepository.remove(cartToRemove);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllCartsDAO,
  getCartByStatusDAO,
  getCartByIdDAO,
  getCartByUserIdDAO,
  saveCartDAO,
  updateCartDAO,
  removeCartDAO,
  removeCartByIdDAO,
  removeCardByUserIdDAO,
};
