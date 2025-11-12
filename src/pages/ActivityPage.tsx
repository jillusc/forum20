import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { axiosRes } from "@/api/axiosDefaults";
import type { Bookmark, Comment, Like } from "@/types";
import {
  FaBookmark,
  FaCommentDots,
  FaHeart,
  FaRegBookmark,
  FaRegCommentDots,
  FaRegHeart,
} from "react-icons/fa";

const ActivityPage = () => {
  const currentUser = useCurrentUser();
  const tabs = ["Likes", "Comments", "Bookmarks"];
  const [likes, setLikes] = useState<Like[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Likes");

  // use useEffect to fetch the posts liked, commented on and bookmarked by the user when this component mounts:
  useEffect(() => {
    if (!currentUser) return; // "wait until the user is loaded"
    // define an async function to fetch 3 things in parallel,
    // awaiting them with Promise.all for cleaner code:
    const fetchActivityItems = async () => {
      try {
        const [likesRes, commentsRes, bookmarksRes] = await Promise.all([
          axiosRes.get(`/likes/?user_id=${currentUser!.profile_id}`), // new
          axiosRes.get(
            `/comments/?user_id=${currentUser!.profile_id}&user_comments=true`
          ),
          axiosRes.get(`/bookmarks/?user_id=${currentUser!.profile_id}`),
        ]);
        // ...and store their data in state:
        setLikes(likesRes.data.results);
        setComments(commentsRes.data.results);
        setBookmarks(bookmarksRes.data.results);
      } catch (err) {
        setError("");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivityItems(); // now call this async function
  }, [currentUser]); // if the logged-in user changes, re-render (= re-fetch)

  // Provide fallback UI while data is loading, handle fetch errors,
  // and prevent crashes if required data (currentUser) is missing:
  if (loading)
    return (
      <Text my={6} textAlign="center">
        Loading activity...
      </Text>
    );
  if (error) return <Text>{error}</Text>;
  if (!currentUser)
    return (
      <Text my={6} textAlign="center">
        Content not found
      </Text>
    );

  const renderGridItem = (item: Like | Bookmark, type: "Like" | "Bookmark") => (
    <Box
      key={item.id}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      _hover={{ borderColor: "text" }}
      transition="all 0.2s ease"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Link to={`/posts/${item.post}`}>
        {item.post_image && (
          <Box
            height="150px"
            width="100%"
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <img
              src={item.post_image}
              alt={item.post_title}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
        )}
        <Text fontWeight="bold" textAlign="center" mt={2}>
          {item.post_title}
        </Text>
      </Link>
      <Text fontSize="xs" textAlign="center">
        {type === "Like" &&
          `Liked on ${new Date(item.created_at).toLocaleDateString("en-GB")}`}
        {type === "Bookmark" &&
          `Bookmarked on ${new Date(item.created_at).toLocaleDateString(
            "en-GB"
          )}`}
      </Text>
    </Box>
  );

  const renderCommentItem = (item: Comment) => (
    <Box key={item.id} p={4}>
      <VStack gap={3}>
        <Link to={`/posts/${item.post}`}>
          {item.post_image && (
            <Box
              maxW="200px"
              mx="auto"
              overflow="hidden"
              mt={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <img
                src={item.post_image}
                alt={item.post_title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          )}
          <Text fontWeight="bold" textAlign="center" my={2}>
            {item.post_title}
          </Text>
        </Link>

        <Box width="84%" p={4} mx="auto">
          <Text fontSize="xs">
            You commented on{" "}
            {new Date(item.created_at).toLocaleDateString("en-GB")}:
          </Text>
          <Box my={2} p={4} borderWidth="1px" borderRadius="2xl">
            <Text>{item.content}</Text>
          </Box>
        </Box>
      </VStack>
      <Box as="hr" mt={4} borderColor="gray.200" />
    </Box>
  );

  return (
    <>
      <Heading as="h2" size="xl" textAlign="center" my={6}>
        Recent activity
      </Heading>
      <Box
        maxWidth="768px"
        width="100%"
        mx="auto"
        my={2}
        p={4}
        borderWidth="2px"
        borderColor="primary"
        borderRadius="2xl"
      >
        <HStack gap={4} mb={3} justify="center">
          {tabs.map((tab) => (
            <VStack
              key={tab}
              cursor="pointer"
              align="center"
              onClick={() => setActiveTab(tab)}
              _hover={{
                color: "secondary",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              <Text
                fontSize="lg"
                fontWeight={activeTab === tab ? "bold" : "normal"}
                color="inherit"
                _hover={{
                  fontWeight: "bold",
                }}
              >
                {tab}
              </Text>
              <Box>
                {tab === "Likes" &&
                  (activeTab === "Likes" ? <FaHeart /> : <FaRegHeart />)}
                {tab === "Comments" &&
                  (activeTab === "Comments" ? (
                    <FaCommentDots />
                  ) : (
                    <FaRegCommentDots />
                  ))}
                {tab === "Bookmarks" &&
                  (activeTab === "Bookmarks" ? (
                    <FaBookmark />
                  ) : (
                    <FaRegBookmark />
                  ))}
              </Box>
            </VStack>
          ))}
        </HStack>
        <hr />

        <Box mt={4}>
          {activeTab === "Likes" &&
            (likes.length === 0 ? (
              <Text>No liked posts to show.</Text>
            ) : (
              <SimpleGrid columns={{ base: 2, md: 3 }} gap={4}>
                {likes.map((like) => renderGridItem(like, "Like"))}
              </SimpleGrid>
            ))}

          {activeTab === "Comments" &&
            (comments.length === 0 ? (
              <Text>No comments to show.</Text>
            ) : (
              comments.map((comment) => renderCommentItem(comment))
            ))}

          {activeTab === "Bookmarks" &&
            (bookmarks.length === 0 ? (
              <Text>No bookmarked posts found.</Text>
            ) : (
              <SimpleGrid columns={{ base: 2, md: 3 }} gap={4}>
                {bookmarks.map((bookmark) =>
                  renderGridItem(bookmark, "Bookmark")
                )}
              </SimpleGrid>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default ActivityPage;
