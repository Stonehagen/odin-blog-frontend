export const loadImage = (fileName) => {
  const image = new Image();
  let src = `../img/${fileName}.jpg`;
  image.src = src;
  image.onload = () => {
    src = image.width === 0
    ? `../img/default.jpg`
    : `../img/${fileName}.jpg`;
  }
  return src;
};
