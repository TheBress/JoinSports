import { Formik, Field, Form } from "formik";
import { React, useState } from "react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  Flex,
  Button,
  Input,
  Modal,
  ModalContent,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { CREATELOCATION } from "../../graphql/mutations/createLocation";
import { GETLOCATION } from "../../graphql/queries/getLocations";
import useLocations from "../../hooks/locations";

function NewLocation() {
  const toast = useToast();
  const [isOpen, setisOpen] = useState(true);

  const [createLocation] = useMutation(CREATELOCATION, {
    refetchQueries: [{ query: GETLOCATION }],
  });

  const { locations } = useLocations();

  const close = () => {
    setisOpen(false);
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalContent
        bg="white"
        color="black"
        textAlign="center"
        h="400px"
        borderRadius="20"
        top="10%"
      >
        <Heading mt="2">Crea una nueva localización</Heading>
        <Text mt="2">
          Introduce los datos para craer una nueva localización
        </Text>

        <Formik
          initialValues={{
            name: "",
            direction: "",
          }}
          onSubmit={(values) => {
            let isExisted = false;

            if (
              values.name !== "" &&
              /[C|Avda|Pº]\.\s([A-Za-záéíóú]{1,}\s){1,}[0-9]{1,}/.test(
                values.direction
              )
            ) {
              locations?.locations.forEach((location) => {
                if (
                  location?.Direction === values.direction &&
                  location?.Name === values.name
                )
                  isExisted = true;
              });

              if (!isExisted) {
                createLocation({
                  variables: {
                    name: values.name,
                    direction: values.direction,
                  },
                }).then(() => {
                  setisOpen(false);
                  toast({
                    title: "Nueva localización creada correctamente",
                    status: "success",
                    duration: 2000,
                  });
                });
              } else {
                toast({
                  title: "Localización ya creada",
                  status: "error",
                  duration: 2000,
                });
              }
            } else {
              toast({
                title: "Datos erróneos",
                status: "error",
                duration: 2000,
              });
            }
          }}
        >
          <Form>
            <Field name="name">
              {({ field }) => (
                <FormControl className="formControl" top="20px" left="6">
                  <FormLabel>Ciudad</FormLabel>
                  <InputGroup>
                    <Input
                      _placeholder={{ color: "#A19E9E" }}
                      placeholder="Madrid"
                      variant="outline"
                      color="black"
                      bg={"primary.300"}
                      size="md"
                      w="90%"
                      {...field}
                      borderRadius="20"
                    />
                  </InputGroup>
                </FormControl>
              )}
            </Field>

            <Field name="direction">
              {({ field }) => (
                <FormControl className="formControl" top="30px" left="6">
                  <FormLabel>Dirección</FormLabel>
                  <InputGroup>
                    <Input
                      _placeholder={{ color: "#A19E9E" }}
                      placeholder="C. Paseo de la Castellana 13"
                      variant="outline"
                      color="black"
                      bg={"primary.300"}
                      size="md"
                      w="90%"
                      {...field}
                      borderRadius="20"
                    />
                  </InputGroup>
                </FormControl>
              )}
            </Field>

            <Flex justify="center">
              <Button
                mr="5"
                top="58px"
                color="white"
                fontSize="25"
                p="5"
                borderRadius="20"
                colorScheme="primary.100"
                variant="solid"
                bg="primary.200"
                type="submit"
              >
                Crear localización
              </Button>

              <Button
                top="58px"
                color="white"
                fontSize="25"
                p="5"
                borderRadius="20"
                colorScheme="primary.100"
                variant="solid"
                bg="primary.200"
                onClick={close}
              >
                Cerrar
              </Button>
            </Flex>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
}

export default NewLocation;
