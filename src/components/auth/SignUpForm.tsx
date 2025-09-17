import { Link } from "react-router-dom";
import { Box, Button, Input, Heading, Text, VStack } from "@chakra-ui/react";

const SignUpForm = () => {
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
        Sign Up
      </Heading>

      <form>
        <VStack gap={4}>
          <Box>
            <label htmlFor="username">Username</label>
            <Input type="text" placeholder="Enter username" />
          </Box>
          <Box>
            <label htmlFor="password1">Password</label>
            <Input
              id="password1"
              type="password"
              placeholder="Enter password"
              mt={1}
            />
          </Box>
          <Box>
            <label htmlFor="password2">Confirm Password</label>
            <Input
              id="password2"
              type="password"
              placeholder="Confirm password"
              mt={1}
            />
          </Box>

          <Button type="submit" marginTop={3} marginBottom={4}>
            Sign Up
          </Button>
        </VStack>
      </form>

      <Text textAlign="center">
        Already registered? <Link to="/login">Log in</Link>
      </Text>
    </Box>
  );
};

export default SignUpForm;
