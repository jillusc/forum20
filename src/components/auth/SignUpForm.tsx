import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input, Text } from "@chakra-ui/react";
import { Button, FormStyles, TextLink } from "@/components/ui";
import { SetCurrentUserContext } from "@/contexts/CurrentUserContext"; // import the setter
import { axiosRes } from "@/api/axiosDefaults";

interface SignUpErrors {
  username?: string;
  password1?: string;
  password2?: string;
}

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<SignUpErrors>({});

  const navigate = useNavigate();

  const setCurrentUser = useContext(SetCurrentUserContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const dataToSend = {
      // package local state values under the backend’s expected field names:
      username,
      password1,
      password2,
    };

    try {
      const { data } = await axiosRes.post(
        "/dj-rest-auth/registration/",
        dataToSend
      );
      setCurrentUser(data.user);
      navigate("/");
    } catch (err: any) {
      if (err.response?.data) {
        setErrors(err.response.data); // check for + store backend error data
      } else {
        console.error(err); // log unexpected errors
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        {errors.username && <Text color="red">{errors.username}</Text>}

        <Input
          id="password1"
          type="password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          placeholder="Enter password"
        />
        {errors.password1 && <Text color="red">{errors.password1}</Text>}

        <Input
          id="password2"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Confirm password"
        />
        {errors.password2 && <Text color="red">{errors.password2}</Text>}

        <Button type="submit">Sign Up</Button>
      </FormStyles>
    </form>
  );
};

export default SignUpForm;
