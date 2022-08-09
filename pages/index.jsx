/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../src/context/userContext/user.context";
import styles from "../styles/Home.module.scss";
import { useRouter } from "next/router";
import usersApi from "./api/user";
import Link from "next/link";

const Home = () => {
  const [usersData, setUsersData] = useState([]);
  const userContext = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (userContext.CompleteLoad == true) {
      if (userContext.UserToken === "") {
        router.push(`/login`);
      } else {
        getAllUsersData();
      }
    }
  }, [userContext.CompleteLoad]);

  const getAllUsersData = async () => {
    try {
      const allUsersData = await usersApi.getAllUsers();

      if (allUsersData.data.length) {
        setUsersData(allUsersData.data);
      }
    } catch (error) {}
  };

  const onClickDelete = async ({ id }) => {
    await usersApi.deleteUser({ id: id });
    getAllUsersData();
  };

  return (
    <>
      <div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ID
                </th>
                <th scope="col" className="py-3 px-6">
                  Username
                </th>
                <th scope="col" className="py-3 px-6">
                  Nama Depan
                </th>
                <th scope="col" className="py-3 px-6">
                  Nama Belakang
                </th>
                <th scope="col" className="py-3 px-6">
                  Alamat Kota
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user) => (
                <React.Fragment key={user.id}>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.id}
                    </th>
                    <td className="py-4 px-6">{user.username}</td>
                    <td className="py-4 px-6">{user.name.firstname}</td>
                    <td className="py-4 px-6">{user.name.lastname}</td>
                    <td className="py-4 px-6">{user.address.city}</td>
                    <td className="py-4 px-6">{user.email}</td>
                    <td className="py-4 px-6">
                      <div>
                        <Link href={`/edit/${user.id}`}>
                          <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                            Edit
                          </a>
                        </Link>
                      </div>

                      <div>
                        <a
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                          onClick={() => onClickDelete({ id: user.id })}
                        >
                          Hapus
                        </a>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
