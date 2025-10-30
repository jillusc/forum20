import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, HStack, Input, Text, Textarea } from "@chakra-ui/react";
import { Button, FormField, FormStyles } from "@/components/ui";
import placeholderImage from "@/assets/post_image_placeholder.jpg";
import type { Errors } from "@/types";
import { axiosRes } from "@/api/axiosDefaults";
import axios from "axios";

const EditProfileForm = () => {
  const { id } = useParams();
  if (!id) return <Text>Invalid profile ID</Text>;

  // controlled inputs:
  const [avatar, setAvatar] = useState<File | null>(null);
  const [username, setUsername] = useState<string>("");
  const [bioText, setBioText] = useState<string | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();

  const handleCancel = () => {
    // reset all user input safely:
    setAvatar(null);
    setUsername("");
    setBioText("");
    setPreviewURL(null);
    setErrors({});
    navigate(`/profiles/${id}`);
  };

  // upon mount, this fetches the existing profile data:
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosRes.get(`/profiles/${id}/`);
        setPreviewURL(data.image || null); // show current avatar
        // (avatar remains null until user selects a new file)
        setUsername(data.owner);
        setBioText(data.content || null);
      } catch (err) {
        setErrors({});
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    // next, call this async function:
    fetchProfile();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // reset any previous errors before submit

    // required field validation:
    if (!username.trim()) {
      setErrors({ owner: "Username cannot be empty." });
      return;
    }
    setLoading(true);

    // safely prepare formData for submission:
    const formData = new FormData();
    if (avatar) formData.append("image", avatar); // only send a new file if selected
    formData.append("owner", username);
    formData.append("content", bioText ?? "");

    try {
      const { data } = await axiosRes.put(`/profiles/${id}/`, formData);
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
            ])
          );
          setErrors({
            ...formattedErrors,
            non_field_errors:
              formattedErrors.non_field_errors ||
              data.detail ||
              "Couldn't update your profile. Please try again.",
          });
        }
      } else {
        console.error("Unexpected error:", err); // log all other errors
        setErrors({
          non_field_errors: "Error updating profile — something went wrong.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // cleanup function for when component unmounts or previewURL changes:
  useEffect(() => {
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  return (
    <form onSubmit={handleSubmit}>
      <FormStyles title="Edit Profile" maxWidth="736px">
        {errors.non_field_errors && (
          <Text color="red" textAlign="center" mb={3}>
            {errors.non_field_errors}
          </Text>
        )}
        <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
          <Text
            mb={3}
            cursor="pointer"
            _hover={{ color: "secondary", fontWeight: "bold" }}
          >
            Change image
          </Text>
          <Box
            display="flex"
            width="80%"
            mx="auto"
            justifyContent="center"
            maxH={{ base: "50vh", md: "60vh" }}
          >
            <img
              src={previewURL || placeholderImage} // fallback if nothing exists
              alt="image preview"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
          <Input
            id="image-upload"
            type="file"
            display="none"
            accept="image/*"
            onChange={(e) => {
              // controlled file input:
              const file = e.target.files?.[0] ?? null; // store the chosen file
              if (file) {
                setAvatar(file); // save image/file in state
                setPreviewURL(URL.createObjectURL(file)); // create new preview and save it in state
              } else {
                setAvatar(null);
                setPreviewURL(previewURL || null); // fallback to the original
              }
            }}
          />
          {errors.image && <Text color="red">{errors.image}</Text>}
        </label>
        <FormField label={<label htmlFor="username">Username</label>}>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          {errors.owner && <Text color="red">{errors.owner}</Text>}
        </FormField>
        <FormField label={<label htmlFor="bioText">Bio</label>}>
          <Textarea
            id="bioText"
            value={bioText ?? ""}
            onChange={(e) => setBioText(e.target.value)}
            placeholder="Tell f20 about yourself..."
            rows={3}
          />
          {errors.content && <Text color="red">{errors.content}</Text>}
        </FormField>
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

export default EditProfileForm;
