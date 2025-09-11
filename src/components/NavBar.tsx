import { Link, NavLink } from "react-router-dom";
import { Box, Separator, Flex, Image, Text, Icon } from "@chakra-ui/react";
import { NavItems } from "./NavItems";
import logo from "../assets/logo.jpg";

const NavBar = () => {
  // const userLoggedIn = false;
  const userLoggedIn = true;
  const itemsToRender = userLoggedIn
    ? NavItems.LoggedInItems
    : NavItems.LoggedOutItems;

  return (
    <Box>
      <Flex marginX={5} marginTop={5} justify="space-between" align="center">
        <Link to="/">
          <Image src={logo} alt="forum20" boxSize="65px" />
        </Link>
        <Flex gap={7} marginTop={9} align="flex-end">
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
              <Flex key={item.label} align="center" gap={2} cursor="pointer">
                <Icon as={item.icon} boxSize={item.size ?? 4} />
                <Text fontSize="md">{item.label}</Text>
              </Flex>
            )
          )}
        </Flex>
      </Flex>
      <Separator borderColor="text" marginTop={3} marginBottom={4} />
    </Box>
  );
};

export default NavBar;
