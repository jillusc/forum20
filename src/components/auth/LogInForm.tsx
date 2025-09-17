import { Link } from "react-router-dom";
import { Input } from "@chakra-ui/react";
import { Button, FormStyles } from "@/components/ui";

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

        <Button type="submit">Log In</Button>
      </FormStyles>
    </form>
  );
};

export default LogInForm;
