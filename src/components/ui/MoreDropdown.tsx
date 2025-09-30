import { useEffect, useRef, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { FaCaretDown, FaEdit, FaTrashAlt } from "react-icons/fa";

interface Props {
  onEdit?: () => void; // although these are NOT optional for this component, we mark them so
  onDelete?: () => void; // because they ARE optional in the parent, PostTemplate
}

const MoreDropdown = ({ onEdit, onDelete }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  // click-away listener:
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownStyles = {
    position: "absolute" as const,
    top: "100%",
    right: 0,
    minWidth: "115px",
    marginTop: 3,
    padding: 2,
    bg: "white",
    borderWidth: "2px",
    borderColor: "primary",
    borderRadius: "2xl",
  };

  const itemStyles = {
    cursor: "pointer",
    paddingX: 2,
    borderRadius: "md",
    _hover: { color: "secondary", fontWeight: "bold" },
    display: "flex",
    alignItems: "center",
    gap: 3,
  };

  return (
    <Box position="relative" ref={dropdownRef}>
      <Box
        as={FaCaretDown}
        boxSize="24px"
        marginX={2}
        borderWidth="2px"
        borderColor="primary"
        borderRadius="100%"
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <Box {...dropdownStyles}>
          <VStack align="stretch" gap={1}>
            <Box
              {...itemStyles}
              onClick={() => {
                onEdit?.();
                setIsOpen(false);
              }}
            >
              <FaEdit />
              <Text>Edit</Text>
            </Box>
            <Box
              {...itemStyles}
              onClick={() => {
                onDelete?.();
                setIsOpen(false);
              }}
            >
              <FaTrashAlt />
              <Text>Delete</Text>
            </Box>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default MoreDropdown;
