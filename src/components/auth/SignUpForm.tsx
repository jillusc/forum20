import { useState } from "react";
import { Box, Input, Text } from "@chakra-ui/react";
import { Button, FormStyles, TextLink } from "@/components/ui";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <form>
      <FormStyles
        title="Sign Up"
        bottomText={
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <Text>Already registered?</Text>
            <Box minW="47px">
              <TextLink to="/login">Log in</TextLink>
            </Box>
          </Box>
        }
      >
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
        <Input
          id="password1"
          type="password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          placeholder="Enter password"
        />
        <Input
          id="password2"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Confirm password"
        />

        <Button type="submit">Sign Up</Button>
      </FormStyles>
    </form>
  );
};

export default SignUpForm;
