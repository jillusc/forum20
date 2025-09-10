import {
  Box,
  Separator,
  Flex,
  Icon,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
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
import logo from "../assets/logo.jpg";

const NavBar = () => {
  return (
    <Box>
      <Flex marginX={5} marginTop={5} align="center" justify="space-between">
        <Image src={logo} alt="forum20" boxSize="65px" />
        <Flex align="flex-end" gap={6}>
          <Link>
            <Icon as={FaHome} />
            <Text fontSize="sm" fontWeight="medium">
              Home
            </Text>
          </Link>
          <Link>
            <Icon as={FaPlusCircle} />
            <Text fontSize="sm" fontWeight="medium">
              Add Post
            </Text>
          </Link>
          <Link>
            <Icon as={FaSeedling} />
            <Text fontSize="sm" fontWeight="medium">
              Feed
            </Text>
          </Link>
          <Link>
            <Icon as={FaBullseye} />
            <Text fontSize="sm" fontWeight="medium">
              Activity
            </Text>
          </Link>
          <Link>
            <Icon as={FaSignOutAlt} />
            <Text fontSize="sm" fontWeight="medium">
              Log out
            </Text>
          </Link>
          <Link>
            <Icon as={FaUser} />
            <Text fontSize="sm" fontWeight="medium">
              Profile
            </Text>
          </Link>
          <Link>
            <Icon as={FaSignInAlt} />
            <Text fontSize="sm" fontWeight="medium">
              Log in
            </Text>
          </Link>
          <Link>
            <Icon as={FaUserPlus} />
            <Text fontSize="sm" fontWeight="medium">
              Sign up
            </Text>
          </Link>
        </Flex>
      </Flex>
      <Separator borderColor="#3c3c3c" marginTop={3} marginBottom={4} />
    </Box>
  );
};

export default NavBar;
