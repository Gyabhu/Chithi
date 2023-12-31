import { useState } from "react";
import { useAuthServiceContext } from "../context/AuthContext";
import axios from "axios";
import useAxiosWithInterceptor from "../helpers/jwtinterceptor";

const TestLogin = () => {
  const { isLoggedIn, logout } = useAuthServiceContext();

  const [username, setUsername] = useState("");

  const jwtAxios = useAxiosWithInterceptor();

  const getUserDetails = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("access_token");
      const response = await jwtAxios.get(
        `http://127.0.0.1:8000/api/account/?user_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const userDetails = response.data;
      setUsername(userDetails.username);
    } catch (err: any) {
      return err;
    }
  };
  return (
    <>
      <div>{isLoggedIn.toString()}</div>
      <div>
        <button onClick={logout}>Logout</button>
        <button onClick={getUserDetails}>Get user details</button>
      </div>
      <div>username: {username}</div>
    </>
  );
};

export default TestLogin;
