import React, { useState } from "react";
import { Container, VStack, Input, Button, Text, useToast, Spinner } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSendSMS = async () => {
    if (!phoneNumber) {
      toast({
        title: "Error",
        description: "Please enter a phone number.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://your-backend-api.com/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "SMS sent successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to send SMS.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while sending the SMS.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Send SMS to Get Geolocation</Text>
        <Input placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} size="md" />
        <Button leftIcon={<FaPaperPlane />} colorScheme="teal" onClick={handleSendSMS} isLoading={loading} loadingText="Sending">
          Send SMS
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
