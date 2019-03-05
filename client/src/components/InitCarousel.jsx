import React from 'react';

import styled from '@emotion/styled';
import Slider from "react-slick";
import { colors } from '../lib/common/colors';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Item = styled.div`
  /* display: flex !important; */
  /* flex-flow: column nowrap; */
  /* justify-content: flex-end; */
  /* align-items: flex-end; */
  /* min-height: 35em; */
  h3 {
    width: 90%;
    margin: 6em auto .5em;
    color: ${colors.darkGrey};
    font-family: "Baloo Bhaina";
    font-size: 16px;
    line-height: 1.2em;
    text-align: center;
  }
  img {
    /* flex: 1; */
    width: 100%;
    &.logo {
      width: 40%;
      margin: 0 auto 1em;
    }
    &.illus {
      align-self: flex-end;
    }
  }
`;

export const InitCarousel = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <Item>
        <h3>When someone does you a big favor,<br />dont’t pay it back... PAY IT FORWARD!</h3>
        <img className="logo" src="/images/logo.png" alt="logo" />
        <img className="illus" src="/images/illus01.png" alt="illustration01" />
      </Item>
      <Item>
        <h3>Join for free and start doing and<br /> receiving selfless favors</h3>
        <img className="logo" src="/images/logo.png" alt="logo" />
        <img className="illus" src="/images/illus02.png" alt="illustration02" />
      </Item>
      <Item>
        <h3>Take part in the favor chain<br /> that is making the world a better place!</h3>
        <img className="logo" src="/images/logo.png" alt="logo" />
        <img className="illus" src="/images/illus03.png" alt="illustration03" />
      </Item>
    </Slider>
  );
};
