/* eslint-disable react-hooks/exhaustive-deps */
import UserContext from "./user.context";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  getCookie,
  setCookie,
  removeCookies,
  checkCookies,
} from "cookies-next";

import config from "../../constants/config";

import { useRouter } from "next/router";
import auth from "../../../pages/api/auth";

const UserContextProvider = (props) => {
  const [userToken, setUserToken] = useState("");
  const [completeLoad, setCompleteLoad] = useState(false);
  const [lastPage, setLastPage] = useState("/");

  const router = useRouter();

  useEffect(() => {}, []);

  useEffect(() => {
    const user_cookies = getCookie("user_token", {
      ...config.cookies_domain,
    })?.toString();
    if (user_cookies && user_cookies !== "") {
      _setNewCookies(user_cookies);
      setCompleteLoad(true);
    } else {
      setCompleteLoad(true);
    }
  }, []);

  const _setNewCookies = (token) => {
    setCompleteLoad(false);
    setCookie("user_token", token, {
      ...config.cookies_domain,
      maxAge: 30 * 24 * 60 * 60,
    });
    setUserToken(token);
    setCompleteLoad(true);
  };

  // Login Session

  const _setToken = (token) => {
    if (token) {
      setCompleteLoad(false);
      _setNewCookies(token);
    } else {
      _removeCookies();
    }
  };

  const _removeCookies = () => {
    setCompleteLoad(false);
    removeCookies("user_token", {
      ...config.cookies_domain,
    });
    setCompleteLoad(true);
    router.reload(window.location.pathname);
  };

  return (
    <UserContext.Provider
      value={{
        UserToken: userToken,
        SetToken: _setToken,
        RemoveToken: _removeCookies,
        CompleteLoad: completeLoad,
        LastPage: lastPage,
        SetLastPage: setLastPage,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
