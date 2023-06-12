import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import "./AdminFeedPage.css";
import RecipeCard from "../../components/RecipeCard";
import ChefCard from "../../components/ChefCard";
import * as API from "../../lib/api";

const AdminFeedPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [recipes, setRecipes] = useState([]);
  const [chefs, setChefs] = useState([]);

  const [numChefs, setNumChefs] = useState(6);
  const [numRecipes, setNumRecipes] = useState(6);

  const showAllChefs = () => {
    setNumChefs(chefs.length);
  };
  const hideAllChefs = () => {
    setNumChefs(6);
  };

  const showAllRecipes = () => {
    setNumRecipes(recipes.length);
  };
  const hideAllRecipes = () => {
    setNumRecipes(6);
  };

  useEffect(() => {
    if (!user) navigate("/signin");
    if (user && user.type !== "admin") navigate("/");

    const getRecipesAndChefs = async () => {
      const recipeResult = await API.getAllRecipes();
      const chefResult = await API.getAllUsers();
      setChefs(chefResult);
      setRecipes(recipeResult.recipe_ids);
    };

    getRecipesAndChefs();
  }, [user, navigate]);

  return (
    <main className="AdminFeedPage">
      <div className="AdminFeedPage__section">
        <div className="AdminFeedPage__sectionTitleWrapper">
          <h1 className="AdminFeedPage__sectionTitle">Recipes</h1>

          <Button
            type="button"
            text={numRecipes === 6 ? "View all" : "Hide all"}
            ariaLabel={numRecipes === 6 ? "View all" : "Hide all"}
            variant="outline"
            onClick={numRecipes === 6 ? showAllRecipes : hideAllRecipes}
          />
        </div>

        <div className="AdminFeedPage__grid">
          {recipes.slice(-numRecipes).map((recipe, i) => (
            <RecipeCard
              title={recipe.title}
              chef={recipe.chef}
              tags={recipe.tags}
              key={`adminFeedPage-recipe=${recipe.name}-${recipe.chef}-${i}`}
              img={recipe.img}
              slug={recipe.slug}
            />
          ))}
        </div>

        <Button
          type="button"
          text={numRecipes === 6 ? "View all" : "Hide all"}
          ariaLabel={numRecipes === 6 ? "View all" : "Hide all"}
          variant="outline"
          onClick={numRecipes === 6 ? showAllRecipes : hideAllRecipes}
        />
      </div>

      <div className="AdminFeedPage__section">
        <div className="AdminFeedPage__sectionTitleWrapper">
          <h1 className="AdminFeedPage__sectionTitle">Users</h1>

          <Button
            type="button"
            text={numChefs === 6 ? "View all" : "Hide all"}
            ariaLabel={numChefs === 6 ? "View all" : "Hide all"}
            variant="outline"
            onClick={numChefs === 6 ? showAllChefs : hideAllChefs}
          />
        </div>

        <div className="AdminFeedPage__grid">
          {chefs
            .filter((chef) => chef.type !== "admin")
            .slice(-numChefs)
            .map((chef, i) => (
              <ChefCard
                key={`adminpage-chef-${chef.name}-${i}`}
                name={chef.name}
                username={chef.username}
                bio={chef.bio}
                followers={chef.followers}
                following={chef.following}
              />
            ))}
        </div>

        <Button
          type="button"
          text={numChefs === 6 ? "View all" : "Hide all"}
          ariaLabel={numChefs === 6 ? "View all" : "Hide all"}
          variant="outline"
          onClick={numChefs === 6 ? showAllChefs : hideAllChefs}
        />
      </div>
    </main>
  );
};

export default AdminFeedPage;
