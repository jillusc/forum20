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
    { label: "Home", icon: FaHome, size: 5, path: "/" },
    { label: "Add post", icon: FaPlusCircle, size: 4, path: "/" },
    { label: "Feed", icon: FaSeedling, size: 4, path: "/" },
    { label: "Activity", icon: FaBullseye, size: 4, path: "/" },
    { label: "Log out", icon: FaSignOutAlt, size: 4, path: "/" },
    { label: "Profile", icon: FaUser, size: 4, path: "/" },
  ],

  LoggedOutItems: [
    { label: "Home", icon: FaHome, size: 5, path: "/" },
    { label: "Add post", icon: FaPlusCircle, size: 4, path: "/" },
    { label: "Log in", icon: FaSignInAlt, size: 4, path: "/" },
    { label: "Sign up", icon: FaUserPlus, size: 4, path: "/" },
  ],
};
