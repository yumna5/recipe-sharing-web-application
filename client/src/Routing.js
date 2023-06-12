import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import FeedPage from "./pages/FeedPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import RecipePage from "./pages/RecipePage";
import NewRecipePage from "./pages/NewRecipePage";
import AdminFeedPage from "./pages/AdminFeedPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="signup" element={<SignUpPage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="resetpassword" element={<ResetPasswordPage />} />

      <Route path="recipe">
        <Route path=":recipeId" element={<RecipePage />} />
        <Route path="new" element={<NewRecipePage />} />
      </Route>

      <Route path="feed" element={<FeedPage />} />
      <Route path="search" element={<SearchPage />} />

      <Route path="adminfeed" element={<AdminFeedPage />} />

      <Route path="profile">
        <Route path=":profileUsername" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Routing;
