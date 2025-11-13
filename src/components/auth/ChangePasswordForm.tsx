import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HStack, Input, Text } from "@chakra-ui/react";
import { Button, FormStyles } from "@/components/ui";
import { axiosRes } from "@/api/axiosDefaults";
import axios from "axios";
import { useToast } from "@/contexts";

interface ChangePasswordErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  non_field_errors?: string;
}

const ChangePasswordForm = () => {
  const { id } = useParams<{ id?: string }>();

  // controlled inputs:
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [_loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ChangePasswordErrors>({});

  const showToast = useToast();
  const navigate = useNavigate();

  if (!id) return <Text>Invalid profile ID</Text>;

  const handleCancel = () => {
    // reset all user input safely:
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
    navigate(`/profiles/${id}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // reset any previous errors before submit

    // required fields validation:
    if (
      !currentPassword.trim() ||
      !newPassword.trim() ||
      !confirmPassword.trim()
    ) {
      setErrors({
        currentPassword: !currentPassword.trim()
          ? "Please enter your current password."
          : undefined,
        newPassword: !newPassword.trim()
          ? "Please enter a new password."
          : undefined,
        confirmPassword: !confirmPassword.trim()
          ? "Please confirm new password."
          : undefined,
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match." });
      return;
    }

    setLoading(true);

    const dataToSend = {
      // Package local state values, mapped to the backend’s expected field names:
      current_password: currentPassword,
      new_password1: newPassword,
      new_password2: confirmPassword,
    };

    try {
      // NOTE: it requires a POST not a PUT!
      await axiosRes.post("/dj-rest-auth/password/change/", dataToSend);
      showToast("Password changed.");
      navigate(`/profiles/${id}`);
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
              "Couldn't update your password. Please try again.",
          });
        }
      } else {
        console.error("Unexpected error:", err); // log all other errors
        setErrors({
          non_field_errors: "Error updating password — something went wrong.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormStyles title="Change Password">
          {errors.non_field_errors && (
            <Text color="red" textAlign="center" mb={3}>
              {errors.non_field_errors}
            </Text>
          )}
          <Input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />
          {errors.currentPassword && (
            <Text color="red">{errors.currentPassword}</Text>
          )}
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
          {errors.newPassword && <Text color="red">{errors.newPassword}</Text>}
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
          {errors.confirmPassword && (
            <Text color="red">{errors.confirmPassword}</Text>
          )}
          <HStack justify="center" gap={4}>
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </HStack>
        </FormStyles>
      </form>
    </>
  );
};

export default ChangePasswordForm;
