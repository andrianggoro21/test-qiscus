// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Box, Flex, Text, IconButton, useColorMode } from "@chakra-ui/react";
// import { SunIcon, MoonIcon } from "@chakra-ui/icons";
// import Message from "../components/Message";
// import Sidebar from "../components/Sidebar";
// import ChatInput from "../components/ChatInput";

// const apiUrl = import.meta.env.VITE_API_URL;

// const ChatPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [participants, setParticipants] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   const { colorMode, toggleColorMode } = useColorMode();

//   const fetchMessages = async () => {
//     const response = await axios.get(`${apiUrl}/messages`);
//     console.log(response);
//     const data = response.data.results;
//     const messages = data.comments.map(comment => ({
//       id: comment.id,
//       sender: data.room.participant.find(participant => participant.id === comment.sender).name,
//       content: comment.message,
//       type: comment.type,
//       timestamp: comment.timestamp || new Date().toISOString(),
//     }));
//     setMessages(messages);
//     setParticipants(data.room.participant);
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   const handleUserClick = (user) => {
//     setCurrentUser(user);
//   };

//   const filteredMessages = currentUser
//     ? messages.filter(
//         (message) =>
//           message.sender === currentUser.name || message.sender === "You"
//       )
//     : [];

//   return (
//     <Flex height="100vh" overflow="hidden">
//       <Sidebar participants={participants} onUserClick={handleUserClick} />
//       <Box flex="1" display="flex" flexDirection="column">
//         <Flex
//           p={4}
//           borderBottom="1px solid"
//           borderColor={colorMode === "light" ? "gray.300" : "gray.700"}
//           bg={colorMode === "light" ? "gray.100" : "gray.900"}
//           alignItems="center"
//           justifyContent="space-between"
//         >
//           <Text fontWeight="bold">
//             {currentUser ? currentUser.name : "Select a user to start chatting"}
//           </Text>
//           <IconButton
//             icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
//             onClick={toggleColorMode}
//             variant="ghost"
//             aria-label="Toggle Color Mode"
//           />
//         </Flex>
//         <Box flex="1" p={4} overflowY="auto" bg={colorMode === "light" ? "white" : "gray.800"}>
//           {currentUser ? (
//             filteredMessages.map((message) => (
//               <Message key={message.id} message={message} />
//             ))
//           ) : (
//             <Box textAlign="center" color="gray.500">
//               Select a user to start chatting
//             </Box>
//           )}
//         </Box>
//         {currentUser && <ChatInput fetchMessages={fetchMessages} />}
//       </Box>
//     </Flex>
//   );
// };

// export default ChatPage;

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
  const [participants, setParticipants] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null); // Add this line
  const { colorMode, toggleColorMode } = useColorMode();

  const fetchMessages = async () => {
    const response = await axios.get(`${apiUrl}/messages`);
    const data = response.data.results;
    const messages = data.comments.map(comment => ({
      id: comment.id,
      sender: data.room.participant.find(participant => participant.id === comment.sender).name,
      content: comment.message,
      type: comment.type,
      timestamp: comment.timestamp || new Date().toISOString(),
    }));
    setMessages(messages);
    setParticipants(data.room.participant);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleUserClick = (user) => {
    setCurrentUser(user);
    setCurrentGroup(null); // Reset current group when user is clicked
  };

  const handleGroupClick = (group) => {
    setCurrentGroup(group);
    setCurrentUser(null); // Reset current user when group is clicked
  };

  const filteredMessages = currentUser
    ? messages.filter(
        (message) =>
          message.sender === currentUser.name || message.sender === "You"
      )
    : currentGroup
    ? messages // Display messages for the current group
    : [];

  return (
    <Flex height="100vh" overflow="hidden">
      <Sidebar 
        participants={participants} 
        onUserClick={handleUserClick} 
        onGroupClick={handleGroupClick} // Add this line
        groups={[{ id: 1, name: "Product A" }]} // Example groups
      />
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
            {currentUser ? currentUser.name : currentGroup ? currentGroup.name : "Select a user or group to start chatting"}
          </Text>
          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            aria-label="Toggle Color Mode"
          />
        </Flex>
        <Box flex="1" p={4} overflowY="auto" bg={colorMode === "light" ? "white" : "gray.800"}>
          {currentUser || currentGroup ? (
            filteredMessages.map((message) => (
              <Message key={message.id} message={message} />
            ))
          ) : (
            <Box textAlign="center" color="gray.500">
              Select a user or group to start chatting
            </Box>
          )}
        </Box>
        {(currentUser || currentGroup) && <ChatInput fetchMessages={fetchMessages} />}
      </Box>
    </Flex>
  );
};

export default ChatPage;


