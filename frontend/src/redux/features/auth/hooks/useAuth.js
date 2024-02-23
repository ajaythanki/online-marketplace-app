import { useMutation } from "@tanstack/react-query";
import {
  userLogin,
  userSignup,
  userVerify,
} from "../../../../services/authService";
import toast from "react-hot-toast";

export const useSignupMutation = () =>
  useMutation({
    mutationKey: "usersignup",
    mutationFn: userSignup,
    onMutate: () => toast.loading("Signing Up", { id: "usersignup" }),
    onSuccess: (data) => {
      return toast.success(`Signed Up Successfully: ${data.message}`, {
        id: "usersignup",
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(`Signup failed : ${error?.response.data.message}`, {
        id: "usersignup",
      });
    },
  });
export const useVerifyUserMutation = () =>
  useMutation({
    mutationKey: "userVerify",
    mutationFn: userVerify,
    onMutate: () => {
      toast.loading("Verifying", { id: "userverification" });
    },
    onSuccess: (data) => {
      toast.success(`Verified Successfully: ${data.message}`, {
        id: "userverification",
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(`Verification failed : ${error?.response.data.message}`, {
        id: "userverification",
      });
    },
  });
export const useLoginMutation = () =>
  useMutation({
    mutationKey: "userLogin",
    mutationFn: userLogin,
    onMutate: () => {
      toast.loading("Signing In", { id: "userlogin" });
    },
    onSuccess: (data) => {
      toast.success(`Signed In Success: ${data.message}`, { id: "userlogin" });
    },
    onError: (error) => {
      console.log(error);
      toast.error(`Signing in failed : ${error?.response.data.message}`, {
        id: "userlogin",
      });
    },
  });
