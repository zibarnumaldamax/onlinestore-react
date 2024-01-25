import React from 'react';
import s from './style.module.css';
import { useDispatch } from 'react-redux';
import { decrement, increment, remove } from '../../store/slices/basketSlice';
import cross from './cross.svg';
import { baseLink } from '../../store/slices/baseLink';

const BasketItem = ({ id, title, price, discont_price, image, count }) => {
  const dispatch = useDispatch();

  return (
    <div className={s.product_item}>
      <img className={s.product_img} src={`${baseLink}/${image}`} alt={title} />
      <div className={s.grid_item}>
        <p className={s.product_name}>{title}</p>
        <div className={s.btns_blok}>
          <button onClick={() => dispatch(decrement(id))} className={s.btn}>
            {' '}
            -{' '}
          </button>
          <span className={s.count}>{count}</span>
          <button onClick={() => dispatch(increment(id))} className={s.btn}>
            {' '}
            +{' '}
          </button>
        </div>
      </div>
      <div className={s.prices}>
        {discont_price ? (
          <>
            <p className={s.final_price}>
              {discont_price}
              <span className={s.small_text}>$</span>
            </p>
            <p className={s.price}>{price}$ </p>
          </>
        ) : (
          <p className={s.final_price}>
            {price}
            <span className={s.small_text}>$</span>
          </p>
        )}
      </div>
      <button onClick={() => dispatch(remove(id))} className={s.del_btn}>
        <img src={cross} alt="delete_icon" />
      </button>
    </div>
  );
};

export default BasketItem;
