import React, { useEffect } from "react";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { initialPrepopulation } from "./actions/initialState";
import { isFavorite } from "./actions/isFavorite";
import { willBuy } from "./actions/willBuy";
import logo from "./images/logo.png";

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

  const checkFavoriteAndWillBuy = () => {
    let favCounter = 0;
    let willBuyCounter = 0;
    images?.map((image) => {
      if (image.isFavorite) favCounter++;
      if (image.willBuy) willBuyCounter++;
    });
    return { favoritesCount: favCounter, willBuyCount: willBuyCounter };
  };

  const handleWillBuyBtn = (e) => {
    dispatch(willBuy(e.target.name));
  };

  return (
    <div>
      <header className="header">
        <img className="logo" src={logo} alt=""></img>
        <div className="fav-cart-container">
          <button
            className="headerBtn favoritesBtn"
            data-favorite-count={checkFavoriteAndWillBuy().favoritesCount}
          >
            <i
              className={
                checkFavoriteAndWillBuy().favoritesCount !== 0
                  ? "ri-heart-3-fill"
                  : "ri-heart-3-line"
              }
            ></i>
          </button>
          <button
            className="headerBtn willBuyBtn"
            data-willbuy-count={checkFavoriteAndWillBuy().willBuyCount}
          >
            <i
              className={
                checkFavoriteAndWillBuy().willBuyCount !== 0
                  ? "ri-shopping-cart-2-fill"
                  : "ri-shopping-cart-2-line"
              }
            ></i>
          </button>
        </div>
      </header>
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
