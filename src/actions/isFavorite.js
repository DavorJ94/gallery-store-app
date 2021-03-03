export const isFavorite = (name) => {
  return {
    type: "IS_FAVORITE",
    payload: name,
  };
};
