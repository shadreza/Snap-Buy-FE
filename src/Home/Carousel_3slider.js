import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./Header.css";

const Carousel_3slider = () => {
  return (
    <OwlCarousel className="owl-theme" loop margin={10} nav>
      <div class="item">
        <img
          src="logo_banner\online_store4.jpg"
          style={{ minWidth: "200px", minHeight: "200px" }}
        />
      </div>
      <div class="item" style={{ border: "1px solid green" }}>
        <div>
          <h3>what is up</h3>
          <h3>what is going on</h3>
          <h3>what is going on</h3>
          <h3>what is going on</h3>
          <h3>what is going on</h3>
          <h3>what is going on</h3>
          <h3>what is going on</h3>
          <h3>what is going on</h3>
          <h3> this is too much</h3>
        </div>
      </div>
      <div class="item">
        <img src="logo_banner\online_store3.jpg" />
      </div>
      <div class="item">
        <img src="logo_banner\online_store2.jpg" />
      </div>
      <div class="item">
        <img src="logo_banner\online_store4.jpg" />
      </div>
    </OwlCarousel>
  );
};

export default Carousel_3slider;
