const Order = require("../models/Order").Order;
const getConnection = require("typeorm").getConnection;

function getAllOrdersDAO() {
  const connection = getConnection();
  const orderRepository = connection.getRepository(Order);
  return orderRepository.find();
}

function getOrderByIdDAO(id) {
  const connection = getConnection();
  const orderRepository = connection.getRepository(Order);
  return orderRepository.findOne(id);
}

function getOrdersByStatusDAO(status) {
  const connection = getConnection();
  const orderRepository = connection.getRepository(Order);
  return orderRepository.findOne({ status: status });
}
function getOrdersByPlainObjectDAO(plainObject) {
  const connection = getConnection();
  const orderRepository = connection.getRepository(Order);
  return orderRepository.find(plainObject);
}

function getOrdersByUserIdDAO(userId) {
  const connection = getConnection();
  const orderRepository = connection.getRepository(Order);
  return orderRepository.find(userId);
}

function saveOrderDAO(order) {
  const connection = getConnection();
  const orderRepository = connection.getRepository(Order);
  return orderRepository.save(order);
}

function updateOrderDAO(order) {
  const connection = getConnection();
  const orderRepository = connection.getRepository(Order);
  return orderRepository.update(order);
}

function removeOrderDAO(order) {
  const connection = getConnection();
  const orderRepository = connection.getRepository(Order);
  return orderRepository.remove(order);
}

async function removeOrderByIdDAO(id) {
  try {
    const connection = getConnection();
    const orderRepository = connection.getRepository(Order);
    const orderToRemove = await orderRepository.findOne(id);
    return orderRepository.remove(orderToRemove);
  } catch (err) {
    console.log(err);
  }
}

async function removeOrderByUserIdDAO(userId) {
  try {
    const connection = getConnection();
    const orderRepository = connection.getRepository(Order);
    const orderToRemove = await orderRepository.findOne({ userId: userId });
    return orderRepository.remove(orderToRemove);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
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
};
