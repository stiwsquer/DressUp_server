class Image {
  constructor(id, productId, src, srcHover, color, imgAlt) {
    this.id = id;
    this.productId = productId;
    this.src = src;
    this.srcHover = srcHover;
    this.color = color;
    this.imgAlt = imgAlt;
  }
}

module.exports = {
  Image,
};
