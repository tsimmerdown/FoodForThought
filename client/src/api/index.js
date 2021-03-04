import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const signIn = (formData) => API.post("/auth/signin", formData);
export const signUp = (formData) => API.post("/auth/signup", formData);

export const getAllRecipes = (searchData) =>
  API.get(`/recipes/${searchData.query}`);
