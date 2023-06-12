import React from "react";
import "./SearchPage.css";
import { useSearch } from "../../contexts/searchContext";
import SearchFilterBar from "../../components/SearchFilterBar";
import SearchIngredientBar from "../../components/SearchIngredientBar";
import Tag from "../../components/Tag";
import RecipeCard from "../../components/RecipeCard";

// This page would work similarly as it is currently working and the differences would be main
// in the search context

const SearchPage = () => {
  const {
    searchValue,
    generalAppliedFilters,
    ingredientAppliedFilters,
    searchResults,
  } = useSearch();

  return (
    <main className="SearchPage">
      <div className="SearchPage__wrapper">
        <SearchFilterBar />
        <SearchIngredientBar />
        <div className="SearchPage__resultsWrapper">
          <div className="SearchPage__titleWrapper">
            <h1 className="SearchPage__title">
              {searchValue === "" ? (
                <>Showing all recipes</>
              ) : (
                <>
                  Results for:{" "}
                  <span className="SearchPage__title--keyword">
                    {searchValue}
                  </span>
                </>
              )}
            </h1>

            {generalAppliedFilters.length !== 0 ? (
              <div className="SearchPage__filtersListWrapper">
                <p>Filters:</p>
                <div className="SearchPage__filtersList">
                  {generalAppliedFilters.map((filter) => (
                    <Tag tag={filter} key={`appliedFilter-${filter}`} />
                  ))}
                </div>
              </div>
            ) : null}

            {ingredientAppliedFilters.length !== 0 ? (
              <div className="SearchPage__filtersListWrapper">
                <p>Ingredients:</p>
                <div className="SearchPage__filtersList">
                  {ingredientAppliedFilters.map((filter) => (
                    <Tag tag={filter} key={`appliedFilter-${filter}`} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <div className="SearchPage__results">
            {searchResults.length === 0 ? (
              <p>No recipes found</p>
            ) : (
              <>
                {searchResults.map((result) => {
                  return (
                    <RecipeCard
                      title={result.title}
                      chef={result.chef}
                      tags={result.tags}
                      key={`searchRecipe-${result.name}-${result.chef}-${result._id}`}
                      slug={result.slug}
                      img={result.img}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
