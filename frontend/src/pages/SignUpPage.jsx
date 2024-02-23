import { Link, useNavigate } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import {
  useSignupMutation,
  useVerifyUserMutation,
} from "../redux/features/auth/hooks/useAuth";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // const signUp = useMutation({
  //   mutationFn: (credentials) => {
  //     console.log(credentials);
  //     return axios.post(
  //       `http://localhost:8080/api/auth/signup/`,
  //       credentials,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //   },
  //   onMutate: (variables) => {
  //     toast.loading("Signing Up", { id: "usersignup" });
  //   },
  //   onSuccess:(data)=>{
  //     console.log('success', data)
  //     toast.success(`Signed Up Successfully: ${data.data.message}`, { id: "usersignup" })
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //     toast.error(`Signup failed : ${error?.response.data.message}`, {
  //       id: "usersignup",
  //     });
  //   }

  // });
  // const verifyUser = useMutation({
  //   mutationFn: (credentials) => {
  //     console.log(credentials);
  //     return axios.post(
  //       `http://localhost:8080/api/auth/verify/`,
  //       credentials,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //   },
  //   onMutate: (variables) => {
  //     toast.loading("Verifying", { id: "userverification" });
  //   },
  //   onSuccess:(data)=>{
  //     console.log('success', data)
  //     toast.success(`Verified Successfully: ${data.data.message}`, { id: "userverification" })
  //     navigate("/login");
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //     toast.error(`Verification failed : ${error?.response.data.message}`, {
  //       id: "userverification",
  //     });
  //   }

  // });

  const {
    mutateAsync: verifyMutation,
    isSuccess: isVerifySuccess,
    // data: signUpData,
  } = useVerifyUserMutation();
  const handleVerifyOTP = () => {
    if (otp.length !== 4)
      return toast.error("Invalid OTP", { id: "userverification" });
    verifyMutation({ verificationCode: otp });
  };
  const {
    mutateAsync: signupMutation,
    isSuccess: isSignupSuccess,
    isPending: isSignupPending,
    // data:signupData
  } = useSignupMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return toast.error("Password and confirm password should be same", {
        id: "usersignup",
      });
    signupMutation({ name, email, password });
  };

  if (isVerifySuccess) {
    navigate("/listings");
  }

  return (
    <Layout>
      <div className="flex flex-1 flex-col justify-center px-6 lg:items-center lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            <AiOutlineUserAdd className="text-center mx-auto text-4xl" />
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  disabled={isSignupPending}
                />
              </div>
            </div>
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
                  disabled={isSignupPending}
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
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  minLength={6}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isSignupPending}
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="confirm-password"
                  value={confirmPassword}
                  minLength={6}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isSignupPending}
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSignupPending}
                className="flex w-full justify-center items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
                <BiLogIn className="text-2xl" />
              </button>
            </div>
          </form>
          {isSignupSuccess && (
            <div className="mt-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Enter OTP sent to your email
              </label>
              <div className="mt-2 flex justify-between gap-3">
                <input
                  type="password"
                  value={otp}
                  onChange={({ target }) => setOtp(target.value)}
                  autoComplete="false"
                  onFocus={(e) => {
                    e.stopPropagation();
                  }}
                  required
                  className="w-full flex p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  onClick={handleVerifyOTP}
                  disabled={otp.length !== 4}
                  className="flex w-full justify-center items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Verify
                  <RiLockPasswordFill className="text-2xl" />
                </button>
              </div>
            </div>
          )}
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have account?{" "}
            <Link
              to={"/login"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SignUpPage;
