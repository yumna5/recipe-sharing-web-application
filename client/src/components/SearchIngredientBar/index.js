import React, { useState } from "react";
import "./SearchIngredientBar.css";
import { useSearch } from "../../contexts/searchContext";
import Button from "../Button";

const SearchIngredientBar = () => {
  const { ingredientFilters, changeIngredientAppliedFilters } = useSearch();
  const { vegetables, proteins, fruits } = ingredientFilters;

  // vegetables
  const [vegetableFilters, setVegetableFilters] = useState(
    new Array(vegetables.length).fill(false)
  );
  const handleVegetableFilterChange = (i) => {
    setVegetableFilters((prev) => {
      const newState = prev.map((item, index) => {
        if (index === i) return true;
        else return item;
      });

      return newState;
    });
  };

  const [allVegetableOptionsShown, setAllVegetableOptionsShown] =
    useState(false);
  const toggleAllVegetableOptions = () =>
    setAllVegetableOptionsShown((prev) => !prev);

  // proteins
  const [proteinFilters, setProteinFilters] = useState(
    new Array(proteins.length).fill(false)
  );
  const handleProteinFilterChange = (i) => {
    setProteinFilters((prev) => {
      const newState = prev.map((item, index) => {
        if (index === i) return true;
        else return item;
      });

      return newState;
    });
  };

  const [allProteinOptionsShown, setAllProteinOptionsShown] = useState(false);
  const toggleAllProteinOptions = () =>
    setAllProteinOptionsShown((prev) => !prev);

  // fruits
  const [fruitFilters, setFruitFilters] = useState(
    new Array(fruits.length).fill(false)
  );
  const handleFruitFilterChange = (i) => {
    setFruitFilters((prev) => {
      const newState = prev.map((item, index) => {
        if (index === i) return true;
        else return item;
      });

      return newState;
    });
  };

  const [allFruitOptionsShown, setAllFruitOptionsShown] = useState(false);
  const toggleAllFruitOptions = () => setAllFruitOptionsShown((prev) => !prev);

  const applyFilters = () => {
    const appliedFilters = [];

    vegetableFilters.forEach((item, i) => {
      if (item === true) appliedFilters.push(vegetables[i]);
    });

    proteinFilters.forEach((item, i) => {
      if (item === true) appliedFilters.push(proteins[i]);
    });

    fruitFilters.forEach((item, i) => {
      if (item === true) appliedFilters.push(fruits[i]);
    });

    changeIngredientAppliedFilters(appliedFilters);
  };

  const resetFilters = () => {
    setVegetableFilters(new Array(vegetables.length).fill(false));
    setProteinFilters(new Array(proteins.length).fill(false));
    setFruitFilters(new Array(fruits.length).fill(false));

    changeIngredientAppliedFilters([]);
  };

  return (
    <div className="SearchIngredientBar">
      <h2 className="SearchIngredientBar__title">Ingredient Filter</h2>

      <div className="SearchIngredientBar__groups">
        <div className="SearchIngredientBar__group">
          <h3 className="SearchIngredientBar__group__title">Vegetables</h3>
          <div className="SearchIngredientBar__group__options">
            {vegetables
              .slice(0, allVegetableOptionsShown ? vegetables.length : 4)
              .map((item, i) => {
                return (
                  <label className="SearchIngredientBar__group__optionLabel">
                    <input
                      type="checkbox"
                      name="vegetable"
                      id={`vegetable-${item}`}
                      value="item"
                      className="SearchIngredientBar__group__optionInput"
                      checked={vegetableFilters[i]}
                      onChange={() => handleVegetableFilterChange(i)}
                    />
                    <span>{item}</span>
                  </label>
                );
              })}
          </div>
          <Button
            text={allVegetableOptionsShown ? "Hide options" : "View all"}
            ariaLabel={
              allVegetableOptionsShown
                ? "Hide vegetable options"
                : "View all vegetable options"
            }
            type="button"
            variant="outline"
            className="SearchIngredientBar__group__button"
            onClick={toggleAllVegetableOptions}
          />
        </div>

        <div className="SearchIngredientBar__group">
          <h3 className="SearchIngredientBar__group__title">Proteins</h3>
          <div className="SearchIngredientBar__group__options">
            {proteins
              .slice(0, allProteinOptionsShown ? proteins.length : 3)
              .map((item, i) => {
                return (
                  <label className="SearchIngredientBar__group__optionLabel">
                    <input
                      type="checkbox"
                      name="protein"
                      id={`protein-${item}`}
                      value="item"
                      className="SearchIngredientBar__group__optionInput"
                      checked={proteinFilters[i]}
                      onChange={() => handleProteinFilterChange(i)}
                    />
                    <span>{item}</span>
                  </label>
                );
              })}
          </div>
          <Button
            text={allProteinOptionsShown ? "Hide options" : "View all"}
            ariaLabel={
              allProteinOptionsShown
                ? "Hide protein options"
                : "View all protein options"
            }
            type="button"
            variant="outline"
            className="SearchIngredientBar__group__button"
            onClick={toggleAllProteinOptions}
          />
        </div>

        <div className="SearchIngredientBar__group">
          <h3 className="SearchIngredientBar__group__title">Fruits</h3>
          <div className="SearchIngredientBar__group__options">
            {fruits
              .slice(0, allFruitOptionsShown ? fruits.length : 3)
              .map((item, i) => {
                return (
                  <label className="SearchIngredientBar__group__optionLabel">
                    <input
                      type="checkbox"
                      name="fruit"
                      id={`fruit-${item}`}
                      value="item"
                      className="SearchIngredientBar__group__optionInput"
                      checked={fruitFilters[i]}
                      onChange={() => handleFruitFilterChange(i)}
                    />
                    <span>{item}</span>
                  </label>
                );
              })}
          </div>
          <Button
            text={allFruitOptionsShown ? "Hide options" : "View all"}
            ariaLabel={
              allFruitOptionsShown
                ? "Hide restriction options"
                : "View all restriction options"
            }
            type="button"
            variant="outline"
            className="SearchIngredientBar__group__button"
            onClick={toggleAllFruitOptions}
          />
        </div>
      </div>

      <div className="SearchIngredientBar__controls">
        <Button
          text="Apply"
          ariaLabel="apply filters"
          type="button"
          variant="primary"
          onClick={applyFilters}
        />
        <Button
          text="Reset"
          ariaLabel="reset filters"
          type="button"
          variant="outline"
          onClick={resetFilters}
        />
      </div>
    </div>
  );
};

export default SearchIngredientBar;
