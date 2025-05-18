import axios from "axios";

axios.defaults.baseURL = 'https://ecommerce.routemisr.com';

if (typeof window !== "undefined") {
  const token = localStorage.getItem("userToken");
  if (token) {
    axios.defaults.headers.common['token'] = token;
  }
}
