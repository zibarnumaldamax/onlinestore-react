import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import s from './style.module.css';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import logo from './logo.svg';
import icon from './basket_icon.svg';
import ModalMenu from '../ModalMenu';

const Header = () => {
  const [menuActive, setMenuActiveMenu] = useState(false);

  const { basket } = useSelector(state => state);
  const totalCount = basket.data.reduce((sum, { count }) => sum + count, 0);

  const changeClass = ({ isActive }) =>
    isActive ? [s.nav_link, s.active].join(' ') : s.nav_link;

  const menuHandler = () => {
    setMenuActiveMenu(!menuActive);
  };

  return (
    <header className={s.container}>
      <div className={s.header}>
        <Link to="/">
          <img className={s.logo} src={logo} alt="logo" />
        </Link>
        <nav className={s.nav}>
          <NavLink className={changeClass} onClick={menuHandler} to="/">
            Main Page
          </NavLink>
          <NavLink className={changeClass} onClick={menuHandler} to="/categories">
            Categories
          </NavLink>
          <NavLink className={changeClass} onClick={menuHandler} to="/products">
            All Products
          </NavLink>
          <NavLink
            className={changeClass}
            onClick={menuHandler}
            to="/sales/:AllSales"
          >
            All Sales
          </NavLink>
        </nav>

        <div className={s.icons}>
          <Link to="/basket">
            <Badge badgeContent={totalCount} color="success">
              <img className={s.basket_icon} src={icon} alt="basket_icon" />
            </Badge>
          </Link>
          <div className={s.burger} onClick={menuHandler}>
            <span className={menuActive ? s.active : ''}></span>
          </div>
        </div>
      </div>
      <ModalMenu active={menuActive} setActive={setMenuActiveMenu} />
    </header>
  );
};

export default Header;
