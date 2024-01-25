import React from 'react';
import { useForm } from 'react-hook-form';
import s from './style.module.css';
import { fetchGetDiscount } from '../../services/discountRequest';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const DiscountForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = data => {
    fetchGetDiscount(data.phone, data.email, data.name).then(res => {
      if (res.status === 'OK') {
        toast.success(`Successful! We've sent you code on your phone and email`, {
          autoClose: 2000,
        });
      } else {
        toast.error(res, { autoClose: 3500 });
      }
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ name: '', phone: '', email: '' });
    }
  }, [isSubmitSuccessful, reset]);

  const changeClass = () => {
    return errors.phone?.type === 'pattern'
      ? `${s.input_tel} ${s.reject}`
      : s.input_tel;
  };

  return (
    <div className={s.form}>
      <div className={s.overlay}></div>
      <div className={s.disc_item}>
          <p className={s.disc_info}>
            <p>5% off<br/>on the first order</p>
          </p>
        <div className={s.disc_form_box}>
          <form className={s.disc_form} onSubmit={handleSubmit(onSubmit)}>
          <input
              className={changeClass()}
              type="name"
              {...register('name', {
                required: true,
                pattern: /([a-zA-Z0-9_\s]+)/,
              })}
              placeholder="Name"
            />
            {errors.name?.type === 'required' && (
              <p className={s.required}>
                This field is required, please type your name
              </p>
            )}
            <input
              className={changeClass()}
              type="tel"
              {...register('phone', {
                required: true,
                pattern: /^((8|\+374|\+994|\+995|\+375|\+7|\+380|\+38|\+996|\+998|\+993)[\- ]?)?\(?\d{3,5}\)?[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}(([\- ]?\d{1})?[\- ]?\d{1})?$/,
              })}
              placeholder="+7 (999) 9999999"
            />
            {errors.phone?.type === 'required' && (
              <p className={s.required}>
                This field is required, please type your phone number
              </p>
            )}
            <input
              className={changeClass()}
              type="email"
              {...register('email', {
                required: true,
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              })}
              placeholder="example@gmail.com"
            />
            {errors.email?.type === 'required' && (
              <p className={s.required}>
                This field is required, please type your email
              </p>
            )}
            <input
              className={s.submit_btn}
              type="submit"
              value="Get a discount"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default DiscountForm;
