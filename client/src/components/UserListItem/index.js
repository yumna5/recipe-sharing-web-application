import React from "react";
import "./UserListItem.css";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

function UserListItem({ name, setCloseModal }) {
  const navigate = useNavigate();

  const goToUserProfile = () => {
    setCloseModal(false);
    navigate(`/profile/${name}`);
  };

  return (
    <div className="UserListItem">
      <div className="UserListItem__left">
        <div className="UserListItem__avatar"></div>
        <p className="UserListItem__name"> {name} </p>
      </div>
      <Button
        text="View Profile"
        type="button"
        variant="outline"
        onClick={goToUserProfile}
      />
    </div>
  );
}

export default UserListItem;
