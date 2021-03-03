import Axios from "axios";

export const initialPrepopulation = () => {
  return async (dispatch) => {
    const response = await Axios.get(
      "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"
    );
    for (let i = 0; i < response.data.length; i++) {
      response.data[i].willBuy = false;
    }
    dispatch({
      type: "FETCH_IMAGES",
      payload: response.data,
    });
  };
};
