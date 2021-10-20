class Category {
  constructor(id, parentCategoryId, title) {
    this.id = id;
    this.parentCategoryId = parentCategoryId;
    this.title = title;
  }
}

module.exports = {
  Category,
};
