import React, { useState, useCallback } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import validations from "./validations";
import { useAuht } from "../../../contexts/AuthContext";

function Signup() {
  const { login } = useAuht();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState({});

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await validations.validate({ email, password, passwordConfirm });
        await createUserWithEmailAndPassword(
          auth,
          email,
          password,
          passwordConfirm
        );
        login({ user: { email } });
        alert("Kaydınız başarıyla tamamlandı!");
      } catch (error) {
        setError(error.message);
        setInputError({ [error.path]: true });
      }
    },
    [email, password, passwordConfirm, login]
  );

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputError({ ...inputError, [name]: false });
      if (error) setError("");
      switch (name) {
        case "email":
          setEmail(value);
          break;
        case "password":
          setPassword(value);
          break;
        case "passwordConfirm":
          setPasswordConfirm(value);
          break;
        default:
          break;
      }
    },
    [error, inputError]
  );

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sign Up</Heading>
            <Box my={5} textAlign="center">
              <form onSubmit={handleSubmit}>
                <FormControl isInvalid={inputError.email}>
                  <FormLabel>E-mail</FormLabel>
                  <Input
                    name="email"
                    onChange={handleInputChange}
                    value={email}
                  />
                </FormControl>
                <FormControl mt={4} isInvalid={inputError.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    name="password"
                    type="password"
                    onChange={handleInputChange}
                    value={password}
                  />
                </FormControl>
                <FormControl mt={4} isInvalid={inputError.passwordConfirm}>
                  <FormLabel>Password Confirm</FormLabel>
                  <Input
                    name="passwordConfirm"
                    type="password"
                    onChange={handleInputChange}
                    value={passwordConfirm}
                  />
                </FormControl>
                <Button mt={4} width="full" type="submit">
                  Sign Up
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
      </Flex>
      {error && (
        <Box mt={4} textAlign="center">
          <Text color="red">{error}</Text>
        </Box>
      )}
    </div>
  );
}

export default Signup;
