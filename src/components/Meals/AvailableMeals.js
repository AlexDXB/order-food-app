import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [httpError, setError] = useState(null);
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      const response = await fetch(
        "https://practise1-d84e7-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          price: responseData[key].price,
          description: responseData[key].description,
        });
      }
      setMeals(loadedMeals);
      setLoading(false);
    };

    fetchMeals().catch((err) => {
      setLoading(false);
      setError(err.message);
    });
  }, []);

  if (loading) {
    return (
      <section className={classes.Mealsloading}>
        <p>Loading</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.MealslError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealslist = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealslist}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
