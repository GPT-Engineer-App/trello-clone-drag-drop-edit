import { useState } from "react";
import { Box, Flex, Link, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

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
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
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