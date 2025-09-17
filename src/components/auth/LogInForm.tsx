import { Link } from "react-router-dom";
import { Box, Button, Input, Heading, Text, VStack } from "@chakra-ui/react";

const LogInForm = () => {
  return (
    <Box
      maxW="400px"
      mx="auto"
      marginTop={10}
      padding={6}
      borderColor="primary"
      borderWidth="2px"
      borderRadius="2xl"
    >
      <Heading mb={6} textAlign="center">
        Log In
      </Heading>

      <form>
        <VStack gap={4}>
          <Box>
            <label htmlFor="username">Username</label>
            <Input id="username" type="text" placeholder="Enter username" />
          </Box>

          <Box>
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              mt={1}
            />
          </Box>

          <Button type="submit" marginTop={3} marginBottom={4}>
            Log In
          </Button>
        </VStack>
      </form>

      <Text textAlign="center">
        Not yet registered? <Link to="/signup">Sign up</Link>
      </Text>
    </Box>
  );
};

export default LogInForm;
