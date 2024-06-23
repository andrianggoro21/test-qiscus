import { Text, Avatar, Flex, useColorMode } from "@chakra-ui/react";
import PropTypes from "prop-types";

const GroupItem = ({ group, onClick }) => {
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
      <Avatar name={group.name} mr={3} />
      <Text fontWeight="bold">{group.name}</Text>
    </Flex>
  );
};

GroupItem.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GroupItem;
