import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex, Text, IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import Message from "../components/Message";
import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";

const apiUrl = import.meta.env.VITE_API_URL;

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();

  const fetchMessages = async () => {
    const response = await axios.get(`${apiUrl}/messages`);
    setMessages(response.data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleUserClick = (user) => {
    setCurrentUser(user);
  };

  const filteredMessages = currentUser
    ? messages.filter(
        (message) =>
          message.sender === currentUser.sender || message.sender === "You"
      )
    : [];

  const uniqueUsers = [
    ...new Map(
      messages.map((message) => [
        message.sender,
        { id: message.id, sender: message.sender },
      ])
    ).values(),
  ];

  return (
    <Flex height="100vh" overflow="hidden">
      <Sidebar users={uniqueUsers} onUserClick={handleUserClick} />
      <Box flex="1" display="flex" flexDirection="column">
        <Flex
          p={4}
          borderBottom="1px solid"
          borderColor={colorMode === "light" ? "gray.300" : "gray.700"}
          bg={colorMode === "light" ? "gray.100" : "gray.900"}
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontWeight="bold">
            {currentUser ? currentUser.sender : "Select a user to start chatting"}
          </Text>
          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            aria-label="Toggle Color Mode"
          />
        </Flex>
        <Box flex="1" p={4} overflowY="auto" bg={colorMode === "light" ? "white" : "gray.800"}>
          {currentUser ? (
            filteredMessages.map((message) => (
              <Message key={message.id} message={message} />
            ))
          ) : (
            <Box textAlign="center" color="gray.500">
              Select a user to start chatting
            </Box>
          )}
        </Box>
        {currentUser && <ChatInput fetchMessages={fetchMessages} />}
      </Box>
    </Flex>
  );
};

export default ChatPage;
