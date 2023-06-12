import React from "react";
import "./IngredientSideBar.css";
import { useUi } from "../../contexts/UiContext";
import { useAuth } from "../../contexts/authContext";
import Button from "../Button";
import { ReactComponent as XSvg } from "../../svgs/x.svg";

// This component should call a function in the backend that can email the list of ingredients
// to the user's email

const IngredientSideBar = () => {
  const { sideBarOpen, closeSideBar } = useUi();
  const { ingredientList, removeFromIngredientList } = useAuth();

  return (
    <>
      <div
        className={`IngredientSideBar__background ${
          sideBarOpen && "IngredientSideBar__background--open"
        }`}
        onClick={closeSideBar}
      ></div>
      <div
        className={`IngredientSideBar ${
          sideBarOpen && "IngredientSideBar--open"
        }`}
      >
        <div className="IngredientSideBar__titleWrapper">
          <h6 className="IngredientSideBar__title">Ingredients List</h6>
          <Button
            type="button"
            text="Close"
            ariaLabel="Close"
            onClick={closeSideBar}
            variant="outline"
          />
        </div>
        <div className="IngredientSideBar__list">
          {ingredientList.map((ingredient, i) => {
            return (
              <div
                key={`ingred-sidebar-${ingredient}`}
                className="IngredientSideBar__listItem"
              >
                <span className="IngredientSideBar__listItemName">
                  {ingredient}
                </span>
                <Button
                  leftIcon={
                    <XSvg className="IngredientSideBar__listItemButton" />
                  }
                  type="button"
                  variant="noStyle"
                  onClick={() => {
                    removeFromIngredientList(ingredient);
                  }}
                />
              </div>
            );
          })}
        </div>
        <Button
          type="button"
          text="Email list to myself"
          ariaLabel="Email list to myself"
          variant="primary"
          className="IngredientSideBar__button"
        />
      </div>
    </>
  );
};

export default IngredientSideBar;
