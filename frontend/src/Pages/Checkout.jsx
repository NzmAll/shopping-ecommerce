import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "./CSS/Checkout.css";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputFocus = (e) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };
  return (
    <div>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <div className="form-container">
        <div>
          <input
            type="number"
            name="number"
            className="form-control"
            placeholder="Card Number"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="expiry"
            className="form-control"
            placeholder="Valid Thru"
            pattern="\d\d/\d\d"
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
          <input
            type="number"
            name="cvc"
            className="form-control"
            placeholder="CVC"
            pattern="\d{3,4}"
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
        </div>
        <Link to={"/cart"} className="submit">Submit</Link>
      </div>
    </div>
  );
};
export default Checkout;
