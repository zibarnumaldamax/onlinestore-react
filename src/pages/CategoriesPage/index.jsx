import React, { useEffect } from 'react';
import s from './style.module.css'
import { useSelector } from 'react-redux';
import CategoryItem from '../../components/CategoryItem';

const CategoriesPage = () => {

    const { list } = useSelector(state => state.categories)

    useEffect(() => {
        document.title = "Catalog"
    },[])

    return (
        <div className={s.categories_page}>
            <h1 className={s.title}>Categories</h1>
            <div className={s.categories}>
                {
                    list.map(el => <CategoryItem key={el.id} {...el}/>)
                }
            </div>
        </div>
    );
};

export default CategoriesPage;