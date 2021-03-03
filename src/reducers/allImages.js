const allImages = (state, action) => {
  switch (action.type) {
    case "FETCH_IMAGES":
      return action.payload;
    case "IS_FAVORITE":
      return state.map((image) => {
        if (image.id === action.payload) {
          return { ...image, isFavorite: !image.isFavorite };
        }
        return image;
      });
    case "WILL_BUY":
      return state.map((image) => {
        if (image.id === action.payload) {
          return { ...image, willBuy: !image.willBuy };
        }
        return image;
      });
    default:
      return state;
  }
};

export default allImages;
