import { Box, Flex, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="blue.500" px={4} py={2}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box color="white" fontWeight="bold" fontSize="xl">
          Task Buddy
        </Box>
        <Flex alignItems="center">
          <NavLink to="/" style={{ marginRight: "1rem", color: "white" }}>
            Home
          </NavLink>
          <NavLink to="/board" style={{ color: "white" }}>
            Board
          </NavLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;