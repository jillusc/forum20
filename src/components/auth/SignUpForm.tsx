import { Link } from "react-router-dom";
import { Input } from "@chakra-ui/react";
import { Button, FormStyles } from "@/components/ui";

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

        <Button type="submit">Sign Up</Button>
      </FormStyles>
    </form>
  );
};

export default SignUpForm;
