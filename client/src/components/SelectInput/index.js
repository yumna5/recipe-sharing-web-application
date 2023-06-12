import React from "react";
import "./SelectInput.css";
import { ReactComponent as DownSvg } from "../../svgs/down.svg";

const SelectInput = ({
  id,
  variant,
  onChange,
  value,
  ariaLabel,
  label,
  error,
  className,
  options,
}) => {
  const style = `
    SelectInput__select ${
      variant === "yellow" && "SelectInput__select--yellow"
    } ${variant === "green" && "SelectInput__select--green"} ${className}
  `;

  return (
    <div className="SelectInput">
      {!!label && (
        <label htmlFor={id} className="SelectInput__label">
          {label}
        </label>
      )}
      <div className="SelectInput__selectWrapper">
        <DownSvg className="SelectInput__downIcon" />
        <select
          id={id}
          className={style}
          aria-label={ariaLabel}
          value={value}
          onChange={onChange}
        >
          {options &&
            options.map((option) => {
              return (
                <option value={option} key={`${id}-${option}`}>
                  {option}
                </option>
              );
            })}
        </select>
      </div>
      {!!error && <span className="SelectInput__error">{error}</span>}
    </div>
  );
};

export default SelectInput;
