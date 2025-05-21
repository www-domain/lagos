import { APP_NAVIGATION } from "@/helpers/constants.helper";
import { useRouteError } from "react-router-dom";
import AppNavigation from "./app-navigation";
import { motion } from 'framer-motion'
import { useEffect, useState } from "react";
import { lagosLogo } from "@/helpers/constants/image.constant";

export function ErrorFallback() {
  // Error from the route, type cast for better TypeScript handling
  const error = useRouteError() as { message?: string, type?: string } | null;
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Function to check if the error is network-related
  const isNetworkError = error?.type === "network" || (error?.message && error.message.toLowerCase().includes("network"));

  return (
   <>
    <section className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 border rounded-xl shadow-2xl bg-white"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
          >
            <div className="flex justify-center">
          <img src={lagosLogo} alt="Lagos Logo" className="w-16" />
        </div>
        <h1 className="mb-4 text-5xl tracking-tight font-extrabold lg:text-7xl text-red-500 dark:text-red-500">
          Oops!
        </h1>
            
          </motion.div>
          <p className="mb-4">
            {isNetworkError ? (
              "We're sorry, but we encountered a network issue while processing your request."
            ) : (
              "We're sorry, but we encountered an issue while processing your request."
            )}
          </p>
          <div className="bg-red-100 py-2 px-4 rounded-md">
            <p className="text-sm font-medium">
              <strong>Error Message:</strong> {error?.message || "Unknown error occurred."}
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <AppNavigation variant={APP_NAVIGATION.back}  />
            <AppNavigation variant={APP_NAVIGATION.reload} />
          </div>
        </div>
      </motion.div>
    </section>
    </>
  );
}
