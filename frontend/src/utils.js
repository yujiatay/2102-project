export const getUnixTimestamp = (date) => {
  return parseInt((date.getTime() / 1000).toFixed(0), 10);
};

export const getCurrentUnixTimestamp = (date) => {
  return parseInt((Date.now() / 1000).toFixed(0), 10);
};