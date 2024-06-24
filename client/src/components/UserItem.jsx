import { Text, Avatar, Flex, useColorMode } from "@chakra-ui/react";
import PropTypes from "prop-types";

const UserItem = ({ participant, onClick }) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      p={2}
      w="100%"
      alignItems="center"
      borderRadius="md"
      bg={colorMode === "light" ? "white" : "gray.700"}
      boxShadow="sm"
      cursor="pointer"
      _hover={{ bg: colorMode === "light" ? "gray.100" : "gray.600" }}
      onClick={onClick}
    >
      <Avatar name={participant.name} mr={3} />
      <Text fontWeight="bold">{participant.name}</Text>
    </Flex>
  );
};

UserItem.propTypes = {
  participant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default UserItem;

