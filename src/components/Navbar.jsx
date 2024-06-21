import { Box, Flex, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, useDisclosure, Input, InputGroup, InputRightElement, useColorMode, Button } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    navigate(`/board?search=${query}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
    navigate(`/board?search=`);
  };

  return (
    <Box bg={colorMode === "light" ? "blue.500" : "gray.900"} px={4} py={2}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          icon={<HamburgerIcon />}
          variant="outline"
          color="white"
          onClick={onOpen}
          aria-label="Open Menu"
          mr={2}
        />
        <Box color="white" fontWeight="bold" fontSize="xl">
          Task Buddy
        </Box>
        <Flex alignItems="center">
          <InputGroup size="md" width="200px" mr={4}>
            <Input
              pr="2.5rem"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              bg="rgba(255, 255, 255, 0.5)"
              border="2px solid #3182ce"
              outline="none"
              boxShadow="none"
              _focus={{ border: "2px solid #3182ce" }}
              _hover={{ border: "2px solid #3182ce" }}
            />
            {searchQuery && (
              <InputRightElement width="2.5rem">
                <IconButton
                  h="1.25rem"
                  size="xs"
                  icon={<CloseIcon boxSize={2} />}
                  onClick={clearSearch}
                  aria-label="Clear search"
                  color="gray.500"
                  bg="transparent"
                  _hover={{ color: "gray.700" }}
                />
              </InputRightElement>
            )}
          </InputGroup>
          <NavLink to="/" style={{ marginRight: "1rem", color: "white" }}>
            Home
          </NavLink>
          <NavLink to="/pricing" style={{ marginRight: "1rem", color: "white" }}>
            Pricing
          </NavLink>
          <NavLink to="/board" style={{ color: "white" }}>
            Board
          </NavLink>
          <Button onClick={toggleColorMode} ml={4}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <NavLink to="/" onClick={onClose} style={{ display: "block", marginBottom: "1rem" }}>
              Home
            </NavLink>
            <NavLink to="/pricing" onClick={onClose} style={{ display: "block", marginBottom: "1rem" }}>
              Pricing
            </NavLink>
            <NavLink to="/board" onClick={onClose} style={{ display: "block" }}>
              Board
            </NavLink>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;