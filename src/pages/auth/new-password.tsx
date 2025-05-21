"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { lagosLogo, loginImage } from "@/helpers/constants/image.constant"
import { INPUT_NAMES } from "@/lib/utils"
import PasswordField from "@/components/ui/password"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/helpers/constants/routes.constant"
import { useMutation } from "@tanstack/react-query"
import { updatePasswordApi } from "@/services/auth.service"
import type { RootState } from "@/redux-store"
import { useSelector } from "react-redux"
import BtnLoader from "@/components/ui/BtnLoader"
import { Check } from "lucide-react"
import usePasswordValidation from "@/helpers/hooks/validators/UsePasswordValidation"

export default function NewPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {email, otp} = useSelector((state: RootState) => state.changePassword)


  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

  const passwordRequirements = usePasswordValidation(password, confirmPassword); 

  const allRequirementsMet = passwordRequirements.every((req) => req.met)

  const {
    mutate: updatePassword,
    isPending: isUpdatingPassword,
    isError,
  } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Password changed successfully")
        navigate(ROUTES.LOGIN)
      } else {
        toast.error(response.message || "Failed to change password. Please try again.")
      }
    },
    onError: () => {
      toast.error("Failed to change password. Please try again.")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!allRequirementsMet) {
      toast.error("Please meet all password requirements")
      return
    }

    const payload = {
      email,
      otp,
      password,
      confirmPassword,
    }
    updatePassword(payload)
  }

  return (
    <main className="flex min-h-screen">
      {/* Left side - Bridge Image */}
      <div className="hidden md:flex flex-[3] relative">
        <img
          src={loginImage || "/placeholder.svg"}
          alt="Lekki-Ikoyi Link Bridge"
          className="absolute inset-0 object-cover w-full h-full"
        />
      </div>

      {/* Right side - Change Password Form */}
      <div className="flex flex-[2] flex-col items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <img src={lagosLogo || "/placeholder.svg"} alt="Lagos State Government Logo" className="w-24 h-24 mb-6" />
            <h1 className="text-2xl font-semibold text-[#1E73BE]">Set New Password</h1>
            <p className="mt-2 text-gray-600 text-sm">Enter a new password</p>
          </div>

          {/* Change Password Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <PasswordField
                name={INPUT_NAMES.NEW_PASSWORD}
                label="New Password"
                placeholder="Enter new password"
                value={password}
                showPassword={showNewPassword}
                onChange={(e) => setPassword(e.target.value)}
                togglePasswordVisibility={toggleNewPasswordVisibility}
              />

              <PasswordField
                name={INPUT_NAMES.CONFIRM_PASSWORD}
                label="Confirm Password"
                placeholder="Re-enter password"
                value={confirmPassword}
                showPassword={showConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                togglePasswordVisibility={toggleConfirmPasswordVisibility}
              />
            </div>

            {/* Password Requirements */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Password Requirements</h3>
              <ul className="space-y-2">
                {passwordRequirements.map((requirement, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <div
                      className={`w-4 h-4 mr-2 rounded-full flex items-center justify-center ${
                        requirement.met ? "bg-[#1E73BE] border-[#1E73BE]" : "border border-gray-300"
                      }`}
                    >
                      {requirement.met && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={requirement.met ? "text-[#1E73BE] font-medium" : ""}>{requirement.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full bg-[#1E73BE] text-white py-2 rounded-md"
                disabled={isUpdatingPassword || !allRequirementsMet}
              >
                {isUpdatingPassword ? <BtnLoader visible={true} /> : "Confirm"}
              </Button>
              <button
                type="button"
                onClick={() => navigate(ROUTES.LOGIN)}
                className="w-full text-center text-sm text-[#1E73BE]"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

