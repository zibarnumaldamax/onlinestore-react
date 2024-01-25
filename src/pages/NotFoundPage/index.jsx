import React from "react";
import s from "./style.module.css";
import image from "./404-Page.png";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className={s.page}>
      <img className={s.img} src={image} alt="" />
      <Link to="/" className={s.home_btn}>
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
