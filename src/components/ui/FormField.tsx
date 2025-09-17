import React from "react";
import { Box } from "@chakra-ui/react";

interface Props {
  label: React.ReactNode;
  children: React.ReactNode;
}

const FormField = ({ label, children }: Props) => {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {label}
      {children}
    </Box>
  );
};

export default FormField;
