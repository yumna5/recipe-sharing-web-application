import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Button from "../../components/Button";
import PastaLarge from "../../images/pastaLarge.jpg";
import RecipeCard from "../../components/RecipeCard";
import ChefCard from "../../components/ChefCard";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import * as API from "../../lib/api";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    if (user && user.type === "admin") {
      navigate("/adminFeed");
    }

    const getRecipesAndChefs = async () => {
      const recipeResult = await API.getAllRecipes();
      const chefResult = await API.getAllUsers();
      setChefs(chefResult);
      setRecipes(recipeResult.recipe_ids);
    };

    getRecipesAndChefs();
  }, [user, navigate]);

  return (
    <>
      {!user && (
        <header className="HomePage__header">
          <div className="HomePage__bannerContent">
            <h1 className="HomePage__title">
              Discover, share, and track recipies without a worry
            </h1>
            <p className="HomePage__subtitle">
              Easily search, read, and save recipes without seeing any ads or
              having to scroll a ton before even seeing the ingredients.
            </p>
            <div className="HomePage__buttonsWrapper">
              <Button
                text="Sign in"
                variant="primary"
                ariaLabel="Sign in"
                type="internalLink"
                to="signin"
              />
              <Button
                text="Sign up"
                variant="outline"
                ariaLabel="Sign up"
                type="internalLink"
                to="signup"
                className="HomePage__button"
              />
            </div>
          </div>
          <div className="Homepage__bannerImgWrapper">
            <img src={PastaLarge} alt="Pasta" className="HomePage__bannerImg" />
          </div>
        </header>
      )}
      <main
        className={`HomePage__main ${!!user && "HomePage__main--noHeader"}`}
      >
        <h2 className="HomePage__sectionTitle">Featured Recipes</h2>
        <div className="HomePage__recipeGrid">
          {recipes.slice(-6).map((recipe, i) => (
            <RecipeCard
              title={recipe.title}
              chef={recipe.chef}
              tags={recipe.tags}
              key={`homePage-recipe=${recipe.name}-${recipe.chef}-${i}`}
              img={recipe.img}
              slug={recipe.slug}
            />
          ))}
        </div>

        <h2 className="HomePage__sectionTitle">Featured chefs</h2>
        <div className="HomePage__recipeGrid">
          {chefs
            .filter((chef) => chef.type !== "admin")
            .slice(-6)
            .map((chef, i) => (
              <ChefCard
                key={`homepage-chef-${chef.name}-${i}`}
                name={chef.name}
                username={chef.username}
                bio={chef.bio}
                followers={chef.followers}
                following={chef.following}
              />
            ))}
        </div>
      </main>
    </>
  );
};

export default HomePage;
