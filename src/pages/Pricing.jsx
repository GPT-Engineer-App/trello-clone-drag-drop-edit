import { Box, Button, Container, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";

const Pricing = () => {
  const tiers = [
    {
      title: "Basic",
      price: "$10/month",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      title: "Standard",
      price: "$20/month",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    },
    {
      title: "Premium",
      price: "$30/month",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    },
  ];

  return (
    <Container maxW="container.xl" py={10}>
      <Heading as="h1" size="2xl" textAlign="center" mb={10}>
        Pricing Plans
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {tiers.map((tier, index) => (
          <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} textAlign="center">
            <Heading as="h2" size="xl" mb={4}>
              {tier.title}
            </Heading>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              {tier.price}
            </Text>
            <VStack spacing={3} mb={6}>
              {tier.features.map((feature, idx) => (
                <Text key={idx}>{feature}</Text>
              ))}
            </VStack>
            <Button colorScheme="blue" size="lg">
              Choose Plan
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Pricing;