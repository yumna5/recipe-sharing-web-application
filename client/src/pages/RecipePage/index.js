import React, { useState, useEffect } from "react";
import "./RecipePage.css";
import Button from "../../components/Button";
import GreyLarge from "../../images/grey.jpg";
import { useParams, useNavigate } from "react-router-dom";
import RecipeEditor from "../../components/RecipeEditor";
import { useAuth } from "../../contexts/authContext";
import { useUi } from "../../contexts/UiContext";
import * as API from "../../lib/api";

// This page would actually fetch the recipe data using the page slug instead of using a mock recipe.
// The page would also have functions to edit the recipe and push it onto the database if its the current
// user's own recipe
// Similarly, the page may also have a delete function that would remove it from the database

const RecipePage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { user, addToIngredientList } = useAuth();
  const { openSideBar } = useUi();
  const [editState, setEditState] = useState(false);

  const turnOnEditState = () => {
    setEditState(true);
  };

  const turnOffEditState = () => {
    setEditState(false);
  };

  const [displayRecipe, setDisplayRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllRecipes = async () => {
      const result = await API.getAllRecipes();
      const foundRecipe = result.recipe_ids.find(
        (recipe) => recipe.slug === recipeId
      );
      if (foundRecipe) {
        setDisplayRecipe(foundRecipe);
        setIsLoading(false);
      } else {
        navigate("/");
      }
    };

    getAllRecipes();
  }, [recipeId, navigate]);

  // vegetables
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const handleIngredientSelectChange = (value) => {
    setSelectedIngredients((prev) => [...prev, value]);
  };

  const addSelectedIngredientsToList = (e) => {
    e.preventDefault();
    addToIngredientList(selectedIngredients);
    openSideBar();
  };

  return (
    <>
      {editState ? (
        <RecipeEditor
          isNewRecipe={false}
          recipe={displayRecipe}
          discardFunction={turnOffEditState}
        />
      ) : (
        <>
          <header className="RecipePage__header">
            {isLoading ? (
              <div className="RecipePage__bannerContent">Loading...</div>
            ) : (
              <div className="RecipePage__bannerContent">
                <h1 className="RecipePage__title">{displayRecipe.title}</h1>
                <p className="RecipePage__subtitle">By: {displayRecipe.chef}</p>
                <p className="RecipePage__description">
                  {displayRecipe.description}
                </p>
                <div className="RecipePage__buttonsWrapper">
                  {!!user ? (
                    <>
                      {user.username == displayRecipe.chef ? (
                        <>
                          <Button
                            text="Edit recipe"
                            variant="primary"
                            ariaLabel="Edit recipe"
                            type="button"
                            onClick={turnOnEditState}
                          />
                          <Button
                            text="Publish recipe"
                            variant="outline"
                            ariaLabel="Publish recipe"
                            type="button"
                            onClick={() => {}}
                            className="RecipePage__button"
                          />
                        </>
                      ) : (
                        <>
                          <Button
                            text="Save recipe"
                            variant="primary"
                            ariaLabel="Save recipe"
                            type="button"
                            onClick={() => {}}
                          />
                          <Button
                            text="Share recipe"
                            variant="outline"
                            ariaLabel="Share recipe"
                            type="button"
                            onClick={() => {}}
                            className="RecipePage__button"
                          />
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Button
                        text="Share recipe"
                        variant="outline"
                        ariaLabel="Share recipe"
                        type="button"
                        onClick={() => {}}
                        className="RecipePage__button"
                      />
                    </>
                  )}
                </div>
              </div>
            )}
            {isLoading ? (
              <div className="Recipepage__bannerImgWrapper"></div>
            ) : (
              <div className="RecipePage__bannerImgWrapper">
                <img
                  src={displayRecipe.img ? displayRecipe.img : GreyLarge}
                  alt="Pasta"
                  className="RecipePage__bannerImg"
                />
              </div>
            )}
          </header>
          <main className="RecipePage__main">
            <div className="RecipePage__leftBar">
              <h2 className="RecipePage__sectionTitle RecipePage__sectionTitle--lessMargin">
                Ingredients
              </h2>
              {!isLoading && (
                <>
                  <p className="RecipePage__servingInfo">
                    1 serving serves {displayRecipe.servingAmount} people
                  </p>
                  {user !== null ? (
                    <form className="RecipePage__ingredientsList">
                      {displayRecipe.ingredients.map((ingredient, i) => {
                        return (
                          <label
                            key={`recipe-ingredient-${ingredient}`}
                            className="RecipePage__ingredient"
                          >
                            <input
                              type="checkbox"
                              name="ingredients"
                              id={`ingredient-${ingredient}`}
                              value={ingredient}
                              className="RecipePage__ingredientInput"
                              checked={selectedIngredients.includes(ingredient)}
                              onChange={() =>
                                handleIngredientSelectChange(ingredient)
                              }
                            />
                            <span>{ingredient}</span>
                          </label>
                        );
                      })}
                      <Button
                        text="Add to list"
                        ariaLabel="Add to list"
                        type="submit"
                        variant="outline"
                        onClick={addSelectedIngredientsToList}
                      />
                    </form>
                  ) : (
                    <ul className="RecipePage__materials">
                      {displayRecipe.ingredients.map((ingredient, i) => {
                        return (
                          <li
                            key={`recipe-material-${ingredient}`}
                            className="RecipePage__material"
                          >
                            <p>{ingredient}</p>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              )}
              <h2 className="RecipePage__sectionTitle RecipePage__sectionTitle--lessMargin">
                Materials
              </h2>
              {!isLoading && (
                <ul className="RecipePage__materials">
                  {displayRecipe.materials.map((material, i) => {
                    return (
                      <li
                        key={`recipe-material-${material}`}
                        className="RecipePage__material"
                      >
                        <p>{material}</p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="RecipePage__mainContent">
              <h2 className="RecipePage__sectionTitle">Instructions</h2>
              {!isLoading && (
                <ol className="RecipePage__instructions">
                  {displayRecipe.instructions.map((instruction, i) => {
                    return (
                      <li
                        className="RecipePage__instruction"
                        key={`recipe-${instruction}`}
                      >
                        <p>{instruction}</p>
                      </li>
                    );
                  })}
                </ol>
              )}

              <h2 className="RecipePage__sectionTitle">Notes/Tips</h2>
              {!isLoading && (
                <ul className="RecipePage__instructions">
                  {displayRecipe.notes.map((note, i) => {
                    return (
                      <li
                        className="RecipePage__instruction"
                        key={`recipe-${note}`}
                      >
                        <p>{note}</p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default RecipePage;
