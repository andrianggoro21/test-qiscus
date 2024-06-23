import { Box, VStack, useColorMode } from "@chakra-ui/react";
import PropTypes from "prop-types";
import UserItem from "./UserItem";

const Sidebar = ({ users, onUserClick }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      w="300px"
      p={2}
      borderRight="1px solid"
      borderColor={colorMode === "light" ? "gray.300" : "gray.700"}
      bg={colorMode === "light" ? "gray.50" : "gray.900"}
      overflowY="auto"
    >
      <VStack spacing={2}>
        {users.map((user) => (
          <UserItem key={user.id} user={user} onClick={() => onUserClick(user)} />
        ))}
      </VStack>
    </Box>
  );
};

Sidebar.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUserClick: PropTypes.func.isRequired,
};

export default Sidebar;
