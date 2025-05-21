"use client";
import Sidebar from "@/components/sidebar";
import { ProfileSkeleton } from "@/components/ui/profile-loader";
import { profile1 } from "@/helpers/constants/image.constant";
import { RootState } from "@/redux-store";
import { setProfileData } from "@/redux-store/slices/profile.slice";
import { drivingSchoolProfileApi } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const id = useSelector((state: RootState) => state.authStore.drivingSchoolId); 
console.log("firstss", id); 
  const { data: response, isLoading, isError, error } = useQuery({
    queryKey: ["schoolProfile", id],
    queryFn: () => drivingSchoolProfileApi(id as number),
    enabled: !!id, 
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (response) {
      dispatch(setProfileData(response.data));
    }
  }, [response, dispatch]);
  console.log("firsteeee", setProfileData)

  console.log("response", response);
console.log("reponse", response)
  

  if (isError) return <p>Error: {error?.message || "Something went wrong"}</p>;

  return (
    <main className="relative isolate">
      <Sidebar>
        <h1 className="text-3xl text-gray-700 font-bold">Profile</h1>

        <div className="mx-auto mt-8">
        {isLoading ? (
            <ProfileSkeleton />
          ) : (
          <div className="bg-white shadow-md rounded-md p-6 mx-auto">
            <div className="grid grid-cols-3 gap-6 items-center">
              {/* Logo Section */}
              <div className="flex justify-center">
                <img
                  src={profile1}
                  alt="Driving School Logo"
                  className="w-48 h-48 object-contain"
                />
              </div>

              {/* Details Section */}
              <div className="col-span-2">
                <h3 className="text-xl font-bold">
                 {response?.data?.name}
                </h3>
                <p className="text-gray-500 mb-4">School Name</p>

                <div className="grid grid-cols-3 gap-y-2 text-sm mt-4">
                  <div>
                    <p className="text-gray-500">School ID</p>
                    <p className="font-semibold">{response?.data?.identifier}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-semibold">{response?.data?.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone Number</p>
                    <p className="font-semibold">{response?.data?.phone}</p>
                  </div>
                </div>

                <div className="text-sm mt-4">
                  <div>
                    <p className="text-gray-500">Address</p>
                    <p className="font-semibold">
                      {response?.data?.address}
                    </p>
                  </div>

                </div>

                <div className="grid grid-cols-3 gap-y-2 text-sm mt-6">
                  <div>
                    <p className="text-gray-500">Admin</p>
                    <p className="font-semibold">David Hosiah</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className="font-semibold text-[#04A65B]"> {response?.data?.isActive ? "Active" : "Inactive"}</p>
                  </div>
                  <div className="">
                    <button className="bg-[#107BC0] text-sm text-white px-6 py-2 rounded-sm shadow">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
              )}
        </div>
      </Sidebar>
    </main>
  );
}
