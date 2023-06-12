import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import UserProfile from "../../components/UserProfile";
import RecipeCard from "../../components/RecipeCard";
import * as API from "../../lib/api";

const ProfilePage = () => {
  const { profileUsername } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [displayUser, setDisplayUser] = useState({});
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await API.getAllUsers();
      console.log(users);
      const foundUser = users.find((user) => user.username === profileUsername);
      if (foundUser) {
        setDisplayUser(foundUser);
        setIsLoading(false);
      } else {
        navigate("/");
      }
    };

    if (!user) navigate("/signin");
    else {
      if (user.username === profileUsername) {
        setDisplayUser(user);
        setIsOwnProfile(true);
        setIsLoading(false);
      } else {
        setIsOwnProfile(false);
        getAllUsers();
      }
    }
  }, [user, profileUsername, navigate]);

  return (
    <main className="ProfilePage">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <UserProfile
            user={displayUser}
            loggedInUser={user}
            ownProfile={isOwnProfile}
          />
          {isOwnProfile ? (
            <>
              <div className="ProfilePage__section">
                <h2 className="ProfilePage__sectionTitle">
                  My Recipes ({displayUser.recipes.length})
                </h2>
                <div className="ProfilePage__recipeGrid">
                  {displayUser.recipes.map((recipe, i) => (
                    <RecipeCard
                      title={recipe.title}
                      chef={recipe.chef}
                      tags={recipe.tags}
                      image={recipe.img}
                      key={`profilePage-created-${displayUser.username}-recipe=${recipe.name}-${recipe.chef}-${i}`}
                      slug={recipe.slug}
                      img={recipe.img}
                    />
                  ))}
                </div>
              </div>
              <div className="ProfilePage__section">
                <h2 className="ProfilePage__sectionTitle">
                  Saved Recipes ({displayUser.saved_recipes.length})
                </h2>
                <div className="ProfilePage__recipeGrid">
                  {displayUser.saved_recipes.map((recipe, i) => (
                    <RecipeCard
                      title={recipe.title}
                      chef={recipe.chef}
                      tags={recipe.tags}
                      key={`profilePage-saved-${displayUser.username}-recipe=${recipe.name}-${recipe.chef}`}
                      slug={recipe.slug}
                      img={recipe.img}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="ProfilePage__section">
              <h2 className="ProfilePage__sectionTitle">
                Shared Recipes ({displayUser.recipes.length})
              </h2>
              <div className="ProfilePage__recipeGrid">
                {displayUser.recipes.map((recipe, i) => (
                  <RecipeCard
                    title={recipe.title}
                    chef={recipe.chef}
                    tags={recipe.tags}
                    key={`profilePage-created-${displayUser.username}-recipe=${recipe.name}-${recipe.chef}-${i}`}
                    slug={recipe.slug}
                    img={recipe.img}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default ProfilePage;
