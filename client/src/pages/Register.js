import React, { useState } from "react";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Text,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { EmailIcon, ViewIcon, ViewOffIcon, LockIcon } from "@chakra-ui/icons";
import { Formik, Form, Field } from "formik";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { REGISTER } from "../graphql/mutations/register";
import { setToken } from "../graphql/config/auth";
import Fade from "react-reveal/Fade";
import { GET_LATEST_USERS } from "../graphql/queries/users";
import { client } from "../graphql/config/apolloClient";
import IsAuth from "../hooks/isAuth";

function Register() {
  let history = useHistory();
  const [register, { loading }] = useMutation(REGISTER, {
    refetchQueries: [{ query: GET_LATEST_USERS }],
  });
  const [isError, setisError] = useState("");
  const [show, setShow] = React.useState(false);
  const { refetchUser } = IsAuth();

  const handleClick = () => setShow(!show);

  return (
    <Center h="100vh" className="fondo" color="white">
      {loading && <Spinner size="xl" position="absolute" />}
      <div className="blackWall"></div>
      <Image
        mt="2%"
        src="https://joinsports.s3.eu-west-3.amazonaws.com/logo.png"
        alt="logo"
        p="5"
        h="300"
        className="logo"
      />
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(values) => {
          if (
            /[a-zA-Z0-9]@gmail.com/.test(values.email) &&
            values.password.length >= 8 &&
            values.username.length > 0 &&
            values.username.length < 30
          ) {
            register({
              variables: {
                email: values.email,
                username: values.username,
                password: values.password,
              },
            })
              .then((data) => {
                if (data) {
                  setisError(false);
                  const token = data.data.register.jwt;
                  setToken(token);
                  client.resetStore().then(() => {
                    refetchUser();
                    history.push("/");
                  });
                }
              })
              .catch((error) => setisError("existedUser"));
          } else setisError("error");
        }}
      >
        <Fade right>
          <Form>
            <Stack justify="center" align="center">
              <Heading size="xl" color="white" zIndex="1">
                Bienvenido a WeJoinSports
              </Heading>
              <Text zIndex="1" fontSize="16px">
                Introduzca sus datos para poder crear su cuenta
              </Text>

              <Field name="username">
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel>Nombre de usuario</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<FaUserAlt color="black" />}
                      />
                      <Input
                        _focus={{
                          background: "#F0F0EE",
                        }}
                        mb={2}
                        variant="outline"
                        color="black"
                        bg={"primary.300"}
                        size="md"
                        {...field}
                        id="username"
                        borderRadius="20"
                      />
                    </InputGroup>
                  </FormControl>
                )}
              </Field>

              <Field name="email">
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel>Email (@gmail.com)</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<EmailIcon color="black" />}
                      />
                      <Input
                        _focus={{
                          background: "#F0F0EE",
                        }}
                        mb={2}
                        variant="outline"
                        color="black"
                        bg={"primary.300"}
                        size="md"
                        {...field}
                        id="email"
                        borderRadius="20"
                      />
                    </InputGroup>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field }) => (
                  <FormControl>
                    <FormLabel>Contraseña (mín 8 caracteres)</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<LockIcon color="black" />}
                      />
                      <Input
                        _focus={{
                          background: "#F0F0EE",
                        }}
                        mb={6}
                        type={show ? "text" : "password"}
                        color="black"
                        variant="outline"
                        bg={"primary.300"}
                        size="md"
                        {...field}
                        id="password"
                        borderRadius="20"
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.50rem" size="md" onClick={handleClick}>
                          {!show ? (
                            <ViewIcon color="black" />
                          ) : (
                            <ViewOffIcon color="black" />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                )}
              </Field>
              {isError === "existedUser" ? (
                <p className="errorRegister">Usuario ya existente</p>
              ) : isError === "error" ? (
                <p className="errorRegister">Credenciales no permitidas</p>
              ) : (
                ""
              )}
              <Button
                color="white"
                fontSize="25"
                p="5"
                borderRadius="20"
                colorScheme="primary.100"
                variant="solid"
                bg="primary.200"
                type="submit"
                _hover={{
                  background: "red",
                }}
              >
                Crear cuenta
              </Button>
            </Stack>
          </Form>
        </Fade>
      </Formik>
    </Center>
  );
}

export default Register;
