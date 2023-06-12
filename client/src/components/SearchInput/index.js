import React, { useState } from "react";
import { ReactComponent as SearchSvg } from "../../svgs/search.svg";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../contexts/searchContext";
import "./SearchInput.css";

const SearchInput = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const { changeSearchValue } = useSearch();

  const searchInputHandler = (e) => {
    setValue(e.target.value);
  };

  const searchInputSubmit = (e) => {
    e.preventDefault();

    if (value !== "") {
      changeSearchValue(value);
      navigate("/search");
    }
  };

  return (
    <form className="SearchInput" onSubmit={searchInputSubmit}>
      <input
        type="text"
        className="SearchInput__input"
        placeholder="Search recipes"
        aria-label="Search recipes"
        onChange={searchInputHandler}
        value={value}
      />
      <Button
        type="submit"
        leftIcon={<SearchSvg className="SearchInput__icon" />}
        variant="noStyle"
        ariaLabel="Search"
      />
    </form>
  );
};

export default SearchInput;
