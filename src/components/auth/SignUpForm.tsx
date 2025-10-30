import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input, Text } from "@chakra-ui/react";
import { Button, FormStyles, TextLink } from "@/components/ui";
import { useSetCurrentUser } from "@/contexts/CurrentUserContext";
import { axiosRes } from "@/api/axiosDefaults";
import axios from "axios";

interface SignUpErrors {
  username?: string;
  password1?: string;
  password2?: string;
  non_field_errors?: string;
}

const SignUpForm = () => {
  // controlled inputs:
  const [username, setUsername] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<SignUpErrors>({});

  const navigate = useNavigate();
  const setCurrentUser = useSetCurrentUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // reset any previous errors before submit

    // required field validation:
    if (!username.trim()) {
      setErrors({ username: "Username is required." });
      return;
    }
    if (!password1.trim()) {
      setErrors({ password1: "Password is required." });
      return;
    }
    if (password1 !== password2) {
      setErrors({ password2: "Passwords do not match." });
      return;
    }

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
            ])
          );
          setErrors({
            ...formattedErrors,
            non_field_errors:
              formattedErrors.non_field_errors ||
              data.detail ||
              "Couldn't complete signup. Please try again.",
          });
        }
      } else {
        console.error("Unexpected error:", err); // log all other errors
        setErrors({
          non_field_errors: "Error signing up — something went wrong.",
        });
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
