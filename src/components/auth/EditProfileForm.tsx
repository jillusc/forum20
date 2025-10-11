import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, HStack, Input, Text, Textarea } from "@chakra-ui/react";
import { Button, FormField, FormStyles } from "@/components/ui";
import placeholderImage from "@/assets/post_image_placeholder.jpg";
import type { Errors } from "@/types";
import { axiosRes } from "@/api/axiosDefaults";

const EditProfileForm = () => {
  const { id } = useParams(); // get profile id from the URL
  // local state for the form fields:
  const [avatar, setAvatar] = useState<File | null>(null);
  const [username, setUsername] = useState("");
  const [bioText, setBioText] = useState("");
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();

  const handleCancel = () => {
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
        setBioText(data.content || "");
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
    setErrors({});
    setLoading(true);

    const formData = new FormData();
    if (avatar) formData.append("image", avatar); // only send a new file if selected
    formData.append("owner", username);
    formData.append("content", bioText);

    try {
      const { data } = await axiosRes.put(`/profiles/${id}/`, formData);
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
      <FormStyles title="Edit Profile" maxWidth="700px">
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
              const file = e.target.files?.[0] ?? null; // store the chosen file
              if (file) {
                setAvatar(file); // save image/file in state
                setPreviewURL(URL.createObjectURL(file)); // create new preview and save it in state
              } else {
                setAvatar(null);
                setPreviewURL(previewURL || null);
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
            value={bioText}
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
