// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Flex,
//   Text,
//   IconButton,
//   useColorMode,
//   Image,
// } from "@chakra-ui/react";
// import { SunIcon, MoonIcon } from "@chakra-ui/icons";
// import Message from "../components/Message";
// import Sidebar from "../components/Sidebar";
// import ChatInput from "../components/ChatInput";

// const apiUrl = import.meta.env.VITE_API_URL;

// const ChatPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [participants, setParticipants] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [currentGroup, setCurrentGroup] = useState(null);
//   const [groups, setGroups] = useState([]);
//   const [currentGroupImageUrl, setCurrentGroupImageUrl] = useState("");
//   const { colorMode, toggleColorMode } = useColorMode();

//   const fetchMessages = async () => {
//     const response = await axios.get(`${apiUrl}/messages`);
//     const data = response.data.results;
//     const messages = data.comments.map((comment) => ({
//       id: comment.id,
//       sender: data.room.participant.find(
//         (participant) => participant.id === comment.sender
//       ).name,
//       content: comment.message,
//       type: comment.type,
//       timestamp: comment.timestamp || new Date().toISOString(),
//     }));
//     setMessages(messages);
//     setParticipants(data.room.participant);
//     setGroups([
//       {
//         id: data.room.id,
//         name: data.room.name,
//         image_url: data.room.image_url,
//       },
//     ]);
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   const handleUserClick = (user) => {
//     setCurrentUser(user);
//     setCurrentGroup(null); // Reset current group when user is clicked
//   };

//   const handleGroupClick = (group) => {
//     setCurrentGroup(group);
//     setCurrentGroupImageUrl(group.image_url); // Set current group image url
//     setCurrentUser(null); // Reset current user when group is clicked
//   };

//   const filteredMessages = currentUser
//     ? messages.filter(
//         (message) =>
//           message.sender === currentUser.name || message.sender === "You"
//       )
//     : currentGroup
//     ? messages // Display messages for the current group
//     : [];

//   return (
//     <Flex height="100vh" overflow="hidden">
//       <Sidebar
//         participants={participants}
//         onUserClick={handleUserClick}
//         onGroupClick={handleGroupClick}
//         groups={groups}
//       />
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
//             {currentUser
//               ? currentUser.name
//               : currentGroup
//               ? currentGroup.name
//               : "Select a user or group to start chatting"}
//           </Text>
//           <IconButton
//             icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
//             onClick={toggleColorMode}
//             variant="ghost"
//             aria-label="Toggle Color Mode"
//           />
//         </Flex>
//         <Box
//           flex="1"
//           p={4}
//           overflowY="auto"
//           bg={colorMode === "light" ? "white" : "gray.800"}
//         >
//           {currentGroup && (
//             <Image src={currentGroupImageUrl} alt="Group" p={2} mb={2} />
//           )}
//           {currentUser || currentGroup ? (
//             filteredMessages.map((message) => (
//               <Message key={message.id} message={message} />
//             ))
//           ) : (
//             <Box textAlign="center" color="gray.500">
//               Select a user or group to start chatting
//             </Box>
//           )}
//         </Box>
//         {(currentUser || currentGroup) && (
//           <ChatInput fetchMessages={fetchMessages} />
//         )}
//       </Box>
//     </Flex>
//   );
// };

// export default ChatPage;

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Text,
  IconButton,
  useColorMode,
  Image,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, HamburgerIcon } from "@chakra-ui/icons";
import Message from "../components/Message";
import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";

const apiUrl = import.meta.env.VITE_API_URL;

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  const [currentGroupImageUrl, setCurrentGroupImageUrl] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchMessages = async () => {
    const response = await axios.get(`${apiUrl}/messages`);
    const data = response.data.results;
    const messages = data.comments.map((comment) => ({
      id: comment.id,
      sender: data.room.participant.find(
        (participant) => participant.id === comment.sender
      ).name,
      content: comment.message,
      type: comment.type,
      timestamp: comment.timestamp || new Date().toISOString(),
    }));
    setMessages(messages);
    setParticipants(data.room.participant);
    setGroups([
      {
        id: data.room.id,
        name: data.room.name,
        image_url: data.room.image_url,
      },
    ]);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleUserClick = (user) => {
    setCurrentUser(user);
    setCurrentGroup(null);
    onClose();
  };

  const handleGroupClick = (group) => {
    setCurrentGroup(group);
    setCurrentGroupImageUrl(group.image_url);
    setCurrentUser(null);
    onClose();
  };

  const filteredMessages = currentUser
    ? messages.filter(
        (message) =>
          message.sender === currentUser.name || message.sender === "You"
      )
    : currentGroup
    ? messages
    : [];

  return (
    <Flex height="100vh" overflow="hidden">
      <Box
        display={{ base: "none", md: "block" }}
        w="300px"
        p={2}
        borderRight="1px solid"
        borderColor={colorMode === "light" ? "gray.300" : "gray.700"}
        bg={colorMode === "light" ? "gray.50" : "gray.900"}
        overflowY="auto"
      >
        <Sidebar
          participants={participants}
          onUserClick={handleUserClick}
          onGroupClick={handleGroupClick}
          groups={groups}
        />
      </Box>
      <Box flex="1" display="flex" flexDirection="column">
        <Flex
          p={4}
          borderBottom="1px solid"
          borderColor={colorMode === "light" ? "gray.300" : "gray.700"}
          bg={colorMode === "light" ? "gray.100" : "gray.900"}
          alignItems="center"
          justifyContent="space-between"
        >
          <IconButton
            display={{ base: "block", md: "none" }}
            icon={<HamburgerIcon />}
            onClick={onOpen}
            variant="ghost"
            aria-label="Open Menu"
          />
          <Text fontWeight="bold">
            {currentUser
              ? currentUser.name
              : currentGroup
              ? currentGroup.name
              : "Select a user or group to start chatting"}
          </Text>
          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            aria-label="Toggle Color Mode"
          />
        </Flex>
        <Box
          flex="1"
          p={4}
          overflowY="auto"
          bg={colorMode === "light" ? "white" : "gray.800"}
        >
          {currentGroup && (
            <Image src={currentGroupImageUrl} alt="Group" p={2} mb={2} />
          )}
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
        {(currentUser || currentGroup) && (
          <ChatInput fetchMessages={fetchMessages} />
        )}
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader
              bg={colorMode === "light" ? "gray.100" : "gray.900"}
              p={8}
            ></DrawerHeader>
            <DrawerBody bg={colorMode === "light" ? "gray.100" : "gray.900"}>
              <Sidebar
                participants={participants}
                onUserClick={handleUserClick}
                onGroupClick={handleGroupClick}
                groups={groups}
              />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
  );
};

export default ChatPage;
