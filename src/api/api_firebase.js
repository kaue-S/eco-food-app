import axios from "axios";

const api = axios.create({
  baseURL: "https://eco-food-app-default-rtdb.firebaseio.com",
});

export { api };
