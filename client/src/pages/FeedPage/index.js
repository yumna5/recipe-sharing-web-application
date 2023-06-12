import React, { useState, useEffect } from "react";
import "./FeedPage.css";
import RecipeCard from "../../components/RecipeCard";
import * as API from "../../lib/api";

// This page would actually fetch all the recent recipes from users the current user follows

const mockRecipes = [
  {
    name: "Homemade Pasta",
    chef: "Udit Desai",
    tags: ["Italian", "~ 1 hour", "Vegetarian", "Onion"],
  },
  {
    name: "Chicken Pasta",
    chef: "Eman Elsabban",
    tags: ["Italian", "~ 2 hour", "Chicken"],
  },
  {
    name: "Low carb Pasta",
    chef: "Yumna Akhtar",
    tags: ["Italian", "~ 1 hour", "Low carbs"],
  },
  {
    name: "Homemade Pasta",
    chef: "Udit Desai",
    tags: ["Italian", "~ 1 hour", "Vegetarian", "Onion"],
  },
  {
    name: "Chicken Pasta",
    chef: "Eman Elsabban",
    tags: ["Italian", "~ 2 hour", "Chicken"],
  },
  {
    name: "Low carb Pasta",
    chef: "Yumna Akhtar",
    tags: ["Italian", "~ 1 hour", "Low carbs"],
  },
];

const FeedPage = () => {
  const [feedRecipes, setFeedRecipes] = useState([]);

  useEffect(() => {
    const getFeed = async () => {
      const feed = await API.getFeed();
      setFeedRecipes(feed);
    };

    getFeed();
  }, []);

  return (
    <main className="FeedPage__main">
      <h1 className="FeedPage__title">Recipes from chefs you follow</h1>
      <div className="FeedPage__recipeGrid">
        {feedRecipes.map((recipe, i) => (
          <RecipeCard
            title={recipe.title}
            chef={recipe.chef}
            tags={recipe.tags}
            key={`feedPage-recipe=${recipe.name}-${recipe.chef}-${i}`}
            img={recipe.img}
            slug={recipe.slug}
          />
        ))}
      </div>
    </main>
  );
};

export default FeedPage;
