import { Image, Flex, Icon } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";

interface Props {
  src?: string;
  height?: number;
}

const Avatar = ({ src, height = 45 }: Props) => {
  return (
    <Flex align="center" gap={2}>
      {src ? (
        <Image
          src={src}
          boxSize={`${height}px`}
          borderRadius="full"
          objectFit="cover"
          alt="user avatar"
        />
      ) : (
        <Icon as={FaUserCircle} boxSize={`${height}px`} color="text" />
      )}
    </Flex>
  );
};

export default Avatar;
