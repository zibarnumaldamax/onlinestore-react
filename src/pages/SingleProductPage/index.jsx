import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import s from './style.module.css';
import { addToBasket } from '../../store/slices/basketSlice';
import { fetchSingleProduct } from '../../store/slices/singleProductSlice';
import MobilAccordion from '../../components/MobilAccordion';
import NotFoundPage from '../NotFoundPage';
import { toast } from 'react-toastify';
import { baseLink } from '../../store/slices/baseLink';

const SingleProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const ref = useRef(null);
  setTimeout(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, 0);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  const { product } = useSelector(state => state);

  const { title, description, discont_price, price, image } = product?.item
    ? product?.item
    : {};

  const disc_percent = Math.ceil(100 - (discont_price * 100) / price);

  useEffect(() => {
    document.title = `Product: ${title}`;
  }, [title]);

  const onClickAdd = () => {
    dispatch(addToBasket(product.item.id));
    toast.info('The product has been added to your cart.', {
      autoClose: 2000,
    });
  };

  return (
    <>
      {product?.item ? (
        <div className={s.product_page}>
          <h1 ref={ref} className={s.product_title}>
            {title}
          </h1>
          <div className={s.product_card}>
            <div className={s.image_container}>
              <img className={s.img} src={`${baseLink}/${image}`} alt={title} />
            </div>
            <div className={s.product_info}>
              <div className={s.actions}>
                <div className={discont_price ? s.prices_blok : ''}>
                  {discont_price ? (
                    <>
                      <p className={s.disc_price}>
                        {discont_price}
                        <span className={s.symbol}>$</span>
                      </p>
                      <p className={s.price}>{price}$ </p>
                      <p className={s.percent}> -{disc_percent}%</p>
                    </>
                  ) : (
                    <p className={s.no_disc_price}>
                      {price}
                      <span className={s.symbol}>$</span>
                    </p>
                  )}
                </div>
                <button onClick={onClickAdd} className={s.add_btn}>
                  To cart
                </button>
              </div>
              <div className={s.product_descr}>
                <p className={s.subtitle}>Description</p>
                <p className={s.text}>{description}</p>
              </div>
              <div className={s.mob_descr}>
                <MobilAccordion title={'Description'}>
                  {description}
                </MobilAccordion>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default SingleProductPage;
