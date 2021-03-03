import React, { useEffect } from "react";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { initialPrepopulation } from "./actions/initialState";
import { isFavorite } from "./actions/isFavorite";
import { willBuy } from "./actions/willBuy";

function HomePage() {
  const dispatch = useDispatch();
  const images = useSelector((state) => state);

  useEffect(() => {
    dispatch(initialPrepopulation());
  }, [dispatch]);

  const handleClassName = (item) => {
    if (item.isFavorite && item.willBuy)
      return "content-container-willBuy-Favorite";
    if (item.isFavorite && !item.willBuy) return "content-container-Favorite";
    if (!item.isFavorite && item.willBuy) return "content-container-willBuy";
    return "content-container-default";
  };
  const handleFavButtonClick = (e) => {
    dispatch(isFavorite(e.target.name));
  };

  const handleWillBuyBtn = (e) => {
    dispatch(willBuy(e.target.name));
  };

  return (
    <div>
      <div className="grid-content">
        {images?.map((item) => {
          return (
            <div className={handleClassName(item)} key={item.id} id={item.id}>
              <div className="img-container">
                <img src={item.url} alt="" className="image"></img>
              </div>
              <div className="button-container">
                <button
                  name={item.id}
                  className="cartBtn"
                  onClick={handleWillBuyBtn}
                >
                  <i
                    className={
                      item.willBuy
                        ? "ri-shopping-cart-2-fill classForCheckedCart"
                        : "ri-shopping-cart-2-line"
                    }
                  ></i>
                </button>
                <button
                  name={item.id}
                  className="favoriteBtn"
                  onClick={handleFavButtonClick}
                >
                  <i
                    className={
                      item.isFavorite
                        ? "ri-heart-3-fill classForCheckedFav"
                        : "ri-heart-3-line"
                    }
                  ></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
