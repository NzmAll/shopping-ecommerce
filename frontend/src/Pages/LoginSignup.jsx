import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    agree: false
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login", formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
  
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      if (responseData.errors === "email is not confirmed") {
        // Handle email not confirmed error
        alert("Email is not confirmed. Please confirm your email.");
      } else {
        alert(responseData.errors);
      }
    }
  };
  
  const signup = async () => {
    console.log("Sign Up", formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateForm = () => {
    if (state === "Login") {
      if (!formData.email || !formData.password) {
        alert("Please fill in all the required fields.");
        return false;
      }
    } else {
      if (!formData.username || !formData.email || !formData.password) {
        alert("Please fill in all the required fields.");
        return false;
      }

      if (!validateEmail(formData.email)) {
        alert("Please enter a valid email address.");
        return false;
      }
      
      if (formData.username.trim() === "") {
        alert("Please enter your name.");
        return false;
      }
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return false;
    }

    if (!formData.agree) {
      alert("Please agree to the terms of use & privacy policy.");
      return false;
    }

    return true;
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="loginsignup-agree">
          <input 
            type="checkbox" 
            name="agree" 
            checked={formData.agree} 
            onChange={() => setFormData({...formData, agree: !formData.agree})} 
            id="agree-checkbox" 
          />
          <label htmlFor="agree-checkbox">By continuing, I agree to the terms of use & privacy policy.</label>
        </div>
        <button
          onClick={() => {
            if (validateForm()) {
              state === "Login" ? login() : signup();
            }
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
