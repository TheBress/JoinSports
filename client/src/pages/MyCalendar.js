import React from "react";
import Header from "../components/Header/index";
import Calendar from "react-awesome-calendar";
import { Authentication, CompleteProfile } from "../functions/authentication";
import IsAuth from "../hooks/isAuth";
import { UserEventsCalendar } from "../hooks/eventsCalendar";
import { Center, Container, Spinner } from "@chakra-ui/react";
import Fade from "react-reveal/Fade";
import Footer from "../components/Footer";

function MyCalendar() {
  Authentication();
  CompleteProfile();
  const { me } = IsAuth();
  let events = [];
  let { eventsCalendar, loading } = UserEventsCalendar(me?.meExtended?.id);

  if (eventsCalendar !== undefined)
    eventsCalendar?.eventsCalendars?.forEach((event) => {
      events.push(event);
    });

  if (loading)
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

  return (
    <>
      <Header />
      <Fade left>
        <Container maxW="container.xl" bg="white" mt="6">
          <Calendar events={events} />
        </Container>
      </Fade>
      <Footer />
    </>
  );
}

export default MyCalendar;
