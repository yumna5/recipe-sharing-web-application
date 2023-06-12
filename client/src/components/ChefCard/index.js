import React from "react";
import "./ChefCard.css";
import { Link } from "react-router-dom";

const ChefCard = ({ name, bio, followers, following, username }) => {
  return (
    <Link className="ChefCard" to={`/profile/${username}`}>
      <div className="ChefCard__content">
        <div className="ChefCard__avatar"></div>
        <p className="ChefCard__name">{name}</p>
        <p className="ChefCard__bio">{bio}</p>

        <div className="ChefCard__followData">
          <p className="ChefCard__followerData">
            <span className="ChefCard__followVal">{followers.length}</span>
            <span className="ChefCard__label">followers</span>
          </p>
          <p className="ChefCard__followingData">
            <span className="ChefCard__followVal">{following.length}</span>
            <span className="ChefCard__label">following</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ChefCard;
