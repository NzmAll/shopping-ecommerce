import './CSS/About.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";

import men_banner from "../Components/Assets/banner_mens.png";
import women_banner from "../Components/Assets/banner_women.png";
import kid_banner from "../Components/Assets/banner_kids.png";

const SimpleSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (<>
    <div style={{ margin: "50px auto", maxWidth: "82%" }}>
      <Slider {...settings} >
        <div>
          <img src={men_banner} alt="1. Slide" style={{ maxWidth: "100%", height: "auto" }} />
        </div>
        <div>
          <img src={women_banner} alt="2. Slide" style={{ maxWidth: "100%", height: "auto" }} />
        </div>
        <div>
          <img src={kid_banner} alt="3. Slide" style={{ maxWidth: "100%", height: "auto" }} />
        </div>
      </Slider>
    </div>

<div style={{ width: "82%", margin: "0 auto", textAlign: "center" }}>
<h2 style={{margin:'30px'}}>Welcome to Your Fashion Destination!</h2>
<p style={{margin:'30px'}}>Dive into the world of fashion with us and express your style with the pieces that best reflect you. Our store is filled with the latest trends, stylish designs, and quality products. Whether you're looking for everyday casuals or dazzling outfits for special occasions, we've got you covered.</p>

<h3 style={{margin:'30px'}}>Find Your Perfect Fit</h3>
<p style={{margin:'30px'}}>Our wide range of products caters to every taste and need. We constantly update our collections to offer choices that appeal to everyone, following the latest trends closely.</p>

<h3 style={{margin:'30px'}}>Quality and Style Together</h3>
<p style={{margin:'30px'}}>Each of our products is crafted from the highest quality materials with an emphasis on style, comfort, and durability. This means you can find pieces that not only reflect your style but also offer reliable quality for long-term use.</p>

<h3 style={{margin:'30px'}}>An Easy Shopping Experience</h3>
<p style={{margin:'30px'}}>Enjoy the convenience of online shopping with easy navigation, quick payment options, and secure checkout. Our customer service team is always ready to assist you with any queries.</p>

<h3 style={{margin:'30px'}}>Discover Your Style Now!</h3>
<p style={{margin:'30px'}}>It's time to step into the fashion world! Explore the latest trends, find pieces that express your unique style, and start refreshing your wardrobe today. We are here to offer you the best!</p>
</div>
</>
  );
};

export default SimpleSlider;
