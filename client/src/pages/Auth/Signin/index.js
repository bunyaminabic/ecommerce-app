import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import validations from "./validations";
import { useAuth } from "../../../contexts/AuthContext";

function Signin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [inputError, setInputError] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    if (userLoggedIn) {
      console.log("Kullanıcı kaydoldu:", email);
      fetchUserData();
    }
  }, [userLoggedIn, email]);

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const email = user.email;
        console.log("Kullanıcı bilgileri:", [{ uid, email }]);
      }
    } catch (error) {
      console.error("Kullanıcı bilgileri alınırken bir hata oluştu:", error);
    }
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await validations.validate({ email, password });
        await signInWithEmailAndPassword(auth, email, password);
        login({ user: { email } });

        setUserLoggedIn(true);
        navigate("/profile");
      } catch (error) {
        setError(error.message);
        setInputError({ [error.path]: true });
      }
    },
    [email, password, login]
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
      }
    },
    [error, inputError]
  );

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sign In</Heading>
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

                <Button mt={4} width="full" type="submit">
                  Sign In
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

export default Signin;
