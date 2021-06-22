import React from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


export default function Carousel() {

  return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={40}
        totalSlides={4}
        isPlaying={true}
        interval={3500}
        visibleSlides={1}
        infinite={true}
      >
        <Slider>
          <Slide index={0}><img src="logo_banner\online_store3.jpg" alt="" width="100%" object-fit="contain"/> </Slide>
          <Slide index={1}><img src="logo_banner\online_store2.jpg" alt="" width="100%" object-fit="contain" /> </Slide>          
          <Slide index={2}><img src="logo_banner\online_store4.jpg" alt="" width="100%" object-fit="contain"/> </Slide>
          <Slide index={3}><img src="Icons\online_shopping.png" alt="" width="70%" object-fit="contain"/> </Slide>
          <Slide index={4}><img src="Icons\online_shopping3.svg" alt="" width="70%" object-fit="contain"/> </Slide>
        </Slider>
    
      </CarouselProvider>
    );
}