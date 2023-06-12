import React, { useState } from "react";
import "./FollowInfoModal.css";
import Button from "../Button";
import UserListItem from "../UserListItem";

const FollowInfoModal = ({ open, setCloseModal, user }) => {
  const [isFollower, setIsFollower] = useState(true);

  if (!open) return null;

  const changeToIsFollower = () => {
    setIsFollower(true);
  };

  const changeToIsFollowing = () => {
    setIsFollower(false);
  };

  return (
    <div className="FollowInfoModal__background">
      <div className="FollowInfoModal__box">
        <div className="FollowInfoModal__header">
          <h2>View your followers and following</h2>
          <div className="FollowInfoModal__buttonWrapper">
            <Button
              text="Followers"
              variant="noStyle"
              type="button"
              onClick={changeToIsFollower}
              className={isFollower ? "FollowerModalButtonActive" : ""}
            />
            <Button
              text="Following"
              variant="noStyle"
              type="button"
              onClick={changeToIsFollowing}
              className={!isFollower ? "FollowerModalButtonActive" : ""}
            />
          </div>
        </div>
        <div className="FollowInfoModal__list">
          {isFollower ? (
            <>
              {user.followers.map((follower) => (
                <UserListItem
                  key={follower._id}
                  name={follower.username}
                  setCloseModal={setCloseModal}
                />
              ))}
            </>
          ) : (
            <>
              {user.following.map((follower) => (
                <UserListItem
                  key={follower._id}
                  name={follower.username}
                  setCloseModal={setCloseModal}
                />
              ))}
            </>
          )}
        </div>
        <Button
          text="Done"
          type="button"
          variant="outline"
          onClick={() => setCloseModal(false)}
        />
      </div>
    </div>
  );
};

export default FollowInfoModal;
