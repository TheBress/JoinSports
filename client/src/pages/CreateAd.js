import React, { useState } from "react";
import Header from "../components/Header";
import { Authentication, CompleteProfile } from "../functions/authentication";
import {
  Center,
  Stack,
  useColorModeValue,
  Heading,
  Text,
  FormControl,
  useToast,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Textarea,
  Select,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";
import useSports from "../hooks/sports";
import useLocations from "../hooks/locations";
import IsAuth from "../hooks/isAuth";
import { useMutation } from "@apollo/client";
import { CREATEAD } from "../graphql/mutations/createAd";
import NewLocation from "../components/NewLocation";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { CREATE_EVENT_CALENDAR } from "../graphql/mutations/createEventCalendar";
import { useHistory } from "react-router-dom";

import { getRandomColor, validateDate } from "../functions/functions";
import { UserAds, AllAdsData, LastAds } from "../hooks/ads";
import Fade from "react-reveal/Fade";
import { UserEventsCalendar } from "../hooks/eventsCalendar";
import AWS from "aws-sdk";
import { GetUser } from "../hooks/users";
import Footer from "../components/Footer";
import { FaFileUpload } from "react-icons/fa";

function CreateAd() {
  Authentication();
  CompleteProfile();
  let history = useHistory();
  const toast = useToast();
  const { me } = IsAuth();
  const { sports } = useSports();
  const { locations } = useLocations();
  const [createAd, { loading }] = useMutation(CREATEAD);
  const [createEventCalendar] = useMutation(CREATE_EVENT_CALENDAR);

  const S3_BUCKET = "joinsports";
  const REGION = "eu-west-3";

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    myBucket.putObject(params).send((err) => {
      if (err) console.log(err);
    });
  };

  const { refetchAds } = UserAds(me?.meExtended.id);
  const { refetchAllAds } = AllAdsData();
  const { refetchEvents } = UserEventsCalendar(me?.meExtended.id);
  const { refetchUser } = GetUser(me?.meExtended.id);
  const { refetchLastAds } = LastAds();

  const bg = useColorModeValue("black", "white");
  const color = useColorModeValue("white", "black");
  const [isOpen, setisOpen] = useState(false);

  const nLocation = () => {
    setisOpen(true);
  };

  let colorEvent = getRandomColor();

  return (
    <>
      <Header />
      <Center h="123vh" mb={{ lg: "-14vh", base: "-20vh" }}>
        {loading && <Spinner size="xl" position="absolute" />}
        <Fade left>
          <Stack
            position="relative"
            top={{ base: "-10vh", lg: "-6vh" }}
            borderRadius="20"
            bg={bg}
            color={color}
            justify="center"
            h="auto"
            w={{ lg: "73vh", base: "55vh" }}
            align="center"
            p="5"
          >
            <Heading size="lg">Crea tu anuncio personalizado</Heading>
            <Text>Introduce los datos del anuncio para poder crearlo</Text>

            <Formik
              initialValues={{
                name: "",
                description: "",
                date: "",
                sport: "",
                location: "",
              }}
              onSubmit={(values) => {
                let isDateValidate = validateDate(values.date);
                const dotPosition = selectedFile?.name.lastIndexOf(".");
                if (
                  values.name !== "" &&
                  values.description !== "" &&
                  values.sport !== "" &&
                  values.sport !== "Elegir" &&
                  values.location !== "" &&
                  values.location !== "Elegir" &&
                  isDateValidate &&
                  selectedFile?.name !== null &&
                  (selectedFile?.name.substring(dotPosition + 1) === "png" ||
                    selectedFile?.name.substring(dotPosition + 1) === "jpg" ||
                    selectedFile?.name.substring(dotPosition + 1) === "jpeg")
                ) {
                  uploadFile(selectedFile);

                  createAd({
                    variables: {
                      userId: me?.meExtended.id,
                      name: values.name,
                      description: values.description,
                      date: values.date,
                      sport: values.sport,
                      location: values.location,
                      image: selectedFile?.name,
                    },
                  }).then(
                    toast({
                      title: "Datos actualizados correctamente",
                      status: "success",
                      duration: 2000,
                    }),
                    createEventCalendar({
                      variables: {
                        color: colorEvent,
                        to: values.date,
                        from: values.date,
                        title: values.name,
                        userId: me?.meExtended.id,
                      },
                    }).then(() => {
                      refetchEvents();
                      refetchAds();
                      refetchUser();
                      refetchAllAds();
                      refetchLastAds().then(() => {
                        history.push("/");
                      });
                    })
                  );
                } else {
                  toast({
                    title: "Datos no permitidos",
                    status: "error",
                    duration: 2000,
                  });
                }
              }}
            >
              <Form>
                <Stack justify="center">
                  <Field name="name">
                    {({ field }) => (
                      <FormControl>
                        <FormLabel>Nombre</FormLabel>
                        <InputGroup>
                          <Input
                            _focus={{
                              background: "#E0E0DE",
                            }}
                            mb={2}
                            variant="outline"
                            color="black"
                            bg={"primary.300"}
                            size="md"
                            {...field}
                            borderRadius="20"
                          />
                        </InputGroup>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="description">
                    {({ field }) => (
                      <FormControl>
                        <FormLabel>Descripción</FormLabel>
                        <Textarea
                          _focus={{
                            background: "#E0E0DE",
                          }}
                          variant="outline"
                          color="black"
                          bg={"primary.300"}
                          size="md"
                          {...field}
                          borderRadius="20"
                        />
                      </FormControl>
                    )}
                  </Field>

                  <FormControl>
                    <FormLabel>Imagen</FormLabel>

                    <div className="file">
                      <div className="fileborder">
                        <FaFileUpload className="iconupload" />
                        <p className="filep">
                          Arrastra o clicka aquí para subir una imagen.
                        </p>
                      </div>

                      <p className="filename">
                        {selectedFile?.name !== undefined
                          ? selectedFile?.name
                          : "No hay archivo subido"}
                      </p>
                      <Input
                        cursor="pointer"
                        type="file"
                        position="absolute"
                        top="25%"
                        h="100px"
                        border="none"
                        outline="none"
                        opacity="0"
                        onChange={handleFileInput}
                      />
                    </div>
                  </FormControl>

                  <Field name="date">
                    {({ field }) => (
                      <FormControl>
                        <FormLabel>Fecha</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<BsFillCalendarDateFill color="black" />}
                          />
                          <Input
                            _focus={{
                              background: "#E0E0DE",
                            }}
                            type="datetime-local"
                            variant="outline"
                            color="black"
                            bg={"primary.300"}
                            size="md"
                            {...field}
                            borderRadius="20"
                          />
                        </InputGroup>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="sport">
                    {({ field }) => (
                      <FormControl>
                        <FormLabel>Deporte</FormLabel>
                        <Select
                          mb={2}
                          ml="5"
                          mr="5"
                          bg="primary.300"
                          color="black"
                          w="100"
                          {...field}
                        >
                          <option
                            className={
                              color !== "white" ? "option1" : "option2"
                            }
                            value="Elegir"
                          >
                            Selecciona un deporte
                          </option>
                          {sports?.sports.map((sport) => {
                            return (
                              <option
                                className={
                                  color !== "white" ? "option1" : "option2"
                                }
                                value={sport.id}
                              >
                                {sport.Name}
                              </option>
                            );
                          })}
                        </Select>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="location">
                    {({ field }) => (
                      <FormControl>
                        <FormLabel>Localización</FormLabel>
                        <Text
                          visibility={!isOpen ? "visible" : "hidden"}
                          cursor="pointer"
                          mt={-8}
                          ml="50%"
                          onClick={nLocation}
                          _hover={{ textDecoration: `underline ${color}` }}
                        >
                          Añadir nueva localización
                        </Text>

                        <Select
                          ml="5"
                          mr="5"
                          mb={2}
                          bg="primary.300"
                          w="100"
                          color="black"
                          {...field}
                        >
                          <option
                            className={
                              color !== "white" ? "option1" : "option2"
                            }
                            value="Elegir"
                          >
                            Selecciona una localización
                          </option>
                          {locations?.locations.map((location) => {
                            return (
                              <option
                                className={
                                  color !== "white" ? "option1" : "option2"
                                }
                                value={location.id}
                              >
                                {location.Direction} ({location.Name})
                              </option>
                            );
                          })}
                        </Select>

                        {isOpen && <NewLocation isOpen={isOpen} />}
                      </FormControl>
                    )}
                  </Field>

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
                    Crear anuncio
                  </Button>
                </Stack>
              </Form>
            </Formik>
          </Stack>
        </Fade>
      </Center>
      <Footer ad={true} />
    </>
  );
}

export default CreateAd;
