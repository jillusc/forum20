import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input, Text } from "@chakra-ui/react";
import { Button, FormStyles, TextLink } from "@/components/ui";
import { useSetCurrentUser } from "@/contexts/CurrentUserContext";
import { axiosRes } from "@/api/axiosDefaults";

interface LogInErrors {
  username?: string;
  password?: string;
}

const LogInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LogInErrors>({});

  const navigate = useNavigate();

  const setCurrentUser = useSetCurrentUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const dataToSend = {
      // packaged JSON object
      username,
      password,
    };

    try {
      const { data } = await axiosRes.post("/dj-rest-auth/login/", dataToSend);
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
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
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
        {errors.username && <Text color="red">{errors.username}</Text>}

        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        {errors.password && <Text color="red">{errors.password}</Text>}

        <Button type="submit">Log In</Button>
      </FormStyles>
    </form>
  );
};

export default LogInForm;
