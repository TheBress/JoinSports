import {
  Container,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Checkbox,
  Center,
  Text,
  Spinner,
  Grid,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalContent,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import IsAuth from "../hooks/isAuth";
import { UserNotifications } from "../hooks/notifications";
import { sanitizeCompleteDate } from "../functions/functions";
import { useMutation } from "@apollo/client";
import { UPDATENOTIFICATION } from "../graphql/mutations/updateNotification";
import { Flip } from "react-reveal";
import { Authentication, CompleteProfile } from "../functions/authentication";
import Footer from "../components/Footer";
import { DELETE_NOTIFICATION } from "../graphql/mutations/deleteNotification";
import { useHistory } from "react-router-dom";

function Notifications() {
  Authentication();
  CompleteProfile();
  const { me } = IsAuth();
  let dataUser = me?.meExtended;
  const color = useColorModeValue("black", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteNotification, { loading: loadingdDelete }] =
    useMutation(DELETE_NOTIFICATION);

  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const [updateNotification, { loading: loadingUpdate }] =
    useMutation(UPDATENOTIFICATION);

  let isSeenNotifications = [];

  const [value, setValue] = useState("1");

  const { myNotifications, refetchNotifications, loading } = UserNotifications(
    dataUser?.id
  );

  myNotifications?.notifications?.forEach((notification) => {
    if (notification?.isSeen) isSeenNotifications.push(notification);
  });

  const [Notifications, setNotifications] = useState([]);

  const history = useHistory();

  const updateIsSeen = (isSeen, id) => {
    let isSeenVariable;
    if (isSeen) isSeenVariable = false;
    else isSeenVariable = true;
    updateNotification({
      variables: {
        id: id,
        isSeen: isSeenVariable,
      },
    }).then(() => {
      refetchNotifications();
    });
  };
  const toast = useToast();

  const deleteSennNotifications = () => {
    let cont = 0;
    isSeenNotifications?.forEach((notification) => {
      deleteNotification({
        variables: { id: notification?.id },
      }).then(() => {
        if (cont === isSeenNotifications?.length - 1) {
          toast({
            title: `Notificaciones vistas eliminadas con éxito (${isSeenNotifications?.length})`,
            status: "success",
            duration: 2000,
          });
          refetchNotifications();
          onClose2();
        }
        cont++;
      });
    });
  };

  const changeValue = () => {
    if (value === "1") setValue("2");
    else setValue("1");
  };

  const deleteAllNotifications = () => {
    let cont = 0;
    myNotifications?.notifications?.forEach((notification) => {
      deleteNotification({
        variables: { id: notification?.id },
      }).then(() => {
        if (cont === myNotifications?.notifications?.length - 1) {
          toast({
            title: `Notificaciones eliminadas con éxito (${myNotifications?.notifications?.length})`,
            status: "success",
            duration: 2000,
          });
          refetchNotifications();
          onClose2();
        }
        cont++;
      });
    });
  };

  useEffect(() => {
    let notifications;

    if (value === "1") {
      notifications = myNotifications?.notifications
        ?.slice()
        .sort(function (a, b) {
          return (
            new Date(b?.created_at).getTime() -
            new Date(a?.created_at).getTime()
          );
        });
    } else {
      notifications = myNotifications?.notifications
        ?.slice()
        .sort(function (a, b) {
          return (
            new Date(a?.created_at).getTime() -
            new Date(b?.created_at).getTime()
          );
        });
    }
    setNotifications(notifications);
  }, [myNotifications?.notifications, value]);

  if (loading || !myNotifications)
    return (
      <Center
        h="100vh"
        w="203.8vh"
        zIndex="2"
        position="absolute"
        bg="black"
        opacity={0.5}
      >
        <Spinner size="xl" />
      </Center>
    );

  if (myNotifications?.notifications?.length > 0)
    return (
      <>
        <Header />
        {loadingUpdate ||
          (loadingdDelete && (
            <Center
              h="97vh"
              w="100%"
              zIndex="2"
              position="absolute"
              bg="black"
              opacity={0.5}
            >
              <Spinner size="xl" />
            </Center>
          ))}
        <Container maxW="container.lg">
          <Grid templateColumns="repeat(2,auto)" mt="4">
            <Text
              cursor="pointer"
              _hover={{ textDecoration: `underline ${color}` }}
              onClick={onOpen}
            >
              {`Eliminar todas las notificaciones (${myNotifications?.notifications?.length})`}
            </Text>

            {isSeenNotifications?.length > 0 && (
              <Text
                cursor="pointer"
                _hover={{ textDecoration: `underline ${color}` }}
                onClick={onOpen2}
              >
                {`Eliminar notificaciones leídas (${isSeenNotifications?.length})`}
              </Text>
            )}
          </Grid>
          <Table mt="8" size={{ base: "md", lg: "lg" }}>
            <Thead>
              <Tr>
                <Th textAlign="center">Leído</Th>
                <Th textAlign="center">Anuncio</Th>
                <Th textAlign="center">Mensaje</Th>
                <Th textAlign="center">Usuario</Th>
                <Th
                  textAlign="center"
                  cursor="pointer"
                  onClick={() => changeValue()}
                >
                  {value !== "1" ? `Fecha 🡹` : `Fecha 🡻`}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {Notifications?.map((notification) => {
                const Date = sanitizeCompleteDate(notification?.created_at);

                return (
                  <Tr>
                    <Td textAlign="center">
                      <Checkbox
                        colorScheme={color !== "white" ? "blackAlpha" : "cyan"}
                        isChecked={notification?.isSeen}
                        onChange={() => {
                          updateIsSeen(notification?.isSeen, notification?.id);
                        }}
                      />
                    </Td>
                    {notification?.ad !== null ? (
                      <Td
                        cursor="pointer"
                        textAlign="center"
                        _hover={{ textDecoration: `underline ${color}` }}
                        onClick={() => {
                          history.push(`/ad/${notification?.ad?.id}`);
                        }}
                      >
                        {notification?.ad?.Name}
                      </Td>
                    ) : (
                      <Td textAlign="center">Anuncio eliminado</Td>
                    )}
                    <Td textAlign="center" p="2">
                      {notification?.Message}
                    </Td>
                    <Td
                      cursor="pointer"
                      textAlign="center"
                      p="2"
                      _hover={{ textDecoration: `underline ${color}` }}
                      onClick={() => {
                        history.push(
                          `/user/${notification?.userTransmitter?.id}`
                        );
                      }}
                    >
                      {notification?.userTransmitter?.username}
                    </Td>
                    <Td textAlign="center">{Date}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent
              h="200px"
              w="1000px"
              textAlign="center"
              position="relative"
              top="25%"
            >
              <Text fontSize="xl" m="2">
                {`¿Estás seguro de que quieres eliminar todas las notificaciones
                (${myNotifications?.notifications?.length})?`}
              </Text>
              <Grid templateColumns="repeat(2,1fr)" mt="10%" gap="10">
                <Button
                  onClick={deleteAllNotifications}
                  colorScheme="green"
                  ml="5"
                >
                  Eliminar
                </Button>
                <Button onClick={onClose} colorScheme="red" mr="5">
                  Cancelar
                </Button>
              </Grid>
            </ModalContent>
          </Modal>

          <Modal isOpen={isOpen2} onClose={onClose2}>
            <ModalContent
              h="200px"
              w="1000px"
              textAlign="center"
              position="relative"
              top="25%"
            >
              <Text fontSize="xl" m="2">
                {`¿Estás seguro de que quieres eliminar todas las notificaciones
                vistas (${isSeenNotifications?.length})?`}
              </Text>
              <Grid templateColumns="repeat(2,1fr)" mt="10%" gap="10">
                <Button
                  onClick={deleteSennNotifications}
                  colorScheme="green"
                  ml="5"
                >
                  Eliminar
                </Button>
                <Button onClick={onClose2} colorScheme="red" mr="5">
                  Cancelar
                </Button>
              </Grid>
            </ModalContent>
          </Modal>
        </Container>
        <Footer />
      </>
    );
  else
    return (
      <>
        <Header />

        <Center h="91vh">
          <Flip left>
            <Text fontSize={{ lg: "4xl", base: "2xl" }}>
              No tienes notificaciones todavía
            </Text>
          </Flip>
        </Center>
        <Footer />
      </>
    );
}

export default Notifications;
