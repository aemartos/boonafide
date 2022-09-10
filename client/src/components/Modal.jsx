import React from 'react';
import posed, { PoseGroup } from 'react-pose';

const ModalContent = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 },
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 },
  },
});

const Shade = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
});

export default class Modal extends React.Component {
  render() {
    const { isVisible, children, bottom } = this.props;
    const shadowStyle = {
      position: 'absolute',
      background: 'rgba(0, 0, 0, 0.8)',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      zIndex: '3',
    };
    const modalStyle = {
      position: 'absolute',
      left: '5%',
      bottom,
      width: '90%',
      padding: '2em',
      height: 'auto',
      background: '#F0F0EC',
      borderRadius: '.5em',
      zIndex: '4',
    };
    return (
      <PoseGroup>
        {isVisible && [
          // If animating more than one child, each needs a `key`
          <Shade style={shadowStyle} key="shade" className="shade" />,
          <ModalContent style={modalStyle} key="modal" id="modalBox" className="modal">
            {children}
          </ModalContent>,
        ]}
      </PoseGroup>
    );
  }
}
