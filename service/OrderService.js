const {
  getAllOrdersDAO,
  getOrdersByStatusDAO,
  getOrderByIdDAO,
  getOrdersByUserIdDAO,
  saveOrderDAO,
  updateOrderDAO,
  removeOrderDAO,
  removeOrderByIdDAO,
  removeOrderByUserIdDAO,
  getOrdersByPlainObjectDAO,
} = require("../dao/orderDao");

const Order = require("../models/Order").Order;

async function getAllOrders() {
  try {
    return await getAllOrdersDAO();
  } catch (err) {
    console.log(err);
  }
}

async function getOrderById(id) {
  try {
    return await getOrderByIdDAO(id);
  } catch (err) {
    console.log(err);
  }
}

async function getOrdersByStatus(status) {
  try {
    return await getOrdersByStatusDAO(status);
  } catch (err) {
    console.log(err);
  }
}

async function getOrdersByPlainObject(plainObject) {
  try {
    return await getOrdersByPlainObjectDAO(plainObject);
  } catch (err) {
    console.log(err);
  }
}

async function getOrdersByUserId(id) {
  try {
    return await getOrdersByUserIdDAO(id);
  } catch (err) {
    console.log(err);
  }
}

async function saveOrder(status, userId) {
  try {
    const newOrder = new Order();
    newOrder.status = status;
    newOrder.userId = userId;
    return await saveOrderDAO(newOrder);
  } catch (err) {
    console.log(err);
  }
}

async function updateOrder(status, userId, id) {
  try {
    const orderToUpdate = await getOrderByIdDAO(id);

    orderToUpdate.productId = status ? status : orderToUpdate.status;
    orderToUpdate.userId = userId ? userId : orderToUpdate.userId;

    return await updateOrderDAO(orderToUpdate);
  } catch (err) {
    console.log(err);
  }
}

async function removeOrder(orderObj) {
  try {
    return await removeOrderDAO(orderObj);
  } catch (err) {
    console.log(err);
  }
}

async function removeOrderById(id) {
  try {
    return await removeOrderByIdDAO(id);
  } catch (err) {
    console.log(err);
  }
}

async function removeOrderByUserId(userId) {
  try {
    return await removeOrderByUserIdDAO(userId);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllOrdersItems,
  getOrderById,
  getOrdersByProductId,
  getOrdersByOrderId,
  getOrdersItemsByQuantity,
  getOrdersItemsByPlainObject,
  saveOrder,
  updateOrder,
  removeOrder,
  removeOrderById,
  removeOrderByProductId,
};
