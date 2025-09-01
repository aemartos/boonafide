import React, { Component } from 'react';
import styled from '@emotion/styled';
import CountUp from 'react-countup';
import { BoonsAPI } from '../lib/API/boons';
import { colors } from '../lib/common/colors';

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 2em 0 5em;
  color: ${colors.purple};
  font-family: "Baloo Bhaina";
  line-height: 1em;
  .box {
    margin: 2em 0 1em;
    a, .not {
      color: ${colors.orange};
    }
    p, li {
      color: ${colors.midPurple};
      margin-top: .5em;
    }
    li {
      font-size: .9em;
      li {
        opacity: .4;
        font-size: .9em;
        line-height: .9em;
        margin: 0;
      }
    }
    ol {
      padding-left: 1em;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    img {
      &.logo {
        width: 60%;
      }
      &.chain {
        width: 100%;
        margin-top: 1em;
      }
    }
    &.boonsNum {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      margin-top: 0;
      text-align: center;
      section {
        display: inline-flex !important;
        span {
          span {
            span {
              font-size: 55px !important;
              line-height: 55px !important;
            }
          }
        }
      }
      .number {
        font-size: 4em;
      }
      .icon {
        margin-top: -.4em;
        margin-left: .3em;
        font-size: 2.4em;
        -webkit-text-stroke: 1px;
      }
    }
    &.mainInfo, &.copyright {
      text-align: center;
    }
    &.mainInfo {
      margin-top: .8em;
      .description, .mainAction {
        font-size: 1.3em;
        line-height: 1.2em;
      }
      .mainAction {
        opacity: .4;
      }
    }
  }
`;

export default class PhilosophyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boons: 0,
    };
  }

  componentWillMount() {
    BoonsAPI.getTotalBoons().then((boons) => this.setState({ boons: boons.length }));
  }

  render() {
    const { boons } = this.state;
    return (
      <div className="contentBox">
        <Container>
          <div className="box boonsNum">
            <CountUp
              end={boons}
              duration={2}
              useEasing
              style={{
                color: colors.purple,
                fontSize: '55px',
                lineHeight: '55px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
            <i className="icon b-boon" />
          </div>

          <div className="box mainInfo">
            <img className="logo" src="/images/logo.png" alt="logo" />
            <p className="description">Change the world through a &quot;chain of favors&quot;. A person must help three people in a disinterested way. They also have to help three others and so on, until a favors chain that improves the lives of citizens is spread around the world.</p>
            <p className="mainAction">When you do 3 favors, them became into 1 boon. With the boons you can ask for favors.</p>
            <img className="chain" src="/images/chain.png" alt="chain" />
          </div>

          <div className="box principles">
            <h2 className="title">Principles</h2>
            <ol className="list principlesList">
              <li className="item">Unlimited favors. 3 favors = 1 boon.</li>
              <li className="item">Individual boon and favor creation, with receiver verification.</li>
              <li className="item">
                Non speculative coins or favors.
                <ul>
                  <li>1 favor === 1 favor.  1 boon === 1 boon.  </li>
                  <li>(No matter the value of the good or service received).</li>
                </ul>
              </li>
              <li className="item">Non-fractionable. 1 boon === 1 boon.</li>
              <li className="item">Non censurable, nobody can prevent the chain.</li>
              <li className="item">Pseudoanonymous, no real identification is required.</li>
              <li className="item">Non interchangeable boons or favors.</li>
              <li className="item">Irreversible favors. Favor can not be modified.</li>
              <li className="item">Obligatory. Favor offered, favor granted.</li>
            </ol>
          </div>

          <div className="box blockchainPhilosophy">
            <h2 className="title">Blockchain philosophy</h2>
            <ul className="list blockchainPhilList">
              <li className="item">Person X does one favor to 3 people.</li>
              <li className="item">Those 3 people verify the favor.</li>
              <li className="item">Person X gain 1 boon.</li>
              <li className="item">Person X can donate the boon to the IBO (initial boon offering) or ask for a favor to other person.</li>
              <li className="item">Person X and those others, who received a favor, do infinite altruistic gestures.</li>
            </ul>
          </div>

          <div className="box can">
            <h2 className="title">CAN</h2>
            <ul className="list canList">
              <li className="item">Favors transit (cession of boon).</li>
              <li className="item">Ask for favors (donation of 1 boon to ibo).</li>
              <li className="item">Offer favors (you receive 1/3 favors to gain 1 boon).</li>
            </ul>
          </div>

          <div className="box cannot">
            <h2 className="title">CAN<span className="not">{' '}NOT</span></h2>
            <ul className="list cannotList">
              <li className="item">Buy or sell favors or boons.</li>
              <li className="item">Change 1 favor for several favors.</li>
              <li className="item">Change 1 favor for several boons.</li>
              <li className="item">Change 1 boon for several favors.</li>
            </ul>
          </div>

          <div className="box copyright">
            <h2 className="title">
              boonafide© by{' '}
              <a href="https://github.com/aemartos/boonafide" target="_blank" rel="noopener noreferrer">anæstrada</a>
            </h2>
          </div>
        </Container>
      </div>
    );
  }
}
