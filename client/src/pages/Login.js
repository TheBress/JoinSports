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
import { LOGIN } from "../graphql/mutations/login";
import { useHistory, Link } from "react-router-dom";
import { setToken } from "../graphql/config/auth";
import { client } from "../graphql/config/apolloClient";
import Fade from "react-reveal/Fade";
import IsAuth from "../hooks/isAuth";

function Login() {
  let history = useHistory();
  const [login, { loading }] = useMutation(LOGIN);
  const [isError, setisError] = useState(false);
  const { refetchUser } = IsAuth();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Center h="100vh" className="fondo" color="white">
      {loading && <Spinner size="xl" position="absolute" />}
      <div className="blackWall"></div>
      <Image
        className="logo"
        mt="2%"
        src="https://joinsports.s3.eu-west-3.amazonaws.com/logo.png"
        alt="logo"
        h="300"
        p="5"
      />

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          login({
            variables: {
              identifier: values.email,
              password: values.password,
            },
          })
            .then((data) => {
              if (data) {
                setisError(false);
                const token = data.data.login.jwt;
                setToken(token);
                client.resetStore().then(() => {
                  refetchUser();
                  history.push("/");
                });
              }
            })
            .catch(() => setisError(true));
        }}
      >
        <Fade top>
          <Form>
            <Stack justify="center" align="center">
              <Heading size="xl" color="white" zIndex="1">
                Bienvenido a WeJoinSports
              </Heading>
              <Text zIndex="1" fontSize="16px">
                Introduzca sus datos para poder crear su cuenta
              </Text>

              <Field name="email">
                {({ field }) => (
                  <FormControl>
                    <FormLabel>Email</FormLabel>
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
                    <FormLabel>Contraseña</FormLabel>
                    <Text
                      position="relative"
                      left={{ lg: "260px" }}
                      bottom="10px"
                    ></Text>
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
                            <ViewIcon color="black" bg="transparent" />
                          ) : (
                            <ViewOffIcon color="black" bg="transparent" />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                )}
              </Field>

              <Text zIndex="1" fontSize="lg" bottom="10px" position="relative">
                ¿No tienes cuenta? <Link to="/register">regístrate aquí</Link>
              </Text>

              {isError ? (
                <p className="error">Correo o password no válidos</p>
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
                Iniciar sesión
              </Button>
            </Stack>
          </Form>
        </Fade>
      </Formik>
    </Center>
  );
}

export default Login;
