import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import Message from "../components/Message";
import ChatInput from "../components/ChatInput";

const apiUrl = import.meta.env.VITE_API_URL;

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const response = await axios.get(`${apiUrl}/messages`);
    setMessages(response.data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <Box p={4}>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <ChatInput fetchMessages={fetchMessages} />
    </Box>
  );
};

export default ChatPage;
