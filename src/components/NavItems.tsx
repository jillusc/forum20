import {
  FaPlusCircle,
  FaSeedling,
  FaBullseye,
  FaSignOutAlt,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaHome,
} from "react-icons/fa";

export const NavItems = {
  LoggedInItems: [
    {
      label: "Home",
      icon: FaHome,
      size: 5,
      path: "/",
    },
    {
      label: "Add post",
      icon: FaPlusCircle,
      size: 4,
      path: "/posts/create",
    },
    {
      label: "Feed",
      icon: FaSeedling,
      size: 5,
      path: "/feed",
    },
    {
      label: "Activity",
      icon: FaBullseye,
      size: 4,
      path: "/activity",
    },
    {
      label: "Profile",
      icon: FaUser,
      size: 4,
      // doesn't need a path: handled dynamically in NavBar
    },
    {
      label: "Log out",
      icon: FaSignOutAlt,
      size: 4,
    },
  ],

  LoggedOutItems: [
    {
      label: "Home",
      icon: FaHome,
      size: 5,
      path: "/",
    },
    {
      label: "Add post",
      icon: FaPlusCircle,
      size: 4,
      path: "/posts/create",
    },
    {
      label: "Log in",
      icon: FaSignInAlt,
      size: 4,
      path: "/login",
    },
    {
      label: "Sign up",
      icon: FaUserPlus,
      size: 4,
      path: "/signup",
    },
  ],
};
