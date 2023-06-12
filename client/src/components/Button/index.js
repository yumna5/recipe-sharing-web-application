import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

const Button = ({
  text,
  leftIcon,
  rightIcon,
  ariaLabel,
  type,
  variant,
  to,
  onClick,
  className,
}) => {
  const buttonContent = (
    <>
      {!!leftIcon && leftIcon}
      {!!text && (
        <span
          className={`${!!leftIcon && "Button__content--leftIcon"} ${
            !!rightIcon && "Button__content--rightIcon"
          }`}
        >
          {text}
        </span>
      )}
      {!!rightIcon && rightIcon}
    </>
  );

  const buttonStyle =
    variant === "primary"
      ? "Button--primary"
      : variant === "outline"
      ? "Button--outline"
      : variant === "danger"
      ? "Button--danger"
      : "Button--noStyle";

  if (type === "externalLink") {
    return (
      <a
        href="to"
        target="_blank"
        className={`Button ${buttonStyle} ${className}`}
        aria-label={ariaLabel}
        rel="noreferrer"
      >
        {buttonContent}
      </a>
    );
  } else if (type === "internalLink") {
    return (
      <Link
        to={to}
        className={`Button ${buttonStyle} ${className}`}
        aria-label={ariaLabel}
      >
        {buttonContent}
      </Link>
    );
  } else {
    return (
      <button
        aria-label={ariaLabel}
        className={`Button ${buttonStyle} ${className}`}
        onClick={onClick}
        type={type}
      >
        {buttonContent}
      </button>
    );
  }
};

export default Button;
