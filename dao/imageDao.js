const Image = require("../models/Image").Image;
const getConnection = require("typeorm").getConnection;

function getAllImagesDAO() {
  const connection = getConnection();
  const imageRepository = connection.getRepository(Image);
  return imageRepository.find();
}

function getImageByIdDAO(id) {
  const connection = getConnection();
  const imageRepository = connection.getRepository(Image);
  return imageRepository.findOne(id);
}
function getImagesByPlainObjectDAO(plainObject) {
  const connection = getConnection();
  const imageRepository = connection.getRepository(Image);
  return imageRepository.find(plainObject);
}

function getImageByProductIdDAO(productId) {
  const connection = getConnection();
  const imageRepository = connection.getRepository(Image);
  return imageRepository.findOne(productId);
}

function saveImageDAO(image) {
  const connection = getConnection();
  const imageRepository = connection.getRepository(Image);
  return imageRepository.save(image);
}

function updateImageDAO(image) {
  const connection = getConnection();
  const imageRepository = connection.getRepository(Image);
  return imageRepository.update(image);
}

function removeImageDAO(image) {
  const connection = getConnection();
  const imageRepository = connection.getRepository(Image);
  return imageRepository.remove(image);
}

async function removeImageByIdDAO(id) {
  try {
    const connection = getConnection();
    const imageRepository = connection.getRepository(Image);
    const imageToRemove = await imageRepository.findOne(id);
    return imageRepository.remove(imageToRemove);
  } catch (err) {
    console.log(err);
  }
}

async function removeImagesByProductIdDAO(productId) {
  try {
    const connection = getConnection();
    const imageRepository = connection.getRepository(Image);
    const imagesToRemove = await imageRepository.find({
      productId: productId,
    });
    imagesToRemove.forEach((image) => {
      imageRepository.remove(image);
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllImagesDAO,
  getImageByIdDAO,
  getImageByProductIdDAO,
  saveImageDAO,
  updateImageDAO,
  removeImageDAO,
  removeImageByIdDAO,
  removeImagesByProductIdDAO,
  getImagesByPlainObjectDAO,
};
