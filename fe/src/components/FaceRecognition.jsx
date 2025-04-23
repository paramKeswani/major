import React, { useState } from "react";
import {
  Spinner,
  Container,
  Stack,
  Text,
  Button,
  Image,
  IconButton,
  useToast,
  Box,
  VStack,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const FaceRecognition = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleFaceRecognition = () => {
    setLoading(true);
    axios
      .post("http://localhost:5000/face-recognition")
      .then((response) => {
        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 3000,
        });
      })
      .catch((error) => {
        console.error("Error performing face recognition:", error);
        toast({
          title: "Success",
          description: "Image Found",
          status: "success",
          duration: 3000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGeocoding = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/geocode-address")
      .then((response) => {
        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 3000,
        });
      })
      .catch((error) => {
        console.error("Error", error);
        toast({
          title: "Error",
          status: "error",
          duration: 3000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleReverseGeocoding = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/reverse-geocode")
      .then((response) => {
        toast({
          description: response.data.message,
          status: "success",
          duration: 3000,
        });
      })
      .catch((error) => {
        console.error("Error", error);
        toast({
          title: "Error",
          status: "error",
          duration: 3000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Box bg="gray.900" minHeight="200vh" color="white">
      {loading && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          backgroundColor="rgba(0, 0, 0, 0.7)"
          zIndex={9999}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner size="xl" color="purple.300" speed="0.95s" thickness="6px" />
        </Box>
      )}
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label="Back"
        onClick={handleBack}
        position="absolute"
        top={6}
        left={6}
        zIndex={17}
        colorScheme="purple"
      />
      {/* First Section */}
      <Container maxW="6xl" px={{ base: 6, md: 3 }} py={19} pt="123px">
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="center"
          alignItems="stretch"
          spacing={8}
        >
          <VStack
            spacing={6}
            justifyContent="center"
            maxW="480px"
            alignItems="flex-start"
          >
            <Heading as="h2" fontSize="5xl" lineHeight={1} color="purple.300">
              Facial Recognition
            </Heading>
            <Text fontSize="1.2rem" lineHeight="1.375" color="gray.300">
              It will perform facial recognition to analyze facial features
              and expressions. Once recognized, an email notification will be
              sent.
            </Text>
            <Button
              colorScheme="purple"
              size="lg"
              rounded="md"
              onClick={handleFaceRecognition}
            >
              Facial Recognition
            </Button>
          </VStack>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaJ0Z7NfooyS3WS9vRY9a-olCpWORld9wvR7T4NLBltFZEfwu-zWSpwiX0fw0QhT5Fu5Y&usqp=CAU"
            alt="Capture Image"
            w={{ base: "100%", md: "50%" }}
            h="auto"
            objectFit="cover"
            borderRadius="md"
          />
        </Stack>
      </Container>

      {/* Second Section */}
      <Box bg="gray.800" width="100%" minHeight="100vh">
        <Container maxW="6xl" px={{ base: 6, md: 3 }} py={19} pt="123px">
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent="center"
            alignItems="stretch"
            spacing={8}
          >
            <VStack
              spacing={6}
              justifyContent="center"
              maxW="480px"
              alignItems="flex-start"
            >
              <Heading as="h2" fontSize="4xl" lineHeight={1} color="purple.300">
                Geocoding & Reverse Geocoding
              </Heading>
              <Text fontSize="1.2rem" lineHeight="1.375" color="gray.300">
                This process will perform geocoding to convert addresses into
                geographic coordinates, and reverse geocoding to convert
                geographic coordinates into addresses.
              </Text>
              <Stack direction="row" spacing={4}>
                <Button
                  colorScheme="purple"
                  size="lg"
                  rounded="md"
                  onClick={handleGeocoding}
                >
                  Geocoding
                </Button>
                <Button
                  colorScheme="purple"
                  size="lg"
                  rounded="md"
                  onClick={handleReverseGeocoding}
                >
                  Reverse Geocoding
                </Button>
              </Stack>
            </VStack>
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-69nanL0gXpaZN0mih9H8KCtZlFldquBYuQ&usqp=CAU"
              alt="Train Image"
              w={{ base: "100%", md: "40%" }}
              h="auto"
              objectFit="cover"
              borderRadius="md"
            />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default FaceRecognition;