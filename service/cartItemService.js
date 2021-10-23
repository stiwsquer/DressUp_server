const {
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
} = require("../dao/cartItemDao");

const CartItem = require("../models/CartItem").CartItem;

async function getAllCartsItems() {
  try {
    return await getAllCartsItemsDAO();
  } catch (err) {
    console.log(err);
  }
}

async function getCartItemById(id) {
  try {
    return await getCartItemByIdDAO(id);
  } catch (err) {
    console.log(err);
  }
}

async function getCartItemsByProductId(productId) {
  try {
    return await getCartItemsByProductIdDAO(productId);
  } catch (err) {
    console.log(err);
  }
}

async function getCartItemsByCartId(cartId) {
  try {
    return await getCartItemsByCartIdDAO(cartId);
  } catch (err) {
    console.log(err);
  }
}

async function getCartsItemsByQuantity(quantity) {
  try {
    return await getCartsItemsByQuantityDAO(quantity);
  } catch (err) {
    console.log(err);
  }
}

async function getCartsItemsByPlainObject(plainObject) {
  try {
    return await getCartsItemsByPlainObjectDAO(plainObject);
  } catch (err) {
    console.log(err);
  }
}

async function saveCartItem(productId, cartId, quantity) {
  try {
    const newCartItem = new CartItem();
    newCartItem.productId = productId;
    newCartItem.cartId = cartId;
    newCartItem.quantity = quantity;
    return await saveCartItemDAO(newCartItem);
  } catch (err) {
    console.log(err);
  }
}

async function updateCartItem(productId, cartId, quantity, id) {
  try {
    const cartItemToUpdate = await getCartItemByIdDAO(id);

    cartItemToUpdate.productId = productId
      ? productId
      : cartItemToUpdate.productId;
    cartItemToUpdate.cartId = cartId ? cartId : cartItemToUpdate.cartId;
    cartItemToUpdate.quantity = quantity ? quantity : cartItemToUpdate.quantity;
    return await updateCartItemDAO(cartItemToUpdate);
  } catch (err) {
    console.log(err);
  }
}

async function removeCartItem(cartItem) {
  try {
    return await removeCartItemDAO(cartItem);
  } catch (err) {
    console.log(err);
  }
}

async function removeCartItemById(id) {
  try {
    return await removeCartItemByIdDAO(id);
  } catch (err) {
    console.log(err);
  }
}

async function removeCardItemByProductId(productId) {
  try {
    return await removeCardItemByProductIdDAO(productId);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllCartsItems,
  getCartItemById,
  getCartItemsByProductId,
  getCartItemsByCartId,
  getCartsItemsByQuantity,
  getCartsItemsByPlainObject,
  saveCartItem,
  updateCartItem,
  removeCartItem,
  removeCartItemById,
  removeCardItemByProductId,
};
