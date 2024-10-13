import { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import api from "./api";
import { ACCESS_TOKEN, REFRESH_TOKEN, GOOGLE_ACCESS_TOKEN } from "./token";

const getLocalStorageItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Error accessing localStorage for ${key}`, error);
    return null;
  }
};

export const useAuthentication = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  const fetchCsrfToken = useCallback(async () => {
    try {
      const res = await api.get("/api/get-csrf-token/");
      setCsrfToken(res.data.csrfToken);
    } catch (error) {
      console.error("Error fetching CSRF token", error);
    }
  }, []);

  const validateGoogleToken = useCallback(
    async (googleAccessToken) => {
      try {
        const res = await api.post(
          "/api/google/validate_token/",
          { access_token: googleAccessToken },
          {
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken,
            },
          }
        );
        return res.data.valid;
      } catch (error) {
        console.error("Error validating Google token", error);
        return false;
      }
    },
    [csrfToken]
  );

  const refreshToken = useCallback(async () => {
    const refreshToken = getLocalStorageItem(REFRESH_TOKEN);
    if (!refreshToken) return setIsAuthorized(false);

    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      setIsAuthorized(true);
    } catch (error) {
      console.error("Error refreshing token", error);
      setIsAuthorized(false);
    }
  }, []);

  const auth = useCallback(async () => {
    const token = getLocalStorageItem(ACCESS_TOKEN);
    const googleAccessToken = getLocalStorageItem(GOOGLE_ACCESS_TOKEN);

    if (token) {
      const decoded = jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;

      if (tokenExpiration < now) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    } else if (googleAccessToken) {
      const isValid = await validateGoogleToken(googleAccessToken);
      setIsAuthorized(isValid);
    } else {
      setIsAuthorized(false);
    }
  }, [refreshToken, validateGoogleToken]);

  useEffect(() => {
    (async () => {
      await fetchCsrfToken();
      await auth().catch(() => setIsAuthorized(false));
    })();
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(GOOGLE_ACCESS_TOKEN);
    setIsAuthorized(false);
  }, []);

  return { isAuthorized, logout };
};
