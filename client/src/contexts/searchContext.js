import React, { createContext, useState, useContext, useEffect } from "react";
import * as API from "../lib/api";

const cuisines = [
  "Italian",
  "Mexian",
  "Chinese",
  "Thai",
  "Punjabi",
  "German",
  "Vietnamese",
  "South Indian",
  "Greek",
  "Egyptian",
];

const times = [
  "Under 30 mins",
  "~ 1 hour",
  "~ 2 hours",
  "~ 3 hours",
  "~ 4 hours",
  "~ 1 day",
  "More than a day",
];

const restrictions = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Lactose intolerant",
  "Low carbs",
];

const vegetables = [
  "Spinach",
  "Cucumber",
  "Onion",
  "Potato",
  "Olives",
  "Green peppers",
  "Bell peppers",
  "Jalapenos",
  "Eggplant",
  "Zucchini",
];

const proteins = [
  "Chicken",
  "Beef",
  "Pork",
  "Mutton",
  "Fish",
  "Tofu",
  "Pinto beans",
];

const fruits = [
  "Apple",
  "Banana",
  "Watermelon",
  "Grapes",
  "Pear",
  "Strawberry",
];

const generalFilters = {
  cuisines: cuisines,
  times: times,
  restrictions: restrictions,
};

const ingredientFilters = {
  vegetables: vegetables,
  proteins: proteins,
  fruits: fruits,
};

const SearchContext = createContext(null);

// Instead of using mock recipes and filters, this context should
// fetch recipes from the database given the search keyword and then filter it on frontend based on filters

export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [generalAppliedFilters, setGeneralAppliedFilters] = useState([]);
  const [ingredientAppliedFilters, setIngredientAppliedFilters] = useState([]);

  const changeSearchValue = (value) => {
    setSearchValue(value);
  };

  const changeGeneralAppliedFilters = (newFilterList) =>
    setGeneralAppliedFilters(newFilterList);

  const changeIngredientAppliedFilters = (newFilterList) =>
    setIngredientAppliedFilters(newFilterList);

  useEffect(() => {
    let results = allRecipes;

    if (searchValue !== "") {
      results = results.filter((recipe) => {
        if (recipe.title.toLowerCase().includes(searchValue.toLowerCase()))
          return true;
        else if (recipe.chef.includes(searchValue)) return true;
        else return false;
      });
    }

    if (generalAppliedFilters.length !== 0) {
      results = results.filter((recipe) => {
        let filterNotFound = false;

        for (let i = 0; i < generalAppliedFilters.length; i++) {
          if (!recipe.tags.includes(generalAppliedFilters[i])) {
            filterNotFound = true;
            break;
          }
        }

        if (filterNotFound) return false;
        else return true;
      });
    }

    if (ingredientAppliedFilters.length !== 0) {
      results = results.filter((recipe) => {
        let filterNotFound = false;

        for (let i = 0; i < ingredientAppliedFilters.length; i++) {
          if (!recipe.tags.includes(ingredientAppliedFilters[i])) {
            filterNotFound = true;
            break;
          }
        }

        if (filterNotFound) return false;
        else return true;
      });
    }

    setSearchResults(results);
  }, [
    searchValue,
    generalAppliedFilters,
    ingredientAppliedFilters,
    allRecipes,
  ]);

  useEffect(() => {
    const getAllRecipes = async () => {
      const result = await API.getAllRecipes();
      setAllRecipes(result.recipe_ids);
    };

    getAllRecipes();
  }, [searchValue]);

  return (
    <SearchContext.Provider
      value={{
        generalFilters,
        generalAppliedFilters,
        changeGeneralAppliedFilters,
        ingredientFilters,
        ingredientAppliedFilters,
        changeIngredientAppliedFilters,
        searchValue,
        changeSearchValue,
        searchResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

/**
 * A React hook to expose context values to components.
 */
export const useSearch = () => {
  const search = useContext(SearchContext);
  if (search === null)
    throw new Error(
      "useSearch must be used within the context of the SearchContext.Provider"
    );
  return search;
};
