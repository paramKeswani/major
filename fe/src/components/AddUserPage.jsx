import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  Input,
  Stack,
  useToast,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Box,
  Container,
} from "@chakra-ui/react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";

const AddUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [missingDate, setMissingDate] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  const handleAddUser = () => {
    if (!name || !email || !phoneNumber || !dob || !missingDate || !aadhaarNumber) {
      toast({
        title: "Error",
        description: "All fields are required.",
        status: "error",
        duration: 3000,
        position: "top-right",
      });
      return;
    }
    axios
      .post("http://localhost:5000/add-user", {
        name,
        email,
        phoneNumber,
        dob,
        missingDate,
        aadhaarNumber,
      })
      .then((response) => {
        console.log(response.data);
        toast({
          title: "Success",
          description: "User added successfully!",
          status: "success",
          duration: 3000,
          position: "top-right",
        });
        setTimeout(() => {
          navigate("/capture-train");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        toast({
          title: "Error",
          description: "Failed to add user. Please try again later.",
          status: "error",
          duration: 3000,
          position: "top-right",
        });
      });
  };

  const handleGuestFill = () => {
    setName("Guest");
    setEmail("guest@@gmail.com");
    setPhoneNumber("1234567890");
    setDob("2003-15-05");
    setMissingDate("2024-10-14");
    setAadhaarNumber("123456789012");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Box bg="gray.900" minHeight="100vh" color="white">
      <Container maxW="container.md" centerContent py={8}>
        <IconButton
          icon={<ArrowBackIcon />}
          aria-label="Back"
          onClick={handleBack}
          position="absolute"
          top={6}
          left={6}
          colorScheme="purple"
        />
        <VStack spacing={6} align="stretch" width="full">
          <Heading as="h2" size="xl" textAlign="center" color="purple.300">
            Add User
          </Heading>
          <FormControl>
            <FormLabel htmlFor="name">Name:</FormLabel>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              bg="gray.700"
              borderColor="gray.600"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="gray.700"
              borderColor="gray.600"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="phoneNumber">Phone Number:</FormLabel>
            <Input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              bg="gray.700"
              borderColor="gray.600"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="dob">Date of Birth:</FormLabel>
            <Input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              bg="gray.700"
              borderColor="gray.600"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="missingDate">Date of Missing:</FormLabel>
            <Input
              type="date"
              id="missingDate"
              value={missingDate}
              onChange={(e) => setMissingDate(e.target.value)}
              bg="gray.700"
              borderColor="gray.600"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="aadhaarNumber">Aadhaar Number:</FormLabel>
            <Input
              type="number"
              id="aadhaarNumber"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value)}
              bg="gray.700"
              borderColor="gray.600"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="image">Upload image:</FormLabel>
            <Input
              type="file"
              id="image"
              bg="gray.700"
              borderColor="gray.600"
              p={1}
            />
          </FormControl>
          <Stack direction="row" spacing={4} justify="center">
            <Button onClick={handleAddUser} colorScheme="purple">
              Add User
            </Button>
            <Button onClick={handleGuestFill} variant="outline" colorScheme="purple">
              Guest
            </Button>
          </Stack>
        </VStack>
      </Container>
    </Box>
  );
};

export default AddUserPage;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Button,
//   Input,
//   Stack,
//   useToast, // Import useToast hook from Chakra UI
// } from "@chakra-ui/react";
// import axios from "axios"; // Import Axios for making HTTP requests
// import "../App.css";

// const AddUserPage = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [dob, setDob] = useState("");
//   const [missingDate, setMissingDate] = useState("");
//   const [aadhaarNumber, setAadhaarNumber] = useState("");

//   const navigate = useNavigate();
//   const toast = useToast(); // Initialize the useToast hook

//   const handleAddUser = () => {
//     // Check if any field is empty
//     if (
//       !name ||
//       !email ||
//       !phoneNumber ||
//       !dob ||
//       !missingDate ||
//       !aadhaarNumber
//     ) {
//       // Display toast message if any field is empty
//       toast({
//         title: "Error",
//         description: "All fields are required.",
//         status: "error",
//         duration: 3000,
//         position: "top-right",
//       });
//       return; // Exit function if any field is empty
//     }
//     axios
//       .post("http://localhost:5000/add-user", {
//         name,
//         email,
//         phoneNumber,
//         dob,
//         missingDate,
//         aadhaarNumber,
//       })
//       .then((response) => {
//         console.log(response.data);
//         toast({
//           title: "Success",
//           description: "User added successfully!",
//           status: "success",
//           duration: 3000,
//           position: "top-right",
//         });
//         setTimeout(() => {
//           navigate("/capture-train");
//         }, 1000);
//       })
//       .catch((error) => {
//         console.error("Error adding user:", error);
//         toast({
//           title: "Error",
//           description: "Failed to add user. Please try again later.",
//           status: "error",
//           duration: 3000,
//           position: "top-right",
//         });
//       });
//   };

//   return (
//     <div className="adduser-container">
//       <h2>Add User</h2>
//       <label htmlFor="name">Name:</label>
//       <Input
//         type="text"
//         id="name"
//         className="adduser-input"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <label htmlFor="email">Email:</label>
//       <Input
//         type="email"
//         id="email"
//         className="adduser-input"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <label htmlFor="phoneNumber">Phone Number:</label>
//       <Input
//         type="tel"
//         id="phoneNumber"
//         className="adduser-input"
//         value={phoneNumber}
//         onChange={(e) => setPhoneNumber(e.target.value)}
//       />
//       <label htmlFor="dob">Date of Birth:</label>
//       <Input
//         type="date"
//         id="dob"
//         className="adduser-input"
//         value={dob}
//         onChange={(e) => setDob(e.target.value)}
//       />
//       <label htmlFor="missingDate">Date of Missing:</label>
//       <Input
//         type="date"
//         id="missingDate"
//         className="adduser-input"
//         value={missingDate}
//         onChange={(e) => setMissingDate(e.target.value)}
//       />
//       <label htmlFor="aadhaarNumber">Aadhaar Number:</label>
//       <Input
//         type="number"
//         id="aadhaarNumber"
//         className="adduser-input"
//         value={aadhaarNumber}
//         onChange={(e) => setAadhaarNumber(e.target.value)}
//       />
//       {/* <Button onClick={handleAddUser}>Add User</Button> */}
//       <button className="adduser-button" onClick={handleAddUser}>
//         Add User
//       </button>
//     </div>
//   );
// };

// export default AddUserPage;
