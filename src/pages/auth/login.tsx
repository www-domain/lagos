"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { lagosLogo, loginImage } from "@/helpers/constants/image.constant";
import { INPUT_NAMES } from "@/lib/utils";
import PasswordField from "@/components/ui/password";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/helpers/constants/routes.constant";
import FloatingInputField from "@/components/ui/floating-input";
import { useMutation } from "@tanstack/react-query";
import { KEYS } from "@/helpers/constants.helper";
import { loginApi } from "@/services/auth.service";
import { userProfileApi } from "@/services/user.service";
import { useDispatch } from "react-redux";
import { login } from "@/redux-store/slices/auth.slice";
import { ChangePasswordModal } from "@/components/change-password-modal";
import BtnLoader from "@/components/ui/BtnLoader";


export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: async (data) => {
      console.log(data, "datadatadata")
      try {
        localStorage.setItem(KEYS.TOKEN, data.accessToken);
        const profileData = await userProfileApi();
        dispatch(login({ isFirstTime: profileData.data.changePasswordNextLogin, drivingSchoolId: profileData.data.drivingSchoolId, })
        );
        navigate(ROUTES.STUDENTS);

      } catch (error) {
        toast.error("Failed to fetch user profile. Please try again.");
      }
    },
    onError: (error) => {
      console.log(error, "===errorr")
      toast.error("Login failed. Please check your credentials.");
    },
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    loginMutation.mutate({
      email: userId,
      password,
    });
  };


  return (
    <main className="flex min-h-screen">
      {/* Left side - Bridge Image */}
      <div className="hidden md:flex flex-[3] relative">
        <img
          src={loginImage}
          alt="Lekki-Ikoyi Link Bridge"
          className="absolute inset-0 object-cover w-full h-full"
        />
      </div>

      {/* Right side - Login Form */}
      <div className="flex flex-[2] flex-col items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <img
              src={lagosLogo}
              alt="Lagos State Government Logo"
              className="w-24 h-24 mb-6"
            />
            <h1 className="text-2xl font-semibold text-[#1E73BE]">
              Admin Login
            </h1>
            <p className="mt-2 text-gray-600 text-sm">
              Enter your details to log into your account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mt-6">
              <FloatingInputField
                label="User ID"
                name={INPUT_NAMES.USER_ID}
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>

            <div className="mt-10">
              <PasswordField
                name={INPUT_NAMES.PASSWORD}
                label="Password"
                placeholder="Enter password"
                value={password}
                showPassword={showPassword}
                onChange={(e) => setPassword(e.target.value)}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            </div>

            <div className="mt-16">
              <Button
                type="submit"
                className="w-full bg-[#1E73BE] text-white py-2 rounded-md"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? <BtnLoader visible={true} /> : "Login"}
              </Button>
              <div className="mt-2 flex justify-center">
                <p className="text-sm">
                  Forgot Password?{' '}
                  <Link
                    to={ROUTES.FORGOT_PASSWORD}
                    className="text-blue-600"
                  >
                    Click here
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      <ChangePasswordModal
        open={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}

      />
    </main>
  );
}
