export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
export const getRandomIcon = () => `assets/icon/icon${random(1, 13)}.svg`;
