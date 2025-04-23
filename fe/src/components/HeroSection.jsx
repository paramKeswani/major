import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon, UsersIcon, HeartIcon } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <Box bg="gray.800" p={6} borderRadius="lg">
    <Icon size={48} color="#B794F4" />
    <Heading as="h3" size="md" mt={4} mb={2} color="white">
      {title}
    </Heading>
    <Text color="gray.300">{description}</Text>
  </Box>
);

const HeroSection = () => {
  return (
    <Box bg="gray.900" minHeight="100vh" color="white">
      <Container maxW="container.xl" centerContent py={16}>
        <VStack spacing={12} align="center" textAlign="center">
          <Heading
            as="h1"
            size="3xl"
            color="purple.300"
            fontWeight="bold"
            lineHeight="1.2"
          >
            Reuniting Families in the Dark
          </Heading>
          <Text fontSize="xl" color="gray.300" maxW="3xl">
            RescueReady harnesses the power of AI and ML to illuminate the path
            home for missing individuals across India. In the darkest times, we
            bring light and hope.
          </Text>
          <a href="/add-user">
          <Button
            rightIcon={<SearchIcon />}
            colorScheme="purple"
            size="lg"
            rounded="full"
            px={8}
          >
            Begin Your Search
          </Button>
          </a>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} width="full">
            <FeatureCard
              icon={SearchIcon}
              title="AI-Powered Search"
              description="Our advanced algorithms scan vast databases to find matches and connections."
            />
            <FeatureCard
              icon={UsersIcon}
              title="United Community"
              description="Join a network of supporters to amplify your search efforts and reach."
            />
            <FeatureCard
              icon={HeartIcon}
              title="Empathetic Support"
              description="Access counseling and resources to guide you through challenging times."
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default HeroSection;