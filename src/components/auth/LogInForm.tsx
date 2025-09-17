import { Link } from "react-router-dom";
import { Button, Input } from "@chakra-ui/react";
import FormStyles from "../ui/FormStyles.tsx";

const LogInForm = () => {
  return (
    <form>
      <FormStyles
        title="Log In"
        bottomText={
          <>
            Not yet registered? <Link to="/signup">Sign up</Link>
          </>
        }
      >
        <Input id="username" placeholder="Enter username" />
        <Input id="password" type="password" placeholder="Enter password" />

        <Button type="submit" marginTop={3} marginBottom={4}>
          Log In
        </Button>
      </FormStyles>
    </form>
  );
};

export default LogInForm;
