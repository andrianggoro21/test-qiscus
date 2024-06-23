import { useState } from "react";
import { Input, Button, Box } from "@chakra-ui/react";
import axios from "axios";
import PropTypes from "prop-types";

const apiUrl = import.meta.env.VITE_API_URL;

const ChatInput = ({ fetchMessages }) => {
  const [content, setContent] = useState("");

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
    <Box display="flex" p={2}>
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message..."
      />
      <Button ml={2} onClick={handleSubmit}>
        Send
      </Button>
    </Box>
  );
};

ChatInput.propTypes = {
  fetchMessages: PropTypes.func.isRequired,
};

export default ChatInput;
