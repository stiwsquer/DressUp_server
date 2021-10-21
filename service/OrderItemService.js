const {
  getAllOrdersItemsDAO,
  getOrderItemByIdDAO,
  getOrderItemsByProductIdDAO,
  getOrdersItemsByQuantityDAO,
  getOrdersItemsByPlainObjectDAO,
  getOrderItemsByOrderIdDAO,
  saveOrderItemDAO,
  updateOrderItemDAO,
  removeOrderItemDAO,
  removeOrderItemByIdDAO,
  removeOrderItemByProductIdDAO,
} = require("../dao/orderItemDao");

const OrderItem = require("../models/OrderItem").OrderItem;

async function getAllOrdersItems() {
  try {
    const allOrderItems = await getAllOrdersItemsDAO();
    return allOrderItems;
  } catch (err) {
    console.log(err);
  }
}

async function getOrderItemById(id) {
  try {
    return await getOrderItemByIdDAO(id);
  } catch (err) {
    console.log(err);
  }
}

async function getOrderItemsByProductId(productId) {
  try {
    return await getOrderItemsByProductIdDAO(productId);
  } catch (err) {
    console.log(err);
  }
}

async function getOrderItemsByOrderId(orderId) {
  try {
    return await getOrderItemsByOrderIdDAO(orderId);
  } catch (err) {
    console.log(err);
  }
}

async function getOrdersItemsByQuantity(quantity) {
  try {
    return await getOrdersItemsByQuantityDAO(quantity);
  } catch (err) {
    console.log(err);
  }
}

async function getOrdersItemsByPlainObject(plainObject) {
  try {
    return await getOrdersItemsByPlainObjectDAO(plainObject);
  } catch (err) {
    console.log(err);
  }
}
async function saveOrderItem(productId, orderId, quantity) {
  try {
    const newOrderItem = new OrderItem();
    newOrderItem.productId = productId;
    newOrderItem.orderId = orderId;
    newOrderItem.quantity = quantity;
    return await saveOrderItemDAO(newOrderItem);
  } catch (err) {
    console.log(err);
  }
}

async function updateOrderItem(productId, orderId, quantity, id) {
  try {
    const orderItemToUpdate = id
      ? await getOrderItemByIdDAO(id)
      : await getOrderItemsByOrderIdDAO(orderId);
    orderItemToUpdate.productId = productId
      ? productId
      : orderItemToUpdate.productId;
    orderItemToUpdate.orderId = orderId ? orderId : orderItemToUpdate.orderId;
    orderItemToUpdate.quantity = quantity
      ? quantity
      : orderItemToUpdate.quantity;
    return await updateOrderItemDAO(orderItemToUpdate);
  } catch (err) {
    console.log(err);
  }
}

async function removeOrderItem(orderItemObj) {
  try {
    return await removeOrderItemDAO(orderItemObj);
  } catch (err) {
    console.log(err);
  }
}

async function removeOrderItemById(id) {
  try {
    return await removeOrderItemByIdDAO(id);
  } catch (err) {
    console.log(err);
  }
}

async function removeOrderItemByProductId(productId) {
  try {
    return await removeOrderItemByProductIdDAO(productId);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllOrdersItems,
  getOrderItemById,
  getOrderItemsByProductId,
  getOrderItemsByOrderId,
  getOrdersItemsByQuantity,
  getOrdersItemsByPlainObject,
  saveOrderItem,
  updateOrderItem,
  removeOrderItem,
  removeOrderItemById,
  removeOrderItemByProductId,
};
