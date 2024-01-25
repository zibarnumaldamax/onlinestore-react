import React from 'react';
import s from './style.module.css';

const EmptyBasket = () => {
  return (
    <div className={s.container}>
      <p className={s.text}>Looks like you have no items in your basket currently.</p>
    </div>
  );
};

export default EmptyBasket;
