const Category = require("../models/Category").Category;
const getConnection = require("typeorm").getConnection;

function getAllCategoriesDAO() {
  const connection = getConnection();
  const categoryRepository = connection.getRepository(Category);
  return categoryRepository.find();
}

function getCategoryByIdDAO(id) {
  const connection = getConnection();
  const categoryRepository = connection.getRepository(Category);
  return categoryRepository.findOne(id);
}

function getCategoryByTitleDAO(title) {
  const connection = getConnection();
  const categoryRepository = connection.getRepository(Category);
  return categoryRepository.findOne({ title: title });
}

function saveCategoryDAO(category) {
  const connection = getConnection();
  const categoryRepository = connection.getRepository(Category);
  return categoryRepository.save(category);
}

function updateCategoryDAO(category) {
  const connection = getConnection();
  const categoryRepository = connection.getRepository(Category);
  return categoryRepository.update(category);
}

function removeCategoryDAO(category) {
  const connection = getConnection();
  const categoryRepository = connection.getRepository(Category);
  return categoryRepository.remove(category);
}

async function removeCategoryByIdDAO(id) {
  try {
    const connection = getConnection();
    const categoryRepository = connection.getRepository(Category);
    const categoryToRemove = await categoryRepository.findOne(id);
    return categoryRepository.remove(categoryToRemove);
  } catch (err) {
    console.log(err);
  }
}

async function removeCategoryByTitleDAO(title) {
  try {
    const connection = getConnection();
    const categoryRepository = connection.getRepository(Category);
    const categoryToRemove = await categoryRepository.findOne({ title: title });
    return categoryRepository.remove(categoryToRemove);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllCategoriesDAO,
  getCategoryByIdDAO,
  getCategoryByTitleDAO,
  saveCategoryDAO,
  updateCategoryDAO,
  removeCategoryDAO,
  removeCategoryByIdDAO,
  removeCategoryByTitleDAO,
};
