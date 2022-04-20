import Axios from 'axios';
import { ApiUrl } from "../constants";

export const Login = (payload) => {
 try {
  return Axios.post(ApiUrl + "/user/login/", payload)
   .then((response) => {
    if (response.status < 205) {
     localStorage.setItem("token", response.data.data.token)
     localStorage.setItem("user", response.data.data)
     return { status: true, message: response.data }
    }
    throw ("Somethings went wronge")
   })
 } catch (error) {
  console.log("ERR: SERVICE: LOGIN ERR: ", error.message)
  return { status: false, message: error.message }
 }
}