import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import "./ResetPasswordPage.css";

// This page would run async functions that run a reset password flow
// Ideally, the user would get an email with a code and use that code to then reset their password

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <main className="ResetPasswordPage">
      <Link to="/" className="ResetPasswordPage__logo">
        Recipes
      </Link>

      <div className="ResetPasswordPage__container">
        <h1 className="ResetPasswordPage__header">Reset your password</h1>
        <form className="ResetPasswordPage__form" onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            type="email"
            ariaLabel="Email"
            variant="yellow"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmail}
            className="ResetPasswordPage__input"
            id="SignIn-email"
          />
          <TextInput
            label="Password"
            type="password"
            ariaLabel="Password"
            variant="yellow"
            placeholder="Enter your password"
            value={password}
            onChange={handlePassword}
            className="ResetPasswordPage__input"
            id="SignIn-password"
          />
          <Button
            type="submit"
            text="Reset password"
            ariaLabel="Reset password"
            variant="primary"
            className="ResetPasswordPage__button"
          />
        </form>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
