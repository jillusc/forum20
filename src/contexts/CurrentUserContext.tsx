import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { axiosRes } from "@/api/axiosDefaults";
import axios, { isAxiosError, type AxiosRequestConfig } from "axios";
import type { User } from "@/types";
import { CurrentUserContext } from "./CurrentUserContextObject";

export function CurrentUserProvider({ children }: { children: ReactNode }) {
  // create/define state to track the current logged-in user:
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [_error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // restore currentUser on page load:
    const loadCurrentUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const { data } = await axiosRes.get("/dj-rest-auth/user/", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCurrentUser(data); // restore currentUser state
          setLoading(false);
        } catch (err: unknown) {
          // TS type guard - safely confirms this is an Axios error:
          if (axios.isAxiosError(err)) {
            const data = err.response?.data; // safely access the backend’s response (if any)
            if (!data) {
              console.error("Network or connection error:", err);
              setError("Network error - please try again.");
              return;
            }
            console.error("Backend error:", data); // log the raw data for debugging
            setError(
              typeof data === "string"
                ? data
                : data.detail ??
                    "Couldn't load your activity. Please try again."
            );
          } else {
            console.error("Unexpected error:", err); // log all other errors
            setError("Something went wrong.");
          }
          setCurrentUser(null);
          navigate("/login"); // redirect if token invalid/unmount the provider
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // no token, just stop loading
      }
    };

    loadCurrentUser();

    // --- INTERCEPTOR/S ---
    // adds the latest access token to every request!
    const requestInterceptor = axiosRes.interceptors.request.use(
      (config) => {
        // skip Authorization header for login and register endpoints
        if (
          !config.url?.includes("/dj-rest-auth/login/") &&
          !config.url?.includes("/dj-rest-auth/registration/")
        ) {
          const token = localStorage.getItem("accessToken");
          if (token) {
            config.headers = config.headers || {};
            config.headers["Authorization"] = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // handles 401 errors by refreshing the token and retrying the request or logging the user out if the refresh fails!
    const responseInterceptor = axiosRes.interceptors.response.use(
      (response) => response, // <- successful responses are simply returned
      // begin error handling:
      async (error: unknown) => {
        // TS type guard - safely confirms this is an Axios error; access response/config:
        if (isAxiosError(error) && error.config) {
          // i) store the original req config so it can be retried later if needed:
          const originalRequest = error.config as AxiosRequestConfig & {
            _retry?: boolean;
          };

          // ii) check if the error is a 401 AND has NOT already been retried:
          if (error.response?.status === 401 && !originalRequest._retry) {
            // if both are true, mark the request as retried (to avoid infinite loops):
            originalRequest._retry = true;
            // then:
            // try refreshing the access token by calling the refresh endpoint:
            try {
              const refreshResponse = await axiosRes.post(
                "/dj-rest-auth/token/refresh/",
                {
                  // with the refresh token from localStorage:
                  refresh: localStorage.getItem("refreshToken"),
                }
              );
              // extract + store the new access token from the response:
              const newAccessToken = refreshResponse.data.access;
              // update the default Authorization header on the Axios instance with the new token:
              axiosRes.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
              // also update the Authorization header on the original request:
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
              // retry the original request with the new token:
              return axiosRes(originalRequest);
            } catch (refreshError) {
              console.error("Token refresh failed:", refreshError);
              // if refreshing fails: log out by clearing user state and redirecting:
              setCurrentUser(null);
              navigate("/login");
              // reject the original API error since the token refresh failed:
              return Promise.reject(error);
            }
          }
        }
        // otherwise: if the error is not a 401, or the request was already retried, just reject it:
        return Promise.reject(error);
      }
    );
    // optional cleanup: detach the interceptors if the component unmounts
    return () => {
      axiosRes.interceptors.request.eject(requestInterceptor);
      axiosRes.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  if (loading) return null;

  // provide currentUser and setter to all children components:
  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, CULoading: loading }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
