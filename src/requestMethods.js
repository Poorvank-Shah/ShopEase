import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/";
const BASE_URL = "http://localhost:5000/api/";

// const TOKEN = () => {
//   if (localStorage.getItem("persist:root") === null) { return null; }
//   if ((JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser) === null) { return null; }
//   else {
//     return JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken
//   }
// }

const TOKEN = localStorage.getItem("persist:root") === null ? null : 
JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser === null ?  null : JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// console.log("TOKEN = " + TOKEN + !false)
// console.log("TOKEN = " + TOKEN() + !false)

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});