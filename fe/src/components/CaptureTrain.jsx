import React, { useState } from "react";
import {
  Container,
  Stack,
  Text,
  Button,
  Image,
  useToast,
  IconButton,
  Spinner,
  Box,
  Heading,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

const CaptureTrainPage = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleCaptureDataset = () => {
    setLoading(true);
    axios
      .post("http://localhost:5000/capture-dataset")
      .then((response) => {
        console.log(response.data.message);
        toast({
          title: "Capture Success",
          description: "Images captured successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        window.scrollTo(0, document.body.scrollHeight);
      })
      .catch((error) => {
        console.error("Error capturing dataset:", error);
        toast({
          title: "Capture Error",
          description: "An error occurred while capturing images.",
          status: "error",
          duration: 3000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleTrainModel = () => {
    setLoading(true);
    axios
      .post("http://localhost:5000/train-model")
      .then((response) => {
        console.log(response.data.message);
        toast({
          title: "Success",
          description: "Model trained successfully.",
          status: "success",
          duration: 2000,
        });
        setTimeout(() => {
          navigate("/face-recognition");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error training model:", error);
        toast({
          title: "Error",
          description: "An error occurred while training the model.",
          status: "error",
          duration: 3000,
          isClosable: true,
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
      {/* Capture section */}
      <Container maxW="6xl" px={{ base: 6, md: 3 }} py={119} pt="163px">
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
              Capture
            </Heading>
            <Text fontSize="1.2rem" lineHeight="1.375" color="gray.300">
              This process will capture 300 images of your face. The captured
              images will be used to train a machine learning model to
              recognize facial features and expressions.
            </Text>
            <Button
              colorScheme="purple"
              size="lg"
              rounded="md"
              onClick={handleCaptureDataset}
            >
              Capture Dataset
            </Button>
          </VStack>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK038LcHXogO1Bw9VKPwY7ohtgS4Tfbcoln81Pn5fDjSwSsd8Pv04Mwj2uU22PRgXs3qQ&usqp=CAU"
            alt="Capture Image"
            w={{ base: "100%", md: "45%" }}
            h="auto"
            objectFit="cover"
            borderRadius="md"
          />
        </Stack>
      </Container>

      {/* Train section */}
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
              <Heading as="h2" fontSize="5xl" lineHeight={1} color="purple.300">
                Train Model
              </Heading>
              <Text fontSize="1.2rem" lineHeight="1.375" color="gray.300">
                The training process involves using machine learning algorithms
                to analyze and learn patterns from a dataset. This dataset
                typically consists of labeled examples that the model uses to
                adjust its internal parameters and improve its performance.
              </Text>
              <Button
                colorScheme="purple"
                size="lg"
                rounded="md"
                onClick={handleTrainModel}
              >
                Train Model
              </Button>
            </VStack>
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc8KdMo6ziodug34pr1U5zjceZ1i50N-M-jwtBxQAWTJBsFqsklOM-gVAFiKLBZY-1ZrM&usqp=CAU"
              alt="Train Image"
              w={{ base: "100%", md: "50%" }}
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

export default CaptureTrainPage;