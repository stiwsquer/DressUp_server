class CartItem {
  constructor(id, productId, cartId, quantity) {
    this.id = id;
    this.productId = productId;
    this.cartId = cartId;
    this.quantity = quantity;
  }
}

module.exports = {
  CartItem,
};
