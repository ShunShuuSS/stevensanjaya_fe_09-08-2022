/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import UserContext from "../../src/context/userContext/user.context";
import auth from "../api/auth";
import { useRouter } from "next/router";

const Login = () => {
  const [userUsername, setUserUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [showPassword, setShowPassword] = useState("");

  const [userUserNameIsNull, setUserUserNameIsNull] = useState(false);
  const [userPasswordIsNull, setUserPasswordIsNull] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const userContext = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (userContext.UserToken !== "") {
      router.push("/");
    }
  }, [userContext.UserToken]);

  const userLogin = async () => {
    try {
      const loginToken = await auth.Login({
        username: userUsername,
        password: userPassword,
      });

      if (loginToken.data.token !== "") {
        await userContext.SetToken(loginToken.data.token);
        router.push("/");
      }
    } catch (error) {
      setLoginFailed(true);
    }
  };

  const form = async (e) => {
    e.preventDefault();
    if (await handleValidationLogin()) {
      await userLogin();
    }
  };

  const handleValidationLogin = () => {
    var formIsValid = true;

    if (userUsername === "") {
      setLoginFailed(false);
      setUserUserNameIsNull(true);
      formIsValid = false;
    } else {
      setUserUserNameIsNull(false);
    }

    if (userPassword === "") {
      setLoginFailed(false);
      setUserPasswordIsNull(true);
      formIsValid = false;
    } else {
      setUserPasswordIsNull(false);
    }

    return formIsValid;
  };

  const _showPassword = (e) => {
    if (e.target.checked == true) {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };
  return (
    <>
      <form onSubmit={form}>
        <section className="flex justify-center items-center">
          <div className="max-w-md w-full bg-gray-900 rounded p-6 space-y-4">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white text-center">
                Login
              </h2>
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="text"
                placeholder="UserName"
                onChange={(e) => setUserUsername(e.target.value)}
              />
              {userUserNameIsNull ? (
                <>
                  <div className={`text-red-600`}>
                    Username tidak boleh kosong.
                  </div>
                </>
              ) : null}
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type={showPassword}
                placeholder="Password"
                onChange={(e) => setUserPassword(e.target.value)}
              />
              {userPasswordIsNull ? (
                <>
                  <div className={`text-red-600`}>
                    Username tidak boleh kosong.
                  </div>
                </>
              ) : null}
              <div className={`flex`}>
                <input
                  type="checkbox"
                  className={``}
                  onChange={_showPassword}
                />
                <p className={`text-white`}>tampilkan password</p>
              </div>
            </div>

            {loginFailed ? (
              <>
                <div className={`text-red-600`}>
                  Username atau Password salah.
                </div>
              </>
            ) : null}
            <div>
              <button
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
                type="submit"
              >
                Login
              </button>
            </div>
            {/* <div className="flex items-center justify-between">
              <div className="flex flex-row items-center">
                <input
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="comments"
                  className="ml-2 text-sm font-normal text-gray-400"
                >
                  Remember me
                </label>
              </div>
              <div>
                <a className="text-sm text-blue-600 hover:underline" href="#">
                  Forgot password?
                </a>
              </div>
            </div> */}
          </div>
        </section>
      </form>
    </>
  );
};

export default Login;
