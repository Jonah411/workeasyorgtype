import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { selectToken } from "../../Server/Reducer/authSlice";
import LoginIndex from "../login/LoginIndex";
import Layout from "../layout/Layout";
import { useSelector } from "react-redux";
import ProfileIndex from "../profile/ProfileIndex";

const RouterService = ({ showSidebar, toggleSidebar }) => {
  const token = useSelector(selectToken);
  return (
    <Router>
      <Routes>
        {!token ? (
          <Route path="/" element={<LoginIndex />} />
        ) : (
          <Route
            path="/"
            element={
              <Layout showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
            }
          >
            <Route path="app/profile" element={<ProfileIndex />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default RouterService;
