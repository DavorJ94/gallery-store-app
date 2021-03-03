import React, { useEffect } from "react";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { initialPrepopulation } from "./actions/initialState";

function HomePage() {
  const dispatch = useDispatch();
  const images = useSelector((state) => state);

  // useEffect(() => {
  //   dispatch(initialPrepopulation());
  // }, []);

  useEffect(() => {
    dispatch(initialPrepopulation());
  }, [dispatch]);

  return (
    <div>
      <div className="grid-content">
        {images?.map((item) => {
          return (
            <div className="content-container" key={item.id}>
              <div className="img-container">
                <img src={item.url} alt="" className="image"></img>
              </div>
              <div className="button-container">
                <button className="cartBtn">
                  <i className="ri-shopping-cart-2-line"></i>
                </button>
                <button name={item.id} className="favoriteBtn">
                  <i className="ri-heart-3-line"></i>
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
