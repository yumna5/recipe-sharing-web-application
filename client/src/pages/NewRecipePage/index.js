import React from "react";
import "./NewRecipePage.css";
import RecipeEditor from "../../components/RecipeEditor";

// This page would have functions that save and push recipes into the database
// These functions would then be called within the RecipeEditor component

const NewRecipePage = () => {
  return <RecipeEditor isNewRecipe={true} />;
};

export default NewRecipePage;
