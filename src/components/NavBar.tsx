import {
  Box,
  Separator,
  Flex,
  Icon,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { NavItems } from "./NavItems";
import logo from "../assets/logo.jpg";

const NavBar = () => {
  // const userLoggedIn = false;
  const userLoggedIn = true;
  const itemsToRender = [
    ...(userLoggedIn ? NavItems.LoggedInItems : NavItems.LoggedOutItems),
  ];

  return (
    <Box>
      <Flex marginX={5} marginTop={5} justify="space-between">
        <Box>
          <Image src={logo} alt="forum20" boxSize="65px" />
        </Box>
        <Flex gap={7}>
          {itemsToRender.map((item) => (
            <Link
              key={item.label}
              href={item.path}
              display="flex"
              alignItems="flex-end"
            >
              <Icon as={item.icon} boxSize={item.size} marginBottom={1} />
              <Text fontSize="md">{item.label}</Text>
            </Link>
          ))}
        </Flex>
      </Flex>
      <Separator borderColor="#3c3c3c" marginTop={3} marginBottom={4} />
    </Box>
  );
};

export default NavBar;
