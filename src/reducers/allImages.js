const allImages = (state, action) => {
  switch (action.type) {
    case "FETCH_IMAGES":
      return action.payload;
    default:
      return state;
  }
};

export default allImages;
