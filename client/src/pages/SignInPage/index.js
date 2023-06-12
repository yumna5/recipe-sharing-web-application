import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import "./SignInPage.css";
import { useAuth } from "../../contexts/authContext";

// This page should run the async sign in call given through the auth context

const SignInPage = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [generalError, setGeneralError] = useState(null);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await signInUser(username, password);

    if (result) {
      navigate("/");
    } else {
      setGeneralError("Incorrect username and/or password, please try again!");
    }
  }

  return (
    <main className="SignInPage">
      <Link to="/" className="SignInPage__logo">
        Recipes
      </Link>

      <div className="SignInPage__container">
        <h1 className="SignInPage__header">Sign in to your account</h1>
        <form className="SignInPage__form" onSubmit={handleSubmit}>
          <TextInput
            label="Username"
            type="text"
            ariaLabel="Username"
            variant="yellow"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsername}
            className="SignInPage__input"
            id="SignIn-username"
          />
          <TextInput
            label="Password"
            type="password"
            ariaLabel="Password"
            variant="yellow"
            placeholder="Enter your password"
            value={password}
            onChange={handlePassword}
            className="SignInPage__input"
            id="SignIn-password"
          />
          {generalError && <p className="SignInPage__error">{generalError}</p>}
          <Button
            type="submit"
            text="Sign in"
            ariaLabel="Sign in"
            variant="primary"
            className="SignInPage__button"
          />
        </form>
        <p className="SignInPage__text">
          Don't have an account?{" "}
          <Link to="/signup" className="SignInPage__link">
            Sign up!
          </Link>
        </p>
        <Link to="/resetpassword" className="SignInPage__link">
          Forgot your password?
        </Link>
      </div>
    </main>
  );
};

export default SignInPage;
