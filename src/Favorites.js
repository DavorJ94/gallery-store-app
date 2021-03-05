import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./favorites.css";
import { isFavorite } from "./actions/isFavorite";
import logo from "./images/logo.png";
import { Link } from "react-router-dom";
function Favorites() {
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state) =>
    state.filter((image) => image.isFavorite === true)
  );
  const handleDeleteItem = (e) => {
    e.preventDefault();
    dispatch(isFavorite(e.target.getAttribute("name")));
  };
  return (
    <>
      <header className="header">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img className="logo" src={logo} alt=""></img>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="back-to-shopping">
            <i className="ri-arrow-left-s-fill"></i>Continue shopping
          </div>
        </Link>
      </header>
      <h1 className="check-out">
        {favoriteItems.length === 0 ? "" : "Favorite images"}
      </h1>
      <div className="grid-content">
        {favoriteItems?.map((item) => {
          return (
            <div
              className="content-container-default"
              key={item.id}
              id={item.id}
            >
              <div className="img-container">
                <img src={item.url} alt="" className="image"></img>
              </div>
              <div
                className="delete-fav-btn"
                onClick={handleDeleteItem}
                name={item.id}
              >
                <i name={item.id} className="ri-delete-bin-6-line"></i>
              </div>
            </div>
          );
        })}
      </div>
      <p className="no-favorite-msg">
        {favoriteItems.length === 0 ? "You have no favorite images." : ""}
      </p>
    </>
  );
}
export default Favorites;
