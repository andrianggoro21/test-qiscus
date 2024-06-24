import { Input, Button, Box, useColorMode } from "@chakra-ui/react";
import PropTypes from "prop-types";


const ChatInput = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      display="flex"
      p={6}
      bg={colorMode === "light" ? "white" : "gray.900"}
      borderTop="1px solid"
      borderColor={colorMode === "light" ? "gray.300" : "gray.700"}
    >
      <Input
        placeholder="Type your message..."
        borderRadius="20px"
        bg={colorMode === "light" ? "gray.100" : "gray.700"}
      />
      <Button ml={2} bg="green.500" color="white">
        Send
      </Button>
    </Box>
  );
};

ChatInput.propTypes = {
  fetchMessages: PropTypes.func.isRequired,
};

export default ChatInput;
