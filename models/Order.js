class Order {
  constructor(id, userId, status, createdAt) {
    this.id = id;
    this.userId = userId;
    this.status = status;
    this.createdAt = createdAt;
  }
}

module.exports = {
  Order,
};
