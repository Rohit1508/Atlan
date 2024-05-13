import React, { useState } from 'react';
import styles from './Modal.module.css';
export const Modal = ({ children, setIsOpen, isOpen }) => {

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      { (
        <div className={styles.modal}>
          <div className={styles['modal-content']}>
            <span className={styles.close} onClick={toggleModal}>&times;</span>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
