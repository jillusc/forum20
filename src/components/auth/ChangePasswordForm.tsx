import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HStack, Input, Text } from "@chakra-ui/react";
import { Button, FormStyles } from "@/components/ui";
import { useSetCurrentUser } from "@/contexts/CurrentUserContext";
import { axiosRes } from "@/api/axiosDefaults";

interface ChangePasswordErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ChangePasswordForm = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const setCurrentUser = useSetCurrentUser();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ChangePasswordErrors>({});

  if (!id) return <Text>Invalid profile ID</Text>;

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
    navigate(`/profiles/${id}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const dataToSend = {
      // Package local state values, mapped to the backend’s expected field names:
      current_password: currentPassword,
      new_password1: newPassword,
      new_password2: confirmPassword,
    };

    try {
      // NOTE: it requires a POST not a PUT!
      const { data } = await axiosRes.post(
        "/dj-rest-auth/password/change/",
        dataToSend
      );
      setCurrentUser(data.user);
      navigate(`/profiles/${id}`);
    } catch (err: any) {
      if (err.response?.data) {
        setErrors(err.response.data); // check and store backend errors
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormStyles title="Change Password">
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
  );
};

export default ChangePasswordForm;
