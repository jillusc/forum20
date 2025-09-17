import { Link } from "react-router-dom";
import { Button, Input } from "@chakra-ui/react";
import FormStyles from "../ui/FormStyles.tsx";

const SignUpForm = () => {
  return (
    <form>
      <FormStyles
        title="Sign Up"
        bottomText={
          <>
            Already registered? <Link to="/login">Log in</Link>
          </>
        }
      >
        <Input id="username" placeholder="Enter username" />
        <Input id="password1" type="password" placeholder="Enter password" />
        <Input id="password2" type="password" placeholder="Confirm password" />

        <Button type="submit" marginTop={3} marginBottom={4}>
          Sign Up
        </Button>
      </FormStyles>
    </form>
  );
};

export default SignUpForm;
