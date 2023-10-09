import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import bloodDrop from "../images/blood_drop.png";
import { useAuth } from "../hooks";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Donate Blood", href: "donate-blood" },
  { name: "Find Donor", href: "find-donor" },
  { name: "Blood Banks", href: "blood-banks" },
  { name: "ICU Beds", href: "icu-beds" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const [navOpen, setNavOpen] = useState(false);
  const auth = useAuth();
  return (
    <>
      <div className="bg-black fixed top-0 w-screen z-10 mx-auto px-2 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className=" inset-y-0 left-0 flex items-center sm:hidden">
          {/* Mobile menu button*/}
          <button
            onClick={() => {
              setNavOpen(!navOpen);
            }}
            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Open main menu</span>
            {navOpen ? (
              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        <div className="flex items-center space-x-2 w-auto">
          <h1 className=" text-de466c bg-brand-heading bg-center bg-clip-text text-transparent text-lg sm:text-2xl">
            Donate Life
          </h1>
          <motion.img
            className="h-11 hidden md:block"
            src={bloodDrop}
            alt="blood-drop"
            animate={{ scale: 1.3, opacity: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1,
            }}
          />
        </div>
        <div className="hidden sm:flex items-center space-x-4 md:space-x-8 lg:space-x-14">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                isActive
                  ? " text-gray-300 font-medium text-sm"
                  : "text-white hover:text-gray-300 text-sm font-medium"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        {auth.user ? (
          <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full"
                    src={auth.user?.profileImg}
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Your Profile
                      </NavLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Settings
                      </NavLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={auth.logout}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700 w-full"
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        ) : (
          <NavLink
            exact="true"
            to={"/donor-login"}
            className="text-white text-sm sm:text-md border-slate-50 border-2 px-4 py-1 font-semibold cursor-pointer hover:bg-gray-700"
          >
            Login
          </NavLink>
        )}
      </div>
      {navOpen && (
        <motion.div
          className="bg-black fixed top-16 w-screen z-10 space-y-1 px-2 pb-3 pt-2 sm:hidden"
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            ease: "easeInOut",
          }}
          exit={{ x: "-100vw", opacity: 0, transition: { ease: "easeInOut" } }}
        >
          {navigation.map((item) => (
            <NavLink
              onClick={() => setNavOpen(!navOpen)}
              exact="true"
              to={item.href}
              key={item.name}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-900 text-white flex items-center justify-center rounded-md px-3 py-2 text-base font-medium"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white flex items-center justify-center rounded-md px-3 py-2 text-base font-medium"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </motion.div>
      )}
    </>
  );
}
