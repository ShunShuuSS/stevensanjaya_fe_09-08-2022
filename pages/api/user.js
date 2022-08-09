import axios from "axios";

const getAllUsers = async () => {
  const usersData = await axios.get(`users`);

  return usersData;
};

const getUser = async ({ id }) => {
  const userData = await axios.get(`users/${id}`);

  return userData;
};

const deleteUser = async ({ id }) => {
  const deleteUser = await axios.delete(`users/${id}`);
  console.log(deleteUser);

  return deleteUser;
};

const updateUser = async ({ id }) => {
  const updateUser = await axios.put(`users/${id}`);

  return updateUser;
};

const usersApi = { getAllUsers, getUser, deleteUser, updateUser };

export default usersApi;
