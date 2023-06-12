import React from "react";
import "./RecipeCard.css";
import GreyImg from "../../images/grey.jpg";
import Tag from "../Tag";
import { Link } from "react-router-dom";

const RecipeCard = ({ title, chef, tags, img, slug }) => {
  return (
    <Link className="RecipeCard" to={`/recipe/${slug}`}>
      <div className="RecipeCard__imgWrapper">
        <img
          className="RecipeCard__img"
          alt="pasta"
          src={!!img ? img : GreyImg}
        />
      </div>
      <div className="RecipeCard__content">
        <div>
          <p className="RecipeCard__title">{title}</p>
          <p className="RecipeCard__chef">by: {chef}</p>
        </div>

        <div className="RecipeCard__tagsWrapper">
          {tags.map((tag) => (
            <Tag tag={tag} key={`recipeCard-${title}-${chef}-${tag}`} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
