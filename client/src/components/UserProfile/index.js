import React, { useState } from "react";
import "./UserProfile.css";
import { useAuth } from "../../contexts/authContext";
import { useNavigate, Link } from "react-router-dom";
import Button from "../Button";
import FollowInfoModal from "../FollowInfoModal";
import { ReactComponent as VerifiedCheck } from "../../svgs/verified.svg";
import ENV from "../../config.js";
import * as API from "../../lib/api";

const API_HOST = ENV.api_host;

// This component should have async functions that handle editing user information in ther backend
// This would include editing your own user info if logged in or the admin editing the verification state of a user

const UserProfile = ({ user, loggedInUser, ownProfile }) => {
  let { signOutUser, mockUsers, checkSession } = useAuth();
  const navigate = useNavigate();
  const { name, username, followers, following, cuisine, bio, verified, _id } =
    user;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const signOut = () => {
    navigate("/");
    signOutUser();
  };

  const [isVerified, setIsVerified] = useState(verified ? verified : false);

  const toggleVerify = async() => {
    console.log("1: ", verified)
    
    const verifyState = !verified
    console.log("2: ",verifyState )
    const result = await API.changeVerify(user._id, verifyState);
    if (result) {
      setIsVerified((prev) => !prev);
    }
    
  };

  const editInfo = () => {
    navigate("/profile/udit17");
  };

  const followUser = async () => {
    const result = await API.followUser(_id);
    if (result) {
      checkSession();
    }
  };

  const unfollowUser = async () => {
    const result = await API.unfollowUser(_id);
    if (result) {
      checkSession();
    }
  };

  const deleteUser = async () => {
    const result = await API.deleteUser(user._id);
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="UserProfile">
      {isModalOpen && (
        <FollowInfoModal
          open={isModalOpen}
          setCloseModal={setIsModalOpen}
          user={user}
        />
      )}
      <div className="UserProfile__data">
        <div className="UserProfile__avatar"></div>
        <div className="UserProfile__info">
          <div className="UserProfile__nameWrapper">
            <h1 className="UserProfile__name">{name}</h1>
            {!!isVerified && (
              <VerifiedCheck className="UserProfile__verified" />
            )}
          </div>
          <p className="UserProfile__username">@{username}</p>
          <div className="UserProfile__followData">
            <p
              className="UserProfile__followerData"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <span className>{followers.length}</span>
              <span className="UserProfile__label">followers</span>
            </p>
            <p
              className="UserProfile__followingData"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <span className>{following.length}</span>
              <span className="UserProfile__label">following</span>
            </p>
          </div>
          <p className="UserProfile__cuisine">Favorite cuisine: {cuisine}</p>
          <p className="UserProfile__bio">{bio}</p>
        </div>
      </div>
      {ownProfile ? (
        <div className="UserProfile__buttons">
          <Button
            text="Edit info"
            onClick={editInfo}
            ariaLabel="Edit info"
            variant="primary"
            type="button"
          />
          <Button
            text="Sign out"
            onClick={signOut}
            ariaLabel="Sign out"
            variant="outline"
            type="button"
          />
          <Button
            text="Reset password"
            ariaLabel="Reset password"
            type="internalLink"
            to="resetpassword"
            variant="outline"
          />
        </div>
      ) : loggedInUser.type !== "admin" ? (
        <div className="UserProfile__buttons">
          {loggedInUser.following.find((person) => {
            return person.username === username;
          }) ? (
            <Button
              text="Unfollow"
              onClick={unfollowUser}
              ariaLabel="Unfollow"
              variant="danger"
              type="button"
            />
          ) : (
            <Button
              text="Follow"
              onClick={followUser}
              ariaLabel="Follow"
              variant="primary"
              type="button"
            />
          )}
        </div>
      ) : (
        <div className="UserProfile__buttons">
          <Button
            text={isVerified ? "Unverify user" : "Verify user"}
            ariaLabel={isVerified ? "Unverify user" : "Verify user"}
            variant={isVerified ? "danger" : "primary"}
            type="button"
            onClick={toggleVerify}
          />
          <Button
            text="Delete user"
            onClick={deleteUser}
            ariaLabel="Delete user"
            variant="danger"
            type="button"
          />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
