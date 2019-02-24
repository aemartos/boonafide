import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';
import { Button } from '../components/Button';
import { getScript } from '../lib/common/helpers';

const StyledValidation = styled.div`
  position: absolute;
  top: ${props => props.validating ? "0px" : "51em"};
  bottom: 0;
  width: 100%;
  padding: 2.4em 2em;
  background-color: ${colors.purple};
  z-index: 4;
  -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  .icon {
    position: absolute;
    top: 2.45em;
    left: 2em;
    color: ${colors.grey};
    font-size: 1em;
    &:before{
      transform: rotate(180deg);
    }
  }
  .text {
    color: ${colors.grey};
    text-align: center;
    .title {
      font-family: "Baloo Bhaina";
      line-height: 1.2em;
    }
    .subtitle {
      font-weight: 100;
      font-size: 1.2em;
    }
  }
  svg {
    display: block;
    width: 80%;
    margin: 2em auto;
    path {
      fill: none;
      stroke-width: 14;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-miterlimit: 10;
      &.front {
        stroke: ${colors.orange};
      }
      &.back {
        stroke: ${colors.grey};
      }
    }
    circle {
      fill: ${colors.lightOrange};
      opacity: .5;
    }
  }
  .btn {
    width: 100%;
  }
`;

export default class ValidationComponent extends React.Component {
  handleClose() {
    this.props.closeValidation(false);
  }
  handleValidate() {
    alert("Validated");
  }
  componentDidMount() {

    const values = [
      {x: 0, y: 0},
      {x: 0, y: 0},
      {x: 0, y: 59.49999999999999},
      {x: 0, y: 59.49999999999999},
      {x: 0, y: 59.49999999999999},
      {x: 65, y: 59.49999999999999},
      {x: 65, y: 59.49999999999999},
      {x: 81, y: 59.49999999999999},
      {x: 94.1, y: 46.4},
      {x: 94.1, y: 30.4},
      {x: 94.1, y: 30.4},
      {x: 94.1, y: 30.4},
      {x: 94.1, y: 30.4},
      {x: 94.1, y: 14.399999999999999},
      {x: 81, y: 1.2999999999999972},
      {x: 65, y: 1.2999999999999972},
      {x: 65, y: 1.2999999999999972},
      {x: 58.3, y: 1.2999999999999972},
      {x: 58.3, y: 1.2999999999999972},
      {x: 58.3, y: 1.2999999999999972},
      {x: 58.3, y: -5.400000000000006},
      {x: 58.3, y: -5.400000000000006},
      {x: 58.3, y: -21.5},
      {x: 45.1, y: -34.6},
      {x: 29.1, y: -34.6},
      {x: 29.1, y: -34.6},
      {x: 29.1, y: -34.6},
      {x: 29.1, y: -34.6},
      {x: 13.100000000000001, y: -34.6},
      {x: 0, y: -21.5},
      {x: 0, y: -5.5},
      {x: 0, y: -5.5},
      {x: 0, y: 0},
      {x: 0, y: 0}
    ];

    getScript("/vendor/TweenMax.min.js", "tmax", () => {
      getScript("/vendor/jquery-2.1.3.min.js", "jQ", () => {
        getScript("/vendor/Draggable.min.js", "dragg", () => {
          getScript("/vendor/DrawSVGPlugin.min.js", "draw", () => {
            getScript("/vendor/ThrowPropsPlugin.min.js", "throw", () => {
              var { TweenMax, TimelineMax, Draggable, Linear } = window;

              var D = document.createElement('div');
              TweenMax.set('svg',{overflow:"visible"})
              TweenMax.set('.knob',{x:0,y:0});

              var tl = new TimelineMax({paused:true, onComplete: ()=>{this.handleValidate()}})
              .from("#path2",1,{drawSVG:"0%",stroke:'orange',ease:Linear.easeNone})
              .to('.knob',1,{bezier:{type:"cubic",values},ease:Linear.easeNone},0);
              const Update = function(){tl.progress(Math.abs(this.x/300))};

              Draggable.create(D,{
                trigger:".knob",
                //type:'x,y',
                //liveSnap: {points: values},
                throwProps:true,
                bounds:{minX:0,maxX:300},
                onDrag:Update,
                onThrowUpdate:Update,
                minimumMovement: 2
              });
            });
          });
        });
      });
    });
  }
  componentWillUnmount() {
    document.getElementById("tmax").remove();
    document.getElementById("dragg").remove();
    document.getElementById("draw").remove();
    document.getElementById("throw").remove();
  }
  render() {
    const {validating} = this.props;
    const display = {
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "center",
      alignItems: "center"
    }
    return (
      <StyledValidation validating={validating} style={validating ? display : null}>
        <span className="icon b-arrow-short" onClick={()=>this.handleClose()}></span>
        <div className="text">
          <h2 className="title">Validate your ticket</h2>
          <p className="subtitle">Trace the “B” to validate the ticket, be sure when you do that, you can only validated once.</p>
        </div>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 108.1 108.1">
          <path className="back" id="path1" d="M7,41.6v59.5h65c16,0,29.1-13.1,29.1-29.1l0,0c0-16-13.1-29.1-29.1-29.1h-6.7v-6.7C65.3,20.1,52.1,7,36.1,7l0,0
	        C20.1,7,7,20.1,7,36.1V41.6"/>
          <path className="front" id="path2" fill="transparent" d="M7,41.6v59.5h65c16,0,29.1-13.1,29.1-29.1l0,0c0-16-13.1-29.1-29.1-29.1h-6.7v-6.7C65.3,20.1,52.1,7,36.1,7l0,0
	        C20.1,7,7,20.1,7,36.1V41.6"/>
          <circle className="circle knob" cx="7" cy="41.6" r="7"/>
        </svg>

        <Button link="" onClick={()=> this.handleValidate()} className="btn">Validate</Button>
      </StyledValidation>
    );
  }
}
