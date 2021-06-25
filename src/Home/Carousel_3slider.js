import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./Header.css";

const Carousel_3slider = () => {
  return (
    <OwlCarousel className="owl-theme" loop margin={10} nav>
      <div class="item">
        <img src="logo_banner\online_store3.jpg" width="200px" />
      </div>
      <div class="item">
        <img src="logo_banner\online_store2.jpg" width="200px" />
      </div>
      <div class="item">
        <img src="logo_banner\online_store4.jpg" width="200px" />
      </div>
    </OwlCarousel>
  );
};

export default Carousel_3slider;
