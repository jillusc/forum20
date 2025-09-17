import { Box, Input, Text } from "@chakra-ui/react";
import { Button, FormStyles, TextLink } from "@/components/ui";

const SignUpForm = () => {
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
        <Input id="username" placeholder="Enter username" />
        <Input id="password1" type="password" placeholder="Enter password" />
        <Input id="password2" type="password" placeholder="Confirm password" />

        <Button type="submit">Sign Up</Button>
      </FormStyles>
    </form>
  );
};

export default SignUpForm;
