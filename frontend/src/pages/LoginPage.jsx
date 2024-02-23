import { Link, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { BiLogIn } from "react-icons/bi";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useLoginMutation } from "../redux/features/auth/hooks/useAuth";
import { setUser } from "../redux/features/auth/userSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { isSuccess, mutateAsync, data } = useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutateAsync({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      dispatch(setUser(data.user));
      window.localStorage.setItem("loggedInUser", JSON.stringify(data.user));
    }
  }, [isSuccess, data]);

  return (
    <Layout>
      <div className="flex flex-1 flex-col justify-center px-6 lg:items-center lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            <FaCircleUser className="text-center mx-auto text-4xl" />
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to={`/forgot-password`}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
                <BiLogIn className="text-2xl" />
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not have account?{" "}
            <Link
              to={"/signup"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
