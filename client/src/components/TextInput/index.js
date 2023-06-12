import React from "react";
import "./TextInput.css";

const TextInput = ({
  type,
  id,
  variant,
  placeholder,
  onChange,
  value,
  ariaLabel,
  label,
  error,
  className,
  size,
  isTextArea,
}) => {
  const style = `
    TextInput__input ${variant === "yellow" && "TextInput__input--yellow"} ${
    variant === "green" && "TextInput__input--green"
  } ${size === "large" ? "TextInput__input--large" : ""} ${
    isTextArea ? "TextInput__input--isTextArea" : ""
  } ${className}
  `;

  return (
    <div className="TextInput">
      {!!label && (
        <label htmlFor={id} className="TextInput__label">
          {label}
        </label>
      )}
      {!isTextArea ? (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={style}
          aria-label={ariaLabel}
          value={value}
          onChange={onChange}
        />
      ) : (
        <textarea
          id={id}
          type={type}
          placeholder={placeholder}
          className={style}
          aria-label={ariaLabel}
          value={value}
          onChange={onChange}
        />
      )}
      {!!error && <span className="TextInput__error">{error}</span>}
    </div>
  );
};

export default TextInput;
