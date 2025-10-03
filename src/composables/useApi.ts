import axios from "axios";

export default function () {
  const api_url = "https://api.develop.shangomyworld.com";
  const api = axios.create({
    baseURL: api_url,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return api;
}
