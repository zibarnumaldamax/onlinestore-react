import React, { useState, useEffect } from 'react';
import s from './style.module.css'
import { useDispatch } from 'react-redux';
import {  useLocation, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { searchByPrice, sort, filterDiscount, resetFilter } from '../../store/slices/productsSlice';

const Filter = () => {
    //const initialFilters = {from: 0, to: Infinity}
    const initialFilters = useMemo(() => {
        return { from: 0, to: Infinity };
      }, []);
    const [price, setPrice] = useState(initialFilters)
    const [discount, setDiscount] = useState(false)
    const {sales} = useParams()
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(()=>{
        dispatch(searchByPrice(price))
    },[price, dispatch])

    useEffect(() => {
        dispatch(resetFilter())
        dispatch(filterDiscount(false))
        setDiscount(false)
        setPrice(initialFilters)
    },[location, dispatch, initialFilters])

    const onChangeFilter = (by, data) => {
        setPrice({
            ...price,
            [by]:data
        })
    }
    const onChangeDiscount = (e) => {
        setDiscount(e.target.checked)
        dispatch(filterDiscount(e.target.checked))
    }
    const onChangeSort = (e) => {
        dispatch(sort(+e.target.value))
    }

    return (
        <form className={s.filter_form}>
            <div className={s.inputs_price}>
                <span className={s.label}>Price</span>
                <input onChange={
                    (e) => onChangeFilter('from', +e.target.value)} 
                    type="number" 
                    name="from" 
                    placeholder='from'
                    value={price.from ? price.from : '' }
                />
                <input 
                    onChange={(e) => 
                        onChangeFilter('to', e.target.value === '' ? Infinity : +e.target.value )}
                    type="number" 
                    name="to" 
                    placeholder='to' 
                    value={price.to === Infinity ? '' : price.to}
                    />
            </div>
            {   
                !sales && (
                    <div className={s.checkbox}>
                        <span className={s.label}>Discounted items</span>
                        <input 
                            type="checkbox" 
                            name="discount" 
                            checked={discount} 
                            onChange={onChangeDiscount}
                        />
                    </div>
                )
            }
            <div className={s.sort_options}>
                <span className={s.label}>Sorted</span>
                <select onChange={ onChangeSort } defaultValue='0'>
                    <option value="0" disabled hidden>Select option</option>
                    <option value="1">Price: Low to High</option>
                    <option value="-1">Price: High to Low</option>
                </select>
            </div>  
        </form>
    );
};

export default Filter;