import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import SearchInput from "../SearchInput";
import "./Navbar.css";
import { useAuth } from "../../contexts/authContext";
import { useUi } from "../../contexts/UiContext";
import { ReactComponent as CartSvg } from "../../svgs/cart.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useAuth();
  const { openSideBar } = useUi();

  const signOut = () => {
    navigate("/");
    signOutUser();
  };

  return (
    <nav className="Navbar">
      <div className="Navbar__wrapper">
        <div className="Navbar__logoSearchWrapper">
          <Link to="/" className="Navbar__logo">
            Recipes
          </Link>
          <SearchInput />
        </div>
        {!user && (
          <div className="Navbar__rightWrapper">
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
              className="Navbar__rightElement"
            />
          </div>
        )}

        {user && user.type === "regular" && (
          <div className="Navbar__rightWrapper">
            <Button
              text="Create recipe"
              variant="primary"
              ariaLabel="Create recipe"
              type="internalLink"
              to="recipe/new"
            />
            <Button
              text="View feed"
              variant="outline"
              ariaLabel="View feed"
              type="internalLink"
              to="feed"
              className="Navbar__rightElement"
            />
            <Button
              leftIcon={<CartSvg className="Navbar__cart" />}
              ariaLabel="View ingredients cart"
              type="button"
              onClick={openSideBar}
              className="Navbar__cartButton"
            />
            <Link
              to={`/profile/${user.username}`}
              className={`Navbar__profileLink ${
                user.username === "user"
                  ? "Navbar__profileLink--blue"
                  : "Navbar__profileLink--green"
              }`}
            />
          </div>
        )}

        {user && user.type === "admin" && (
          <div className="Navbar__rightWrapper">
            <p>Logged in as admin</p>
            <Button
              text="Sign out"
              variant="outline"
              ariaLabel="Sign out"
              type="button"
              onClick={signOut}
              className="Navbar__rightElement"
            />
            <Link
              to="/profile"
              className="Navbar__profileLink Navbar__profileLink--orange"
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
