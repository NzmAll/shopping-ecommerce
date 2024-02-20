import React, { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);

  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [totalWithDiscount, setTotalWithDiscount] = useState(
    getTotalCartAmount()
  );
  const [quantityId, setQuantityId] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantityId(prevState => prevState + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantityId > 1) {
      setQuantityId(prevState => prevState - 1);
    }
  };

  const applyPromoCode = () => {
    const percentageMatch = promoCode.match(/(\d+)/);
    if (percentageMatch) {
      const promoPercentage = parseInt(percentageMatch[0]);
      if (promoPercentage > 0 && promoPercentage <= 100) {
        const discount = getTotalCartAmount() * (promoPercentage / 100);
        setDiscountPercentage(promoPercentage);
        setTotalWithDiscount(getTotalCartAmount() - discount);
        setDiscountApplied(true);
      } else {
        setDiscountApplied(false);
      }
    } else {
      setDiscountApplied(false);
    }
  };

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
        
        if (cartItems[e.id] > 0) {
          return (
            <div>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <div>
                  <span onClick={handleDecreaseQuantity} style={{fontSize:"30px",position:"relative",top:"10px"}}>
                    <CiCircleMinus />
                  </span>
                  <button className="cartitems-quantity">
                    {quantityId}
                  </button>
                  <span onClick={handleIncreaseQuantity} style={{fontSize:"30px",position:"relative",top:"10px"}}>
                    <IoIosAddCircleOutline />{" "}
                  </span>
                </div>
                <p>${e.new_price * quantityId}</p>
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
              <p>${getTotalCartAmount()}</p>
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
              <h3>${totalWithDiscount}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
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
