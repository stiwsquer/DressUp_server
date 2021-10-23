const {
  getAllCategoriesDAO,
  getCategoryByIdDAO,
  getCategoryByTitleDAO,
  saveCategoryDAO,
  updateCategoryDAO,
  removeCategoryDAO,
  removeCategoryByIdDAO,
  removeCategoryByTitleDAO,
  getCategoriesByPlainObjectDAO,
} = require("../dao/categoryDao");

const Category = require("../models/Category").Category;

async function getAllCategories() {
  try {
    return await getAllCategoriesDAO();
  } catch (err) {
    console.log(err);
  }
}

async function getCategoryById(id) {
  try {
    return await getCategoryByIdDAO(id);
  } catch (err) {
    console.log(err);
  }
}

async function getCategoryByTitle(title) {
  try {
    return await getCategoryByTitleDAO(title);
  } catch (err) {
    console.log(err);
  }
}

async function getCategoriesByPlainObject(plainObject) {
  try {
    return await getCategoriesByPlainObjectDAO(plainObject);
  } catch (err) {
    console.log(err);
  }
}

async function saveCategory(title) {
  try {
    const newCategory = new Category();
    newCategory.title = title;
    return await saveCategoryDAO(newCategory);
  } catch (err) {
    console.log(err);
  }
}

async function updateCategory(title, id) {
  try {
    const categoryToUpdate = id
      ? await getCategoryByIdDAO(id)
      : await getCategoryByTitleDAO(title);

    categoryToUpdate.title = title ? title : categoryToUpdate.title;
    return await updateCategoryDAO(categoryToUpdate);
  } catch (err) {
    console.log(err);
  }
}

async function removeCategory(category) {
  try {
    return await removeCategoryDAO(category);
  } catch (err) {
    console.log(err);
  }
}

async function removeCategoryById(id) {
  try {
    return await removeCategoryByIdDAO(id);
  } catch (err) {
    console.log(err);
  }
}

async function removeCategoryByTitle(title) {
  try {
    return await removeCategoryByTitleDAO(title);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoryByTitle,
  getCategoriesByPlainObject,
  saveCategory,
  updateCategory,
  removeCategory,
  removeCategoryById,
  removeCategoryByTitle,
};
