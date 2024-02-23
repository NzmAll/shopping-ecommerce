import React, { useContext, useEffect, useState } from "react";
import "./CartItems.css";
import remove_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { Link } from "react-router-dom";

const CartItems = () => {
  const { getTotalCartAmount, all_product, removeFromCart } =
    useContext(ShopContext);
  const [cartitem, setCartItem] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [totalWithDiscount, setTotalWithDiscount] = useState(
    getTotalCartAmount()
  );
  useEffect(() => {
    setCartItem(localStorage.getItem("cart"));
    console.log(cartitem);
  }, [cartitem]);
  const [quantityId, setQuantityId] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantityId((prevState) => prevState + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantityId > 1) {
      setQuantityId((prevState) => prevState - 1);
    }
  };

  const applyPromoCode = () => {
    const matches = promoCode.match(/[a-zA-Z]{6}\d+/);
    if (matches) {
      const percentageMatch = matches[0].match(/(\d+)/);
      if (percentageMatch) {
        const promoPercentage = parseInt(percentageMatch[0]);
        if (promoPercentage > 0 && promoPercentage < 100) {
          const discount = getTotalCartAmount() * (promoPercentage / 100);
          setDiscountPercentage(promoPercentage);
          setTotalWithDiscount(getTotalCartAmount() - discount);
          setDiscountApplied(true);
          return;
        }
      }
    }
    setDiscountApplied(false);
  };
  let total = 0;

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (e.id == cartitem) {
          console.log("e" + e.id + "CartItem" + cartitem);
          total = e.new_price * quantityId;
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                {e.new_price && <p>${e.new_price}</p>}
                <div>
                  <span
                    onClick={handleDecreaseQuantity}
                    style={{
                      fontSize: "30px",
                      position: "relative",
                      top: "10px",
                    }}
                  >
                    <CiCircleMinus />
                  </span>
                  <button className="cartitems-quantity">{quantityId}</button>
                  <span
                    onClick={handleIncreaseQuantity}
                    style={{
                      fontSize: "30px",
                      position: "relative",
                      top: "10px",
                    }}
                  >
                    <IoIosAddCircleOutline />{" "}
                  </span>
                </div>
                ${total}
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${total}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Discount Applied</p>
              {discountApplied ? (
                <p>{discountPercentage}%</p>
              ) : (
                <p>No discount applied</p>
              )}
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${(total * (100 - discountPercentage)) / 100}</h3>
            </div>
          </div>
          <Link to={"/checkout"} className="checkout">
            PROCEED TO CHECKOUT
          </Link>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitems-promobox">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button onClick={applyPromoCode}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
