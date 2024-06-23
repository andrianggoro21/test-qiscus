import { Box, Text, Image, useColorMode } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Message = ({ message }) => {
    const { colorMode } = useColorMode();
  const isSentByCurrentUser = message.sender === "You";

  const renderContent = () => {
    switch (message.type) {
      case "text":
        return <Text>{message.content}</Text>;
      case "image":
        return <Image src={message.url} alt="Image" />;
      case "video":
        return (
          <video width="320" height="240" controls>
            <source src={message.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case "pdf":
        return (
          <a href={message.url} target="_blank" rel="noopener noreferrer">
            Open PDF
          </a>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      m={2}
      bg={isSentByCurrentUser ? (colorMode === "light" ? "green.100" : "green.700") : (colorMode === "light" ? "blue.100" : "blue.700")}
      alignSelf={isSentByCurrentUser ? "flex-end" : "flex-start"}
      maxW="70%"
    >
      <Text fontWeight="bold">{message.sender}</Text>
      {renderContent()}
      <Text fontSize="sm" color="gray.500">
        {new Date(message.timestamp).toLocaleString()}
      </Text>
    </Box>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.string.isRequired,
    content: PropTypes.string,
    url: PropTypes.string,
    sender: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  }).isRequired,
};

export default Message;
