export const loadImage = (fileName) => {
  let image = new Image();
  let src = `../img/${fileName}.jpg`;
  image.src = src;
  return image.width === 0
    ? `../public/img/default.jpg`
    : `../public/img/${fileName}.jpg`;
};
