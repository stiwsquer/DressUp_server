const {
  getAllImagesDAO,
  getImageByIdDAO,
  getImageByProductIdDAO,
  saveImageDAO,
  updateImageDAO,
  removeImageDAO,
  removeImageByIdDAO,
  removeImagesByProductIdDAO,
  getImagesByPlainObjectDAO,
} = require("../dao/imageDao");

const Image = require("../models/Image").Image;

async function getAllImages() {
  try {
    const allImages = await getAllImagesDAO();
    return allImages;
  } catch (err) {
    console.log(err);
  }
}

async function getImageById(id) {
  try {
    return await getImageByIdDAO(id);
  } catch (err) {
    console.log(err);
  }
}

async function getImagesByPlainObject(plainObject) {
  try {
    return await getImagesByPlainObjectDAO(plainObject);
  } catch (err) {
    console.log(err);
  }
}

async function getImageByProductId(productId) {
  try {
    return await getImageByProductIdDAO(productId);
  } catch (err) {
    console.log(err);
  }
}

async function saveImage(productId, src, srcHover, color, imgAlt) {
  try {
    const newImage = new Image();
    newImage.productId = productId;
    newImage.src = src;
    newImage.srcHover = srcHover;
    newImage.color = color;
    newImage.imgAlt = imgAlt;
    return await saveImageDAO(newImage);
  } catch (err) {
    console.log(err);
  }
}

async function updateImage(productId, src, srcHover, color, imgAlt, id) {
  try {
    const imageToUpdate = await getImageByIdDAO(id);

    imageToUpdate.productId = productId ? productId : imageToUpdate.productId;
    imageToUpdate.src = src ? src : imageToUpdate.src;
    imageToUpdate.color = color ? color : imageToUpdate.color;
    imageToUpdate.imgAlt = imgAlt ? imgAlt : imageToUpdate.imgAlt;
    imageToUpdate.srcHover = srcHover ? srcHover : imageToUpdate.srcHover;
    return await updateImageDAO(imageToUpdate);
  } catch (err) {
    console.log(err);
  }
}

async function removeImage(image) {
  try {
    return await removeImageDAO(image);
  } catch (err) {
    console.log(err);
  }
}

async function removeImageById(id) {
  try {
    return await removeImageByIdDAO(id);
  } catch (err) {
    console.log(err);
  }
}

async function removeImagesByProductId(productId) {
  try {
    return await removeImagesByProductIdDAO(productId);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllImages,
  getImageById,
  getImagesByPlainObject,
  getImageByProductId,
  saveImage,
  updateImage,
  removeImage,
  removeImageById,
  removeImagesByProductId,
};
