import React from 'react';
import s from './style.module.css';
import ProductItem from '../../components/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Filter from '../../components/Filter/';
import { useEffect } from 'react';
import { resetFilter } from '../../store/slices/productsSlice';
import MobilAccordion from '../../components/MobilAccordion';

const ProductsPage = () => {
  const { categoryTitle, categoryID, AllSales } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(resetFilter());
  }, [dispatch]);

  useEffect(() => {
    if (AllSales) {
      document.title = 'All Sales';
    } else if (categoryID) {
      document.title = `Category: ${categoryTitle}`;
    } else {
      document.title = 'Products';
    }
  }, [location.pathname, AllSales, categoryID, categoryTitle]);

  const products = useSelector(({ products: { data } }) => {
    if (AllSales) {
      return data.filter(el => !!el.discont_price);
    } else {
      return categoryID
        ? data.filter(({ categoryId }) => +categoryID === categoryId)
        : data;
    }
  });

  const titleRender = () => {
    if (categoryTitle) {
      return categoryTitle;
    } else if (AllSales) {
      return 'Products with sale';
    } else {
      return 'All products';
    }
  };

  return (
    <div className={s.products_page}>
      <h1 className={s.title}>{titleRender()}</h1>
      <div className={s.hidden}>
        <Filter />
      </div>
      <div className={s.mob_filter}>
        <MobilAccordion title={'Filters'}>{<Filter />}</MobilAccordion>
      </div>
      <div className={s.products_container}>
        {products
          .filter(({ show }) => show)
          .filter(({ discount }) => discount)
          .map(el => (
            <ProductItem key={el.id} {...el} />
          ))}
      </div>
    </div>
  );
};

export default ProductsPage;
