export const willBuy = (name) => {
  return {
    type: "WILL_BUY",
    payload: name,
  };
};
