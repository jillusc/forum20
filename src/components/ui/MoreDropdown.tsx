import { useEffect, useRef, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { FaCaretDown } from "react-icons/fa";
import type { MenuItem } from "@/data/menuItems";

interface Props {
  menuItems: MenuItem[];
  width?: string | number;
}

const MoreDropdown = ({ menuItems, width = "115px" }: Props) => {
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
    width,
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
        boxSize="28px"
        borderWidth="2px"
        borderColor="primary"
        borderRadius="100%"
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <Box {...dropdownStyles}>
          <VStack align="stretch" gap={1}>
            {menuItems.map((item: MenuItem, index: number) => (
              <Box
                key={index}
                {...itemStyles}
                onClick={() => {
                  item.onClick(); // directly call the action
                  setIsOpen(false);
                }}
              >
                <item.icon />
                <Text>{item.label}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default MoreDropdown;
