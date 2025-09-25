import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { Box, Separator, Flex, Image, Text, Icon } from "@chakra-ui/react";
import { NavItems } from "@/components";
import { Avatar } from "@/components/ui";
import logo from "../assets/logo.jpg";
import { CurrentUserContext } from "@/contexts/CurrentUserContext"; // import contexts

const NavBar = () => {
  // use the context instead of a hardcoded value:
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext)!;
  const userLoggedIn = currentUser !== null; // label as logged in - true if user exists ("is not null")

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const toggleMenu = () => setIsBurgerOpen(!isBurgerOpen);

  const navigate = useNavigate();

  const itemsToRender = userLoggedIn
    ? NavItems.LoggedInItems
    : NavItems.LoggedOutItems;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setCurrentUser(null); // clear user state upon logout
    navigate("/"); // go to home page
  };

  return (
    <Box>
      <Flex
        marginX={5}
        marginTop={5}
        minHeight="66px"
        justify="space-between"
        align="baseline"
      >
        <Link to="/">
          <Image src={logo} alt="forum20" boxSize="65px" />
        </Link>

        {/* Burger toggle - mobile only: */}
        <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
          {isBurgerOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </Box>

        {/* Desktop menu: */}
        <Flex gap={5} align="flex-end" display={{ base: "none", md: "flex" }}>
          {itemsToRender.map((item) =>
            item.label !== "Log out" ? (
              <NavLink key={item.label} to={item.path!}>
                {({ isActive }) => (
                  <Flex align="center" gap={1}>
                    <Icon
                      as={item.icon}
                      boxSize={isActive ? item.size + 1 : item.size}
                      color={isActive ? "secondary" : "text"}
                    />
                    <Text
                      color={isActive ? "secondary" : "text"}
                      fontSize={isActive ? "lg" : "md"}
                      fontWeight={isActive ? "bold" : "normal"}
                    >
                      {item.label}
                    </Text>
                  </Flex>
                )}
              </NavLink>
            ) : (
              // Logout nav item:
              <Flex
                key={item.label}
                align="center"
                gap={2}
                cursor="pointer"
                onClick={handleLogout}
              >
                <Icon as={item.icon} boxSize={item.size} />
                <Text fontSize="md">{item.label}</Text>
              </Flex>
            )
          )}
          {/* current user's profile navlink with Avatar component: */}
          {currentUser && (
            <NavLink key="Profile" to={`/profiles/${currentUser.profile_id}`}>
              <Avatar src={currentUser.profile_image} height={40} />
            </NavLink>
          )}
        </Flex>
      </Flex>
      <Separator borderColor="text" marginTop={3} marginBottom={4} />

      {/* Mobile menu: */}
      {isBurgerOpen && (
        <>
          <Flex
            direction="column"
            gap={4}
            padding={4}
            alignItems="flex-end"
            display={{ base: "flex", md: "none" }}
          >
            {itemsToRender.map((item) =>
              item.label !== "Log out" ? (
                <NavLink key={item.label} to={item.path!} onClick={toggleMenu}>
                  {({ isActive }) => (
                    <Flex align="center" gap={1}>
                      <Icon
                        as={item.icon}
                        boxSize={isActive ? item.size + 1 : item.size}
                        color={isActive ? "secondary" : "text"}
                      />
                      <Text
                        color={isActive ? "secondary" : "text"}
                        fontSize={isActive ? "lg" : "md"}
                        fontWeight={isActive ? "bold" : "normal"}
                      >
                        {item.label}
                      </Text>
                    </Flex>
                  )}
                </NavLink>
              ) : (
                // logout nav item:
                <Flex
                  key={item.label}
                  align="center"
                  gap={2}
                  cursor="pointer"
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  <Icon as={item.icon} boxSize={item.size} />
                  <Text fontSize="md">{item.label}</Text>
                </Flex>
              )
            )}
          </Flex>
        </>
      )}
    </Box>
  );
};

export default NavBar;
