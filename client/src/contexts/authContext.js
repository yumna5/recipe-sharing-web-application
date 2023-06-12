import React, { createContext, useState, useContext, useEffect } from "react";
import ENV from "./../config.js";

const API_HOST = ENV.api_host;

let mockUsers = [
  {
    username: "user",
    password: "user",
    type: "regular",
    name: "User Name",
    verified: true,
    cuisine: "Italian",
    followers: ["user2"],
    following: ["user2"],
    bio: "Short bio written by the user to describe themselves and their favorite cuisine plus reason for cooking",
    createdRecipes: [
      {
        name: "Homemade Pasta",
        chef: "User Name",
        tags: ["Italian", "~ 1 hour", "Vegetarian", "Onion"],
      },
      {
        name: "Homemade Pasta",
        chef: "User Name",
        tags: ["Italian", "~ 1 hour", "Vegetarian", "Onion"],
      },
    ],
    savedRecipes: [
      {
        name: "Chicken Pasta",
        chef: "Eman Elsabban",
        tags: ["Italian", "~ 2 hour", "Chicken"],
      },
      {
        name: "Low carb Pasta",
        chef: "Yumna Akhtar",
        tags: ["Italian", "~ 1 hour", "Low carbs"],
      },
    ],
  },
  {
    username: "user2",
    password: "user2",
    type: "regular",
    name: "User Name 2",
    verified: false,
    cuisine: "Mexican",
    followers: ["user"],
    following: ["user"],
    bio: "Short bio written by the user to describe themselves and their favorite cuisine plus reason for cooking",
    createdRecipes: [
      {
        name: "Homemade Pasta",
        chef: "User Name 2",
        tags: ["Italian", "~ 1 hour", "Vegetarian", "Onion"],
      },
      {
        name: "Homemade Pasta",
        chef: "User Name 2",
        tags: ["Italian", "~ 1 hour", "Vegetarian", "Onion"],
      },
    ],
    savedRecipes: [
      {
        name: "Chicken Pasta",
        chef: "Eman Elsabban",
        tags: ["Italian", "~ 2 hour", "Chicken"],
      },
      {
        name: "Low carb Pasta",
        chef: "Yumna Akhtar",
        tags: ["Italian", "~ 1 hour", "Low carbs"],
      },
    ],
  },
  {
    username: "admin",
    password: "admin",
    type: "admin",
    name: "Admin Name",
  },
];

const AuthContext = createContext(null);

// This context should have async functions for the following"
// sign in user
// sign up user
// edit user
// sign out user
// reset password

// The recipelist state should also be sent to the backend via the edit user function

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // sign up
  const signUpUser = async (username, email, name, password) => {
    const request = new Request(`${API_HOST}/api/users/register`, {
      method: "post",
      body: JSON.stringify({
        username: username,
        email: email,
        name: name,
        password: password,
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const res = await fetch(request);
    if (res.status === 200) {
      const json = await res.json();
      console.log(json);
      return true;
    } else {
      return false;
    }
  };

  // Sign in
  const signInUser = async (username, password) => {
    const response = await fetch(`${API_HOST}/api/users/login`, {
      method: "post",
      body: JSON.stringify({
        email: username,
        password: password,
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.user) {
      setUser(data.user);
      return true;
    } else {
      return false;
    }
  };

  // check if user session exists and if so setUser state to user in sesstion
  const checkSession = async () => {
    const response = await fetch(`${API_HOST}/api/users/check-session`, {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.user) {
      console.log(data.user);
      setUser(data.user);
      return true;
    } else {
      return false;
    }
  };

  // sign out user and set user state to null
  const signOutUser = async () => {
    const response = await fetch(`${API_HOST}/api/users/logout`, {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.status === "ok") {
      setUser(null);
      return true;
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const [ingredientList, setIngredientList] = useState([]);

  const addToIngredientList = (ingredients) => {
    setIngredientList((prev) => {
      let newList = [...prev];
      ingredients.forEach((ingredient) => {
        if (!newList.includes(ingredient)) newList.push(ingredient);
      });

      return newList;
    });
  };

  const removeFromIngredientList = (ingredient) => {
    setIngredientList((prev) => {
      const newList = prev.filter((item) => item !== ingredient);
      return newList;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        mockUsers,
        user,
        signInUser,
        signOutUser,
        checkSession,
        signUpUser,
        ingredientList,
        addToIngredientList,
        removeFromIngredientList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * A React hook to expose context values to components.
 */
export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth === null)
    throw new Error(
      "useAuth must be used within the context of the SearchContext.Provider"
    );
  return auth;
};
