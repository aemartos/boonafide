import React from 'react';

import styled from '@emotion/styled';
import Slider from "react-slick";
// import '../lib/common/slick/slick.min.css';
// import '../lib/common/slick/slick-theme.min.css';


const Item = styled.div`
  color: white;
  background: red;
  padding: 20px 0;
  height: 30em;
`;

export const Carousel = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
      <Item>
        <h3>1</h3>
      </Item>
      <Item>
        <h3>2</h3>
      </Item>
      <Item>
        <h3>3</h3>
      </Item>
    </Slider>
  );
}
