import { useDispatch, useSelector } from 'react-redux';
import s from './style.module.css';
import { useForm } from 'react-hook-form';
import { fetchBasketOrder } from '../../store/slices/basketSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const OrderForm = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state);
  const { data, status, error } = useSelector(state => state.basket);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = order => {
    order = { ...data, phone: data.phone };
    dispatch(fetchBasketOrder(order));
  };

  if (isSubmitSuccessful && status === 'resolve') {
    toast.success('Order Successfuly Placed!', {
      autoClose: 2500,
    });
  } else if (status === 'rejected') {
    toast.error(error, {
      autoClose: 2500,
    });
  }

  const countRender = () => {
    if (products.status === 'resolve') {
      return data
        .reduce((prev, item) => {
          return prev + item.count;
        }, 0);
    } else {
      return "No";
    }
  };

  const priceRender = () => {
    if (products.status === 'resolve') {
      return data
        .reduce((prev, item) => {
          const product = products.data.find(el => el.id === item.id);
          return prev + item.count * product.finalPrice;
        }, 0)
        .toFixed(2);
    } else {
      return 0;
    }
  };

  const changeClass = () => {
    return errors.phone?.type && data.length
      ? `${s.phone_number} ${s.reject}`
      : s.phone_number;
  };

  return (
    <>
      {!data.length ? (
        <Link to="/products" className={s.btn_shop}>
          Continue Shopping
        </Link>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={s.basket_form}>
          <h3 className={s.title}>Order details</h3>
          <div className={s.total_blok}>
            <div className={s.total_count_subblock}>
              <p className={s.total_text}>{countRender()}</p>
              <p className={s.total_text}>Items</p>  
            </div>
            <div className={s.total_price_subblock}>  
            <p className={s.total_text}>Total</p>
            <p className={s.total_sum}>{priceRender()}$</p>
            </div>
          </div>
          <div className={s.inputs}>
            <input
              className={changeClass()}
              type="name"
              name="name"
              {...register('name', {
                required: true,
                pattern: /([a-zA-Z0-9_\s]+)/,
              })}
              placeholder="Name"
            />
            <input
              className={changeClass()}
              type="tel"
              name="phone"
              {...register('phone', {
                required: true,
                pattern: /^((8|\+374|\+994|\+995|\+375|\+7|\+380|\+38|\+996|\+998|\+993)[\- ]?)?\(?\d{3,5}\)?[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}(([\- ]?\d{1})?[\- ]?\d{1})?$/,
              })}
              placeholder="+7 (999) 9999999"
            />
            <input
              className={changeClass()}
              type="email"
              name="email"
              {...register('email', {
                required: true,
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              })}
              placeholder="example@gmail.com"
            />
            <input className={s.order_btn} type="submit" value="Order" />
          </div>
        </form>
      )}
    </>
  );
};

export default OrderForm;
