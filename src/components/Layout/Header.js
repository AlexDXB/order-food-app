import React, { useState } from "react";
import { Fragment } from "react";
import mealsImage from "../../assets/meals.jpeg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  const [showCart, setShowCart] = useState(false);

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>SmokeyFood</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="mealsImage"></img>
      </div>
    </Fragment>
  );
};

export default Header;
