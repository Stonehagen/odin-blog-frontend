export const loadImage = (fileName) => {
  let image = new Image();
  let src = `../img/${fileName}.jpg`;
  image.src = src;
  return image.width === 0
    ? `/img/default.jpg`
    : `/img/${fileName}.jpg`;
};
