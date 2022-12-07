import axios from "axios";
const TOKEN = "ce7oubqad3i4pjr4onagce7oubqad3i4pjr4onb0";
export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
