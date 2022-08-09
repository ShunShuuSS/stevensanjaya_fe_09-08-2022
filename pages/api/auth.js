import axios from "axios";

const Login = async ({ username, password }) => {
  const userLoginData = {
    username: username,
    password: password,
  };

  const loginToken = await axios.post(`auth/login`, userLoginData);

  return loginToken;
};

const auth = {
  Login,
};

export default auth;
