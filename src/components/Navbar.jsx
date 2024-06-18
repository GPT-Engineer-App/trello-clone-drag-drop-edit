import { Box, Flex, Link, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, useDisclosure } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="blue.500" px={4} py={2}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          icon={<FaBars />}
          color="white"
          variant="outline"
          onClick={onOpen}
          aria-label="Open Menu"
        />
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

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody>
              <NavLink to="/" onClick={onClose} style={{ display: "block", marginBottom: "1rem" }}>
                Home
              </NavLink>
              <NavLink to="/board" onClick={onClose} style={{ display: "block", marginBottom: "1rem" }}>
                Board
              </NavLink>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default Navbar;