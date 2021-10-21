const CartItem = require("../models/CartItem").CartItem;
const getConnection = require("typeorm").getConnection;

function getAllCartsItemsDAO() {
  const connection = getConnection();
  const cartItemRepository = connection.getRepository(CartItem);
  return cartItemRepository.find();
}

function getCartItemByIdDAO(id) {
  const connection = getConnection();
  const cartItemRepository = connection.getRepository(CartItem);
  return cartItemRepository.findOne(id);
}

function getCartItemsByProductIdDAO(productId) {
  const connection = getConnection();
  const cartItemRepository = connection.getRepository(CartItem);
  return cartItemRepository.find({ productId: productId });
}

function getCartItemsByCartIdDAO(cartId) {
  const connection = getConnection();
  const cartItemRepository = connection.getRepository(CartItem);
  return cartItemRepository.find({ cartId: cartId });
}

function getCartsItemsByQuantityDAO(quantity) {
  const connection = getConnection();
  const cartItemRepository = connection.getRepository(CartItem);
  return cartItemRepository.find({ quantity: quantity });
}

function getCartsItemsByPlainObjectDAO(plainObject) {
  const connection = getConnection();
  const cartItemRepository = connection.getRepository(CartItem);
  return cartItemRepository.find(plainObject);
}

function saveCartItemDAO(cartItem) {
  const connection = getConnection();
  const cartItemRepository = connection.getRepository(CartItem);
  return cartItemRepository.save(cartItem);
}

function updateCartItemDAO(cartItem) {
  const connection = getConnection();
  const cartItemRepository = connection.getRepository(CartItem);
  return cartItemRepository.update(cartItem);
}

function removeCartItemDAO(cartItem) {
  const connection = getConnection();
  const cartItemRepository = connection.getRepository(CartItem);
  return cartItemRepository.remove(cartItem);
}

async function removeCartItemByIdDAO(id) {
  try {
    const connection = getConnection();
    const cartItemRepository = connection.getRepository(CartItem);
    const cartItemToRemove = await cartItemRepository.findOne(id);
    return cartItemRepository.remove(cartItemToRemove);
  } catch (err) {
    console.log(err);
  }
}

async function removeCardItemByProductIdDAO(productId) {
  try {
    const connection = getConnection();
    const cartItemRepository = connection.getRepository(CartItem);
    const cartItemToRemove = await cartItemRepository.findOne({
      productId: productId,
    });
    return cartItemRepository.remove(cartItemToRemove);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllCartsItemsDAO,
  getCartItemByIdDAO,
  getCartItemsByProductIdDAO,
  getCartItemsByCartIdDAO,
  getCartsItemsByQuantityDAO,
  getCartsItemsByPlainObjectDAO,
  saveCartItemDAO,
  updateCartItemDAO,
  removeCartItemDAO,
  removeCartItemByIdDAO,
  removeCardItemByProductIdDAO,
};
