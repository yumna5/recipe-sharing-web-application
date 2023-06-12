import React, { useState } from "react";
import "./SearchFilterBar.css";
import { useSearch } from "../../contexts/searchContext";
import Button from "../Button";

const SearchFilterBar = () => {
  const { generalFilters, changeGeneralAppliedFilters } = useSearch();
  const { cuisines, times, restrictions } = generalFilters;

  // cuisines
  const [cuisineFilters, setCuisineFilters] = useState(
    new Array(cuisines.length).fill(false)
  );
  const handleCuisineFilterChange = (i) => {
    setCuisineFilters((prev) => {
      const newState = prev.map((item, index) => {
        if (index === i) return true;
        else return item;
      });

      return newState;
    });
  };

  const [allCuisineOptionsShown, setAllCuisineOptionsShown] = useState(false);
  const toggleAllCuisineOptions = () =>
    setAllCuisineOptionsShown((prev) => !prev);

  // times
  const [timeFilters, setTimeFilters] = useState(
    new Array(times.length).fill(false)
  );
  const handleTimeFilterChange = (i) => {
    setTimeFilters((prev) => {
      const newState = prev.map((item, index) => {
        if (index === i) return true;
        else return item;
      });

      return newState;
    });
  };

  const [allTimeOptionsShown, setAllTimeOptionsShown] = useState(false);
  const toggleAllTimeOptions = () => setAllTimeOptionsShown((prev) => !prev);

  // restrictions
  const [restrictionFilters, setRestrictionFilters] = useState(
    new Array(restrictions.length).fill(false)
  );
  const handleRestrictionFilterChange = (i) => {
    setRestrictionFilters((prev) => {
      const newState = prev.map((item, index) => {
        if (index === i) return true;
        else return item;
      });

      return newState;
    });
  };

  const [allRestrictionOptionsShown, setAllRestrictionOptionsShown] =
    useState(false);
  const toggleAllRestrictionOptions = () =>
    setAllRestrictionOptionsShown((prev) => !prev);

  const applyFilters = () => {
    const appliedFilters = [];

    cuisineFilters.forEach((item, i) => {
      if (item === true) appliedFilters.push(cuisines[i]);
    });

    timeFilters.forEach((item, i) => {
      if (item === true) appliedFilters.push(times[i]);
    });

    restrictionFilters.forEach((item, i) => {
      if (item === true) appliedFilters.push(restrictions[i]);
    });

    changeGeneralAppliedFilters(appliedFilters);
  };

  const resetFilters = () => {
    setCuisineFilters(new Array(cuisines.length).fill(false));
    setTimeFilters(new Array(times.length).fill(false));
    setRestrictionFilters(new Array(restrictions.length).fill(false));

    changeGeneralAppliedFilters([]);
  };

  return (
    <div className="SearchFilterBar">
      <h2 className="SearchFilterBar__title">General Filter</h2>

      <div className="SearchFilterBar__groups">
        <div className="SearchFilterBar__group">
          <h3 className="SearchFilterBar__group__title">Cuisine</h3>
          <div className="SearchFilterBar__group__options">
            {cuisines
              .slice(0, allCuisineOptionsShown ? cuisines.length : 4)
              .map((item, i) => {
                return (
                  <label
                    className="SearchFilterBar__group__optionLabel"
                    key={`cuisine-${item}`}
                  >
                    <input
                      type="checkbox"
                      name="cuisine"
                      id={`cuisine-${item}`}
                      value="item"
                      className="SearchFilterBar__group__optionInput"
                      checked={cuisineFilters[i]}
                      onChange={() => handleCuisineFilterChange(i)}
                    />
                    <span>{item}</span>
                  </label>
                );
              })}
          </div>
          <Button
            text={allCuisineOptionsShown ? "Hide options" : "View all"}
            ariaLabel={
              allCuisineOptionsShown
                ? "Hide cuisine options"
                : "View all cuisine options"
            }
            type="button"
            variant="outline"
            className="SearchFilterBar__group__button"
            onClick={toggleAllCuisineOptions}
          />
        </div>

        <div className="SearchFilterBar__group">
          <h3 className="SearchFilterBar__group__title">
            Prep and Cooking Time
          </h3>
          <div className="SearchFilterBar__group__options">
            {times
              .slice(0, allTimeOptionsShown ? times.length : 3)
              .map((item, i) => {
                return (
                  <label
                    className="SearchFilterBar__group__optionLabel"
                    key={`time-${item}`}
                  >
                    <input
                      type="checkbox"
                      name="time"
                      id={`time-${item}`}
                      value="item"
                      className="SearchFilterBar__group__optionInput"
                      checked={timeFilters[i]}
                      onChange={() => handleTimeFilterChange(i)}
                    />
                    <span>{item}</span>
                  </label>
                );
              })}
          </div>
          <Button
            text={allTimeOptionsShown ? "Hide options" : "View all"}
            ariaLabel={
              allTimeOptionsShown
                ? "Hide time options"
                : "View all time options"
            }
            type="button"
            variant="outline"
            className="SearchFilterBar__group__button"
            onClick={toggleAllTimeOptions}
          />
        </div>

        <div className="SearchFilterBar__group">
          <h3 className="SearchFilterBar__group__title">
            Dietary Restrictions
          </h3>
          <div className="SearchFilterBar__group__options">
            {restrictions
              .slice(0, allRestrictionOptionsShown ? restrictions.length : 3)
              .map((item, i) => {
                return (
                  <label
                    className="SearchFilterBar__group__optionLabel"
                    key={`restriction-${item}`}
                  >
                    <input
                      type="checkbox"
                      name="restriction"
                      id={`restriction-${item}`}
                      value="item"
                      className="SearchFilterBar__group__optionInput"
                      checked={restrictionFilters[i]}
                      onChange={() => handleRestrictionFilterChange(i)}
                    />
                    <span>{item}</span>
                  </label>
                );
              })}
          </div>
          <Button
            text={allRestrictionOptionsShown ? "Hide options" : "View all"}
            ariaLabel={
              allRestrictionOptionsShown
                ? "Hide restriction options"
                : "View all restriction options"
            }
            type="button"
            variant="outline"
            className="SearchFilterBar__group__button"
            onClick={toggleAllRestrictionOptions}
          />
        </div>
      </div>

      <div className="SearchFilterBar__controls">
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

export default SearchFilterBar;
