const OrderItem = require("../models/OrderItem").OrderItem;
const getConnection = require("typeorm").getConnection;

function getAllOrdersItemsDAO() {
  const connection = getConnection();
  const orderItemRepository = connection.getRepository(OrderItem);
  return orderItemRepository.find();
}

function getOrderItemByIdDAO(id) {
  const connection = getConnection();
  const orderItemRepository = connection.getRepository(OrderItem);
  return orderItemRepository.findOne(id);
}

function getOrderItemsByProductIdDAO(productId) {
  const connection = getConnection();
  const orderItemRepository = connection.getRepository(OrderItem);
  return orderItemRepository.find({ productId: productId });
}

function getOrderItemsByCartIdDAO(cartId) {
  const connection = getConnection();
  const orderItemRepository = connection.getRepository(OrderItem);
  return orderItemRepository.find({ cartId: cartId });
}

function getCartsItemsByQuantityDAO(quantity) {
  const connection = getConnection();
  const orderItemRepository = connection.getRepository(OrderItem);
  return orderItemRepository.find({ quantity: quantity });
}

function getCartsItemsByPlainObjectDAO(plainObject) {
  const connection = getConnection();
  const orderItemRepository = connection.getRepository(OrderItem);
  return orderItemRepository.find(plainObject);
}

function saveOrderItemDAO(orderItem) {
  const connection = getConnection();
  const orderItemRepository = connection.getRepository(OrderItem);
  return orderItemRepository.save(orderItem);
}

function updateOrderItemDAO(orderItem) {
  const connection = getConnection();
  const orderItemRepository = connection.getRepository(OrderItem);
  return orderItemRepository.update(orderItem);
}

function removeOrderItemDAO(orderItem) {
  const connection = getConnection();
  const orderItemRepository = connection.getRepository(OrderItem);
  return orderItemRepository.remove(orderItem);
}

async function removeOrderItemByIdDAO(id) {
  try {
    const connection = getConnection();
    const orderItemRepository = connection.getRepository(OrderItem);
    const orderItemToRemove = await orderItemRepository.findOne(id);
    return orderItemRepository.remove(orderItemToRemove);
  } catch (err) {
    console.log(err);
  }
}

async function removeOrderItemByProductIdDAO(productId) {
  try {
    const connection = getConnection();
    const orderItemRepository = connection.getRepository(OrderItem);
    const orderItemToRemove = await orderItemRepository.findOne({
      productId: productId,
    });
    return orderItemRepository.remove(orderItemToRemove);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllOrdersItemsDAO,
  getOrderItemByIdDAO,
  getOrderItemsByProductIdDAO,
  getOrderItemsByCartIdDAO,
  getCartsItemsByQuantityDAO,
  getCartsItemsByPlainObjectDAO,
  saveOrderItemDAO,
  updateOrderItemDAO,
  removeOrderItemDAO,
  removeOrderItemByIdDAO,
  removeOrderItemByProductIdDAO,
};
