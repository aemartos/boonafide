import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const modalVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

const shadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

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
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.div
              style={shadowStyle}
              className="shade"
              variants={shadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
            <motion.div
              style={modalStyle}
              id="modalBox"
              className="modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
}
