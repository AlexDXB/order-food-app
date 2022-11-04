import { useRef, useState } from "react";
import classes from "./CheckOut.module.css";

const isEmpty = (value) => value.trim() === "";
const isNotSixChars = (value) => value.trim().length !== 6;

const CheckOut = (props) => {
  const nameInput = useRef();
  const streetInput = useRef();
  const postalInput = useRef();
  const cityInput = useRef();
  const [formInputsValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();
    const enterdName = nameInput.current.value;
    const enterdStreet = streetInput.current.value;
    const enterdPostal = postalInput.current.value;
    const enterdCity = cityInput.current.value;

    const enterdNameisValid = !isEmpty(enterdName);
    const enterdStreetIsValid = !isEmpty(enterdStreet);
    const enterdPostalIsValid = !isNotSixChars(enterdPostal);
    const enterdCityIsValid = !isEmpty(enterdCity);

    setFormInputValidity({
      name: enterdNameisValid,
      street: enterdStreetIsValid,
      postalCode: enterdPostalIsValid,
      city: enterdCityIsValid,
    });

    const formIsValid =
      enterdNameisValid &&
      enterdStreetIsValid &&
      enterdPostalIsValid &&
      enterdCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enterdName,
      street: enterdStreet,
      city: enterdCity,
      postalCode: enterdPostal,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputsValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input ref={nameInput} type="text" id="name" />
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input ref={streetInput} type="text" id="street" />
        {!formInputsValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.postalCode ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInput} type="text" id="postal" />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input ref={cityInput} type="text" id="city" />
        {!formInputsValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOut;
