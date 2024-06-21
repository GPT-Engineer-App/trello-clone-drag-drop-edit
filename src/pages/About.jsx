import { Box, Heading, Text, VStack, useColorMode } from "@chakra-ui/react";

const About = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={colorMode === "light" ? "white" : "gray.800"}
      color={colorMode === "light" ? "black" : "white"}
      minHeight="100vh"
      p={4}
    >
      <VStack spacing={4} align="start">
        <Heading as="h1" size="2xl">
          About Us
        </Heading>
        <Text fontSize="lg">
          Welcome to our application! We are dedicated to providing the best service possible.
        </Text>
        <Text fontSize="md">
          Our team is composed of experienced professionals who are passionate about what they do.
        </Text>
        <Text fontSize="md">
          We believe in continuous improvement and always strive to exceed our customers' expectations.
        </Text>
        <Text fontSize="md">
          Thank you for choosing our application. We hope you have a great experience!
        </Text>
      </VStack>
    </Box>
  );
};

export default About;