"use client";
import { useEffect, useState } from "react";
import { Dialog, Menu } from "@headlessui/react";
import { XMarkIcon, Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import { cn, menuNavigation } from "@/lib/utils";
import { profile, sidebarImage } from "@/helpers/constants/image.constant";
import useAuthHelpers from "@/helpers/auth.helper";
import date from "date-and-time";
import { RootState } from "@/redux-store";
import { useSelector } from "react-redux";
interface SidebarProps {
  children: React.ReactNode;
  isPaddingPresent?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ children, isPaddingPresent = true }) => {
  const { handleLogout } = useAuthHelpers();
  const location = useLocation();
  const currentPath = location.pathname;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [time, setTime] = useState("");
  const drivingSchoolProfile = useSelector(
    (state: RootState) => state.profileStore.profileData
  );

  useEffect(() => {
    const now = new Date();
    setCurrentDate(date.format(now, "dddd DD, MMMM YYYY"));
    setTime(date.format(now, "hh:mm A"));
  }, []);

  const renderMenuItem = (item: (typeof menuNavigation)[0]) => {
    // Check if the current path matches the href exactly or starts with the href
    const isActive =
      currentPath === item.href ||
      (currentPath.startsWith(item.href) && item.name !== "Log Out");

    return (
      <li key={item.name}>
        <a
          onClick={(e) => {
            if (item.name === "Log Out") {
              e.preventDefault();
              handleLogout?.();
            }
          }}
          href={item.href}
          className={cn(
            "group relative flex gap-x-3 rounded-md p-2 text-sm leading-6 justify-between items-center",
            isActive
              ? "bg-white text-[#1E73BE] font-bold after:absolute after:right-0 after:top-1/4 after:bottom-1/4 after:w-1 after:bg-white after:-mr-[9px] after:rounded-sm"
              : "text-[#E0E0E0] font-semibold hover:bg-gray-50/10"
          )}
        >
          <span className="flex items-center gap-2">
            <img
              src={isActive ? item.activeImage : item.inactiveImage}
              alt={`${item.name} icon`}
              className="h-6 w-6 shrink-0"
            />
            {item.name}
          </span>
          {
            item.name !== "Log Out" && <img src="/img/lock.svg" alt="" className="w-4 h-4" />
          }

        </a>
      </li>
    );
  };

  return (
    <div className="relative isolate">
      <div>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <div className="fixed inset-0 bg-gray-900/80" />

          <div className="fixed inset-0 flex">
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button
                  type="button"
                  className="-m-2.5 p-2.5"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </button>
              </div>

              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#1E73BE] px-6 pb-2">
                <div className="flex flex-col items-center justify-center mt-4">
                  <a className="flex flex-col items-center justify-center -m-1.5 p-1.5">
                    <img
                      className="h-18 w-auto rounded-full"
                      src={sidebarImage}
                      alt="sidebarImage"
                    />
                  </a>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {menuNavigation.map(renderMenuItem)}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-[#1E73BE] px-6">
            <div className="mt-1">
              <img
                className="h-full w-full"
                src={sidebarImage}
                alt="sidebarImage"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {menuNavigation.map(renderMenuItem)}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </div>
        </div>

        <div className="lg:pl-64 fixed w-full">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <div
              className="h-6 w-px bg-gray-200 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="relative flex flex-col flex-1 pl-8">
                <p className="text-xs mt-4 font-semibold">{time}</p>
                <p className="text-xs mt-2 mb-2">{currentDate}</p>
              </div>

              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <span className="hidden lg:flex lg:items-center">
                      <div>
                        <a className="focus:outline-none">
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                          <div className="relative flex flex-col flex-1">
                            <p className="text-xs mt-4 font-semibold">
                              Lagos Driving School{drivingSchoolProfile?.data?.identifier}
                            </p>
                            <p className="text-xs mt-2 mb-2">
                              lagosdrive@gmail.com {drivingSchoolProfile?.data?.email}
                            </p>
                          </div>
                        </a>
                      </div>
                    </span>
                  </Menu.Button>
                </Menu>
                <img className="h-8 w-8" src={profile} alt="Profile Image" />
              </div>
            </div>
          </div>
        </div>

        <main className={cn(isPaddingPresent ? "py-20 lg:pl-72" : "pt-14 lg:pl-[16.1rem]")}>
          <div className={cn("", isPaddingPresent ? "px-4 sm:px-6 lg:px-8" : "px-0 sm:px-0 lg:px-0 py-0")}>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
