import React from 'react';
import s from './style.module.css';
import { Link } from 'react-router-dom';
import { baseLink } from '../../store/slices/baseLink';

const CategoryItem = ({ id, title, image }) => {
  return (
    <Link className={s.item} to={`/categories/${title}/${id}`}>
      <img src={`${baseLink}/${image}`} alt={title} />
      <p>{title}</p>
    </Link>
  );
};

export default CategoryItem;
