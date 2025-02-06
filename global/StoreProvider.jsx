import React, { useState, useMemo, useEffect } from "react";
import { storeContext } from "./store";
import {
  getAccessWithRefresh,
  getTheRefresh,
  getTheTokenFromStorage,
  storeTheUser,
} from "./../services/auth";
import jwt from "jwt-decode";
import { useRouter } from "next/router";

const StoreProvider = ({ children }) => {
  const token = getTheTokenFromStorage();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [store, setStore] = useState({
    isLogged: false,
    user: null,
    token: null,
  });

  // Handle first site enter and refresh page (Tokens)
  const refreshX = async (refresh) => {
    /* Get a new access token */
    const res = await getAccessWithRefresh({ refresh });
    if (res?.data?.access) {
      const user = jwt(res.data.access);
      storeTheUser(user, res.data.access, refresh);
      const exp = new Date(user.exp * 1000);
      const now = new Date();
      const isLogged = now < exp ? true : false;

      setStore({
        ...store,
        isLogged,
        token: res.data.access,
        user,
      });
    } else {
      setStore({
        ...store,
        isLogged: false,
      });
    }
  };

  // useEffect(() => {
  //   //Get ACCESS TOKEN
  //   const token = getTheTokenFromStorage();
  //   try {
  //     const user = jwt(token);
  //     const exp = new Date(user.exp * 1000);
  //     const now = new Date();
  //     const isLogged = now < exp ? true : false;
  //     setStore({ ...store, isLogged, token, user });
  //   } catch (error) {
  //     setStore({
  //       isLogged: false,
  //       user: null,
  //       token: null,
  //     });
  //   }
  // }, [store.isLogged]);
  useEffect(() => {
    setLoading(true);

    //Get ACCESS TOKEN
    const token = getTheTokenFromStorage();
    let isLogged = false;
    if (token) {
      const user = jwt(token);
      const exp = new Date(user.exp * 1000);
      const now = new Date();
      isLogged = now < exp ? true : false;
      // If ACC TOKEN IS VALID STAY CONNECTED
      if (isLogged) {
        setStore({
          ...store,
          isLogged,
          token,
          user,
        });
      }
    }

    //If ACCESS TOKEN EXPIRED
    if (!isLogged || !token) {
      const refresh = getTheRefresh();
      if (refresh) {
        // Check if refresh still valid
        const refreshUser = jwt(refresh);
        const expRefresh = new Date(refreshUser.exp * 1000);
        const nowRefresh = new Date();
        const isRefreshValid = nowRefresh < expRefresh ? true : false;
        //If refresh valid
        if (isRefreshValid) {
          refreshX(refresh);
        } else {
          //If endpoint did not return anything
          setStore({
            ...store,
            isLogged: false,
          });
        }
      } else {
        //If refresh does not exist Logout the user
        setStore({
          ...store,
          isLogged: false,
        });
      }
    }

    setLoading(false);
  }, [store.isLogged]);

  //Handle Page change Token verification

  useEffect(() => {
    const routeChangeStart = async () => {
      router.events.on("routeChangeStart", async () => {
        const token = getTheTokenFromStorage();
        let isLogged = false;
        if (token) {
          const user = jwt(token);
          const exp = new Date(user.exp * 1000);
          const now = new Date();
          isLogged = now < exp ? true : false;
        }
        if (!isLogged) {
          const refresh = getTheRefresh();
          if (refresh) {
            // Check if refresh still valid
            const refreshUser = jwt(refresh);
            const expRefresh = new Date(refreshUser.exp * 1000);
            const nowRefresh = new Date();
            const isRefreshValid = nowRefresh < expRefresh ? true : false;
            if (isRefreshValid) {
              const refresh = getTheRefresh();
              const res = await getAccessWithRefresh({ refresh });
              if (res?.data?.access) {
                const user = jwt(res.data.access);
                storeTheUser(user, res.data.access, refresh);
                const exp = new Date(user.exp * 1000);
                const now = new Date();
                const isLogged = now < exp ? true : false;
                setStore({
                  ...store,
                  isLogged,
                  token,
                  user,
                });
              } else {
                //If endpoint did not return anything
                setStore({
                  ...store,
                  isLogged: false,
                });
              }
            } else {
              //if refresh Token expired (logout)
              setStore({
                ...store,
                isLogged: false,
              });
            }
          }
        }
      });
    };
    routeChangeStart();
  }, []);

  const storeValue = useMemo(() => ({ store, setStore }), [store, setStore]);

  return (
    <storeContext.Provider value={storeValue}>{children}</storeContext.Provider>
  );
};

export default StoreProvider;
