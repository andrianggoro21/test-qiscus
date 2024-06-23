import { Box, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import UserItem from "./UserItem";
import GroupItem from "./GroupItem"; // Import GroupItem

const Sidebar = ({ participants, onUserClick, onGroupClick, groups }) => {
  return (
    <Box>
      <VStack spacing={2}>
        {groups.map((group) => (
          <GroupItem
            key={group.id}
            group={group}
            onClick={() => onGroupClick(group)}
          />
        ))}
        {participants.map((participant) => (
          <UserItem
            key={participant.id}
            participant={participant}
            onClick={() => onUserClick(participant)}
          />
        ))}
      </VStack>
    </Box>
  );
};

Sidebar.propTypes = {
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUserClick: PropTypes.func.isRequired,
  onGroupClick: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Sidebar;
