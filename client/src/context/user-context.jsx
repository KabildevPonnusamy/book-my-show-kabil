import React, { createContext, useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import { fetchProfile, loginUser } from "../lib/api";
import { useNavigate } from "react-router";

const UserContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { data, isLoading, error, sendRequest } = useHttp(loginUser, false);
  const {
    data: profileData,
    isLoading: isProfileLoading,
    error: profileError,
    sendRequest: sendFetchProfile,
  } = useHttp(fetchProfile, false);



  // Case: 1 => When profile is loaded after login
  useEffect(() => {
    if (!isLoading && data) {
      localStorage.setItem("token", data.token);
      sendFetchProfile();
      navigate("/");
    }
  }, [data]);

  useEffect( () => {
    if(!isProfileLoading && profileData) {
      setUser(profileData);
    }
  }, [isProfileLoading, profileData]);

  //Case : 2 => When Profile needs to be fetched just after 1st render if valid token is present.
  
  // Above useEffect with [isProfileLoading, profileData] enoguh to get Data, but if Refresh the Gone.
  // But below will call without any dependency. So the Data Exist everytime.
  useEffect( () => {
    sendFetchProfile();
  },[]);

  const login = (userCreds) => {
    console.log("Context: ", userCreds);
    sendRequest(userCreds);
  };

  const logout = () => {
    localStorage.setItem("token", "");
    setUser(null);
    navigate("/signin");
  };

  const context = {
    user: user,
    isAuthenticated: user ? true : false,
    login: login,
    logout: logout,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
