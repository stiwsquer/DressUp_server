const {
  getAllCartsDAO,
  getCartByStatusDAO,
  getCartByIdDAO,
  getCartByUserIdDAO,
  saveCartDAO,
  updateCartDAO,
  removeCartDAO,
  removeCartByIdDAO,
  removeCardByUserIdDAO,
  getCartsByPlainObjectDAO,
} = require("../dao/cartDao");

const Cart = require("../models/Cart").Cart;

async function getAllCarts() {
  try {
    return await getAllCartsDAO();
  } catch (err) {
    console.log(err);
  }
}

async function getCartById(id) {
  try {
    return await getCartByIdDAO(id);
  } catch (err) {
    console.log(err);
  }
}

async function getCartByStatus(status) {
  try {
    return await getCartByStatusDAO(status);
  } catch (err) {
    console.log(err);
  }
}

async function getCartsByPlainObject(plainObject) {
  try {
    return await getCartsByPlainObjectDAO(plainObject);
  } catch (err) {
    console.log(err);
  }
}

async function getCartByUserId(userId) {
  try {
    return await getCartByUserIdDAO(userId);
  } catch (err) {
    console.log(err);
  }
}

async function saveCart(userId, status) {
  try {
    const newCart = new Cart();
    newCart.userId = userId;
    newCart.status = status;
    return await saveCartDAO(newCart);
  } catch (err) {
    console.log(err);
  }
}

async function updateCart(userId, id) {
  try {
    const cartToUpdate = id
      ? await getCartByIdDAO(id)
      : await getCartByUserIdDAO(userId);

    cartToUpdate.userId = userId ? userId : cartToUpdate.userId;
    return await updateCartDAO(cartToUpdate);
  } catch (err) {
    console.log(err);
  }
}

async function removeCart(cart) {
  try {
    return await removeCartDAO(cart);
  } catch (err) {
    console.log(err);
  }
}

async function removeCartById(id) {
  try {
    return await removeCartByIdDAO(id);
  } catch (err) {
    console.log(err);
  }
}

async function removeCardByUserId(userId) {
  try {
    return await removeCardByUserIdDAO(userId);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllCarts,
  getCartById,
  getCartByStatus,
  getCartsByPlainObject,
  getCartByUserId,
  saveCart,
  updateCart,
  removeCart,
  removeCartById,
  removeCardByUserId,
};
