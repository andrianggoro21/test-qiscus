import { useState } from "react";
import { Input, Button, Box, useColorMode } from "@chakra-ui/react";
import axios from "axios";
import PropTypes from "prop-types";

const apiUrl = import.meta.env.VITE_API_URL;

const ChatInput = ({ fetchMessages }) => {
  const [content, setContent] = useState("");
  const { colorMode } = useColorMode();

  const handleSubmit = async () => {
    if (!content) return;
    await axios.post(`${apiUrl}/messages`, {
      sender: "You",
      content,
      timestamp: new Date().toISOString(),
      type: "text",
    });
    setContent("");
    fetchMessages();
  };

  return (
    <Box display="flex" p={6} bg={colorMode === "light" ? "white" : "gray.900"} borderTop="1px solid" borderColor={colorMode === "light" ? "gray.300" : "gray.700"}>
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message..."
        borderRadius="20px"
        bg={colorMode === "light" ? "gray.100" : "gray.700"}
      />
      <Button ml={2} onClick={handleSubmit} bg="green.500" color="white">
        Send
      </Button>
    </Box>
  );
};

ChatInput.propTypes = {
  fetchMessages: PropTypes.func.isRequired,
};

export default ChatInput;
