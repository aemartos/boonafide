import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';
import { validateStart, validateStop } from '../lib/common/validation.helpers';
import { TicketsAPI } from '../lib/API/tickets';

const StyledValidation = styled.div`
  position: absolute;
  top: ${(props) => (props.validating ? '0px' : '56em')};
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
      font-size: 1em;
    }
  }
  .animation {
    text-align: center;
    position: relative;
    img.check {
      position: absolute;
      left: 50%;
      transform: translateX(-50%) rotate(0deg);
      opacity: 0;
      width: 60%;
      height: auto;
      margin: 2em auto;
      pointer-events: none;
      -webkit-transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
      transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
      &.appear {
        opacity: 1;
        transform: translateX(-50%) rotate(360deg);
        -webkit-transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
        transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
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
      -webkit-transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
      transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
      &.disappear {
        opacity: 0;
        transform: rotate(360deg);
        -webkit-transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
        transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
      }
    }
  }
  .btn {
    width: 100%;
  }
`;

class _ValidationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      check: false,
    };
    this.handleValidate = this.handleValidate.bind(this);
  }

  componentDidMount() {
    const { ticket } = this.props;
    validateStart(this.handleValidate, ticket?.validated);
  }

  componentWillUnmount() {
    validateStop();
  }

  handleClose() {
    this.props.closeValidation(false);
    if (this.state.validated) {
      this.props.history.push('/profile');
    }
  }

  handleValidationCheck() {
    this.setState({ check: true });
    setTimeout(() => this.handleClose(), 1000);
  }

  handleValidate() {
    const { ticket } = this.props;
    TicketsAPI.validateTicket(ticket._id, ticket).then(() => {
      this.setState({ validated: true });
      this.handleValidationCheck();
    }).catch((error) => {
      if (error.error === 'Ticket is already validated') {
        this.setState({ validated: true });
        this.handleValidationCheck();
      } else if (error.error === 'Only the receiver can validate this ticket') {
        // eslint-disable-next-line no-alert
        alert('Only the receiver can validate this ticket');
        this.handleClose();
      } else {
        this.props.history.push('/not-found');
      }
    });
  }

  render() {
    const { validating, validated } = this.props;
    const { check } = this.state;
    const display = {
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      alignItems: 'center',
    };

    if (validated) {
      return null;
    }

    return (
      <StyledValidation validating={validating} style={validating ? display : null}>

        <span tabIndex={0} aria-hidden="true" role="button" className="icon b-arrow-short" onClick={() => this.handleClose()} />
        <div className="text">
          <h2 className="title">Validate your ticket</h2>
          <p className="subtitle">Trace the “B” to validate the ticket, you must be sure, the ticket can only be validated once.</p>
        </div>
        <div className="animation">
          <img className={check ? 'check appear' : 'check'} src="/images/heartTick.png" alt="heartTick" />
          <svg className={check ? 'disappear' : ''} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 108.1 108.1">
            <path
              className="path back"
              id="path"
              d="M7,41.6v59.5h65c16,0,29.1-13.1,29.1-29.1l0,0c0-16-13.1-29.1-29.1-29.1h-6.7v-6.7C65.3,20.1,52.1,7,36.1,7l0,0
        C20.1,7,7,20.1,7,36.1V41.6"
            />
            <path
              className="path front"
              id="drawMe"
              fill="transparent"
              d="M7,41.6v59.5h65c16,0,29.1-13.1,29.1-29.1l0,0c0-16-13.1-29.1-29.1-29.1h-6.7v-6.7C65.3,20.1,52.1,7,36.1,7l0,0
        C20.1,7,7,20.1,7,36.1V41.6"
            />
            <circle className="circle oval knob" id="drag" cx="0" cy="0" r="7" />
          </svg>
        </div>

      </StyledValidation>
    );
  }
}

export const ValidationComponent = withRouter(_ValidationComponent);
