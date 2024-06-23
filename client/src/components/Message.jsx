/* eslint-disable no-useless-escape */
import { Box, Text, Image, useColorMode } from "@chakra-ui/react";
import PropTypes from "prop-types";

const imageUrl = import.meta.env.VITE_IMAGE_URL;

const Message = ({ message }) => {
  const { colorMode } = useColorMode();
  const isSentByCurrentUser = message.sender === "You";

  const renderContent = () => {
    let videoId;
    switch (message.type) {
      case "text":
        return <Text>{message.content}</Text>;
      case "image":
        return (
          <Image src={`${imageUrl}/${message.content}`} alt="Image" w={200} />
        );
      case "video":
        videoId = extractVideoId(message.content);
        if (videoId) {
          return (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          );
        } else {
          return null;
        }
      case "pdf":
        return (
          <a
            href={`${imageUrl}/${message.content}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {message.content}
          </a>
        );
      default:
        return null;
    }
  };

  const extractVideoId = (videoUrl) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = videoUrl.match(regex);
    return match && match[1];
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      m={2}
      bg={
        isSentByCurrentUser
          ? colorMode === "light"
            ? "green.100"
            : "green.700"
          : colorMode === "light"
          ? "blue.100"
          : "blue.700"
      }
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
