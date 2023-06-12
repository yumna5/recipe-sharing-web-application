import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import "./SignUpPage.css";
import { useAuth } from "../../contexts/authContext";

// This page should run the async sign up call given through the auth context

const SignUpPage = () => {
  const { signUpUser } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    const result = await signUpUser(username, email, name, password);
    if (result) {
      navigate("/signin");
    }
  };

  return (
    <main className="SignUpPage">
      <Link to="/" className="SignUpPage__logo">
        Recipes
      </Link>

      <div className="SignUpPage__container">
        <h1 className="SignUpPage__header">Sign up for an account</h1>
        <form className="SignUpPage__form" onSubmit={handleSubmit}>
          <TextInput
            label="Username"
            type="username"
            ariaLabel="Username"
            variant="yellow"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsername}
            className="SignUpPage__input"
            id="SignUp-username"
          />
          <TextInput
            label="Email"
            type="email"
            ariaLabel="Email"
            variant="yellow"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmail}
            className="SignUpPage__input"
            id="SignUp-email"
          />
          <TextInput
            label="Name"
            type="name"
            ariaLabel="Name"
            variant="yellow"
            placeholder="Enter your name"
            value={name}
            onChange={handleName}
            className="SignUpPage__input"
            id="SignUp-name"
          />
          <TextInput
            label="Password"
            type="password"
            ariaLabel="Password"
            variant="yellow"
            placeholder="Enter your password"
            value={password}
            onChange={handlePassword}
            className="SignUpPage__input"
            id="SignUp-password"
          />
          <TextInput
            label="Confirm password"
            type="password"
            ariaLabel="Confirm password"
            variant="yellow"
            placeholder="Reenter your password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            className="SignUpPage__input"
            id="SignUp-confirmPassword"
          />
          <Button
            type="submit"
            text="Sign up"
            ariaLabel="Sign up"
            variant="primary"
            className="SignUpPage__button"
          />
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/signin" className="SignUpPage__link">
            Sign in!
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUpPage;
