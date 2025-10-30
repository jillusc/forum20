import { useEffect, useRef } from "react";
import { Box, Input, InputGroup } from "@chakra-ui/react";

const SearchBar = ({
  onSearch,
}: {
  onSearch: (searchText: string) => void;
}) => {
  // create a ref to the input box (don't need to store what the user types in state):
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // click-away listener:
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (inputRef.current) inputRef.current.value = ""; // clear user input safely on click-away
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Box ref={containerRef}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          // only call onSearch if the input exists:
          if (inputRef.current) onSearch(inputRef.current.value);
        }}
      >
        <InputGroup>
          <Input
            ref={inputRef}
            size="sm"
            width="96%"
            maxW="760px"
            mx="auto"
            mb={4}
            borderRadius={20}
            bg="white"
            border="1px solid text"
            pl={4}
            placeholder="Search posts..."
            _placeholder={{ color: "text" }}
          />
        </InputGroup>
      </form>
    </Box>
  );
};
export default SearchBar;

// line 33: "if the ref's .current is not null (i.e. it exists), pass its value to onSearch"
