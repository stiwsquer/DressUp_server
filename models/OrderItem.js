class OrderItem {
  constructor(id, productId, orderId, quantity) {
    this.id = id;
    this.productId = productId;
    this.orderId = orderId;
    this.quantity = quantity;
  }
}

module.exports = {
  OrderItem,
};
