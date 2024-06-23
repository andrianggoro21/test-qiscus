import { Text, Avatar, Flex, useColorMode } from "@chakra-ui/react";
import PropTypes from "prop-types";

const UserItem = ({ user, onClick }) => {
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
      <Avatar name={user.sender} mr={3} />
      <Text fontWeight="bold">{user.sender}</Text>
    </Flex>
  );
};

UserItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default UserItem;
