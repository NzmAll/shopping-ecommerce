import React, { useState } from "react";
import "./CSS/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: "",
    province: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="contactUs">
      <div className="descriptionbox">
        <div className="descriptionbox-navigator">
          <div className="descriptionbox-nav-box">Description</div>
          <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
          <p>
            Please complete the following information to receive service. A
            representative will contact you by telephone within two business
            days. If your request cannot be completed by phone, we will offer
            you an appointment for service at a Service Azerbaijan Centre.
            Service Canada does not tolerate inappropriate or aggressive
            behaviour, harassment or foul language. We will terminate
            communications with anyone who engages in such behaviour.
          </p>
          <p>
            Please do not include any sensitive personal information in the
            questions/comments box, such as your social insurance number, date
            of birth, personal financial data, and medical or work history.
          </p>
        </div>
      </div>
      <div className="contactUs-input">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Telephone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="province">Province/Territory:</label>
            <input
              type="text"
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="postalCode">Postal Code:</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
