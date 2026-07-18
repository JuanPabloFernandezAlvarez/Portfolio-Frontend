const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ??
  (isLocal ? "https://localhost:7226/api" : "https://gimapp-api-tup-fgfgd6f3e6c9hehj.brazilsouth-01.azurewebsites.net/api");

export const authFetch = (url, options = {}) => {
  const token = localStorage.getItem("Portfolio-2026-Token");
  const endpoint = url.startsWith("http")
    ? url
    : `${API_BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(endpoint, {
    ...options,
    headers,
  });
};
