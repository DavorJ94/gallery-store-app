import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { willBuy } from "./actions/willBuy";
import logo from "./images/logo.png";
import "./cart.css";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const itemsInCart = useSelector((state) =>
    state.filter((image) => image.willBuy === true)
  );

  const handleMouseEnter = (e) => {
    if (document.getElementsByName(`${e.target.name}`)[0]) {
      const value = document.getElementsByName(`${e.target.name}`)[0]
        .firstChild;
      value.classList.remove("ri-delete-bin-6-line");
      value.classList.add("ri-delete-bin-6-fill");
    }
  };
  const handleMouseLeave = (e) => {
    if (document.getElementsByName(`${e.target.name}`)[0]) {
      const value = document.getElementsByName(`${e.target.name}`)[0]
        .firstChild;
      value.classList.remove("ri-delete-bin-6-fill");
      value.classList.add("ri-delete-bin-6-line");
    }
  };

  const handleDeleteItem = (e) => {
    e.preventDefault();
    dispatch(willBuy(e.target.getAttribute("name")));
  };

  const handleOrder = (e) => {
    e.preventDefault();
    document.querySelector(".order-btn").innerText = "Ordering...";
    setTimeout(() => {
      itemsInCart.map((item) => {
        dispatch(willBuy(item.id));
      });
      const node = document.createElement("H1");
      node.classList.add("successful-message");
      const element = document.body.appendChild(node);
      element.innerText = "Order received successfully, thanks!";
      setTimeout(() => {
        const removingElement = document.querySelector(".successful-message");
        removingElement.remove();
      }, 3000);
    }, 2000);
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
      <h1 className="check-out">Check out</h1>
      <div className="all-items-container">
        {itemsInCart.map((item) => {
          return (
            <div className="item-container" key={item.id}>
              <div className="bin-and-image">
                <button
                  className="btn-delete"
                  name={item.id}
                  id={item.id}
                  onClick={handleDeleteItem}
                  onMouseOver={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <i name={item.id} className="ri-delete-bin-6-line"></i>
                </button>
                <img className="buyImg" src={item.url} alt=""></img>
              </div>
              <div>$5.99</div>
            </div>
          );
        })}
      </div>
      <div className="messages">
        <p className="total">
          Total:{" "}
          {itemsInCart.length === 0
            ? "$0.00"
            : `$${(itemsInCart.length * 5.99).toFixed(2)}`}
        </p>
        <p className="no-items-msg">
          {itemsInCart.length === 0 ? "There are no items in cart." : ""}
        </p>
      </div>
      {itemsInCart.length > 0 && (
        <button className="order-btn" onClick={handleOrder}>
          Place Order
        </button>
      )}
    </>
  );
}
export default Cart;
