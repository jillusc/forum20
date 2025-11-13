import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input, Text } from "@chakra-ui/react";
import { Button, FormStyles, TextLink } from "@/components/ui";
import { useSetCurrentUser } from "@/contexts";
import { axiosRes } from "@/api/axiosDefaults";
import axios from "axios";

interface LogInErrors {
  username?: string;
  password?: string;
  non_field_errors?: string;
}

const LogInForm = () => {
  // controlled inputs:
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [_loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LogInErrors>({});

  const navigate = useNavigate();
  const setCurrentUser = useSetCurrentUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // reset any previous errors before submit

    // required field validation:
    if (!username.trim() || !password.trim()) {
      setErrors({
        username: !username.trim() ? "Username required" : undefined,
        password: !password.trim() ? "Password required" : undefined,
      });
      return;
    }

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
    } catch (err: unknown) {
      // TS type guard - safely confirms this is an Axios error:
      if (axios.isAxiosError(err)) {
        const data = err.response?.data; // safely access the backend's reponse (if any)
        if (!data) {
          console.error("Network or connection error:", err);
          setErrors({ non_field_errors: "Network error — please try again." });
          return;
        }
        console.error("Backend error:", data); // log the raw data for debugging
        if (typeof data === "string") {
          setErrors({ non_field_errors: data });
        } else {
          // convert backend field arrays into single strings:
          const formattedErrors = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
              key,
              Array.isArray(value) ? value[0] : String(value),
            ]),
          );
          setErrors({
            ...formattedErrors,
            non_field_errors:
              formattedErrors.non_field_errors ||
              data.detail ||
              "Couldn't complete login. Please try again.",
          });
        }
      } else {
        console.error("Unexpected error:", err); // log all other errors
        setErrors({
          non_field_errors: "Error logging in — something went wrong.",
        });
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
        {errors.non_field_errors && (
          <Text color="red" textAlign="center" mb={3}>
            {errors.non_field_errors}
          </Text>
        )}
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
