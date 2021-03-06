import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { initialPrepopulation } from "./actions/initialState";
import { isFavorite } from "./actions/isFavorite";
import { willBuy } from "./actions/willBuy";
import logo from "./images/logo.png";
import { Link } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  const images = useSelector((state) => state);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (images) {
      return;
    } else {
      dispatch(initialPrepopulation());
    }
  }, [dispatch, images]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

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

    images?.forEach((image) => {
      if (image.isFavorite) favCounter++;
      if (image.willBuy) willBuyCounter++;
    });
    return { favoritesCount: favCounter, willBuyCount: willBuyCounter };
  };

  const handleWillBuyBtn = (e) => {
    dispatch(willBuy(e.target.name));
  };

  return (
    <>
      <header className="header">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img className="logo" src={logo} alt=""></img>
        </Link>

        <div className="fav-cart-container">
          <Link to="/favorites" style={{ textDecoration: "none" }}>
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
          </Link>
          <Link to="/cart" style={{ textDecoration: "none" }}>
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
          </Link>
        </div>
      </header>
      <Loader
        style={{ display: loading ? "block" : "none" }}
        className="loader"
        type="Circles"
        color="#00BFFF"
        height={150}
        width={150}
      />
      <div
        className="grid-content"
        style={{ display: loading ? "none" : "grid" }}
      >
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
    </>
  );
}

export default HomePage;
