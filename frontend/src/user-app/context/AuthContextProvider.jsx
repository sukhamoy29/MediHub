import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Auth state persistence effect
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
          setUser(null);
          setIsLoggedIn(false);
          setLoading(false);
          return;
        }

        // Verify token validity with backend
        const response = await axios.get("http://localhost:8000/auth/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (storedUser && response.data && response.data.id) {
          const parsedUser = JSON.parse(storedUser);
          const userData = {
            ...parsedUser,
            ...response.data,
            access_token: accessToken,
          };
          setUser(userData);
          setIsLoggedIn(true);
          localStorage.setItem("user", JSON.stringify(userData));
        } else if (response.data && response.data.id) {
          const userData = {
            ...response.data,
            access_token: accessToken,
            redirectUrl:
              response.data.role.toLowerCase() === "patient"
                ? "/dashboard"
                : "/admin/dashboard",
          };
          setUser(userData);
          setIsLoggedIn(true);
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          throw new Error("Invalid user data received");
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (userData, accessToken) => {
    if (!userData.id) {
      console.error("Missing user ID in login data");
      return;
    }

    // Add role-specific redirect URLs
    const roleRedirects = {
      patient: "/dashboard",
      clinic: "/admin/dashboard",
      doctor: "/admin/dashboard",
    };

    try {
      // Verify user data with backend
      const response = await axios.get("http://localhost:8000/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data && response.data.id) {
        const enhancedUserData = {
          ...response.data,
          access_token: accessToken,
          redirectUrl: roleRedirects[response.data.role.toLowerCase()],
        };

        // Update local storage
        localStorage.setItem("user", JSON.stringify(enhancedUserData));
        localStorage.setItem("access_token", accessToken);

        // Update state
        setUser(enhancedUserData);
        setIsLoggedIn(true);
      } else {
        throw new Error("Invalid user data received from server");
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error; // Propagate error to login handler
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
