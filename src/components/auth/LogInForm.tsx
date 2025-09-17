import { Box, Input, Text } from "@chakra-ui/react";
import { Button, FormStyles, TextLink } from "@/components/ui";

const LogInForm = () => {
  return (
    <form>
      <FormStyles
        title="Log In"
        bottomText={
          <Box
            display="flex"
            justifyContent="center"
            gap={2}
            alignItems="center"
          >
            <Text>Not yet registered?</Text>
            <Box minW="57px">
              <TextLink to="/signup">Sign up</TextLink>
            </Box>
          </Box>
        }
      >
        <Input id="username" placeholder="Enter username" />
        <Input id="password" type="password" placeholder="Enter password" />

        <Button type="submit">Log In</Button>
      </FormStyles>
    </form>
  );
};

export default LogInForm;
