import { Grid, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import AdCard from "../components/AdCard";
import Header from "../components/Header";
import { Authentication, CompleteProfile } from "../functions/authentication";
import IsAuth from "../hooks/isAuth";
import { UserAds } from "../hooks/ads";
import { Spinner, Center, Text } from "@chakra-ui/react";
import { Fade, Flip } from "react-reveal";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function MyAds() {
  Authentication();
  CompleteProfile();
  const { me } = IsAuth();
  const { myAds, loading } = UserAds(me?.meExtended.id);
  const color = useColorModeValue("white", "black");

  let isAcceptedAds = [];

  me?.meExtended?.requests?.forEach((request) => {
    if (request?.isAccepted) isAcceptedAds.push(request?.ad);
  });

  if (loading || !myAds)
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
      {myAds?.ads.length !== 0 && (
        <Text fontSize="3xl" ml="10" mt="4">
          Tus anuncios
        </Text>
      )}
      <Grid
        templateColumns={{ lg: "repeat(3, 1fr)", base: "repeat(1, 1fr)" }}
        justifyContent="center"
        ml={{ lg: "10" }}
        p={{ base: "5", lg: "0" }}
        textAlign="center"
        gap={5}
      >
        {myAds?.ads.length !== 0 &&
          myAds?.ads.map((ad) => {
            return (
              <Fade left>
                <AdCard
                  edit={true}
                  key={ad?.id}
                  id={ad?.id}
                  name={ad?.Name}
                  userId={ad?.user.id}
                  user={ad?.user.username}
                  image={
                    ad.image !== ""
                      ? `https://joinsports.s3.eu-west-3.amazonaws.com/${ad.image}`
                      : `https://joinsports.s3.eu-west-3.amazonaws.com/logo.png`
                  }
                  userImage={ad?.user.image}
                  description={ad?.Description}
                  locationId={ad?.location.id}
                  fullLocation={`${ad?.location.Direction} (${ad?.location.Name})`}
                  requests={ad?.requests}
                  date={ad?.Date}
                  sport={ad?.sport.Name}
                  sportId={ad?.sport.id}
                  views={ad?.views}
                />
              </Fade>
            );
          })}
      </Grid>

      {isAcceptedAds?.length !== 0 && (
        <Text fontSize="3xl" ml="10" mt="4">
          Anuncios en los que has sido aceptado
        </Text>
      )}

      <Grid
        templateColumns={{ lg: "repeat(3, 1fr)", base: "repeat(1, 1fr)" }}
        justifyContent="center"
        textAlign="center"
        ml={{ lg: "10" }}
        p={{ base: "5", lg: "0" }}
        gap={5}
      >
        {isAcceptedAds?.length !== 0 &&
          isAcceptedAds?.map((ad) => {
            return (
              <Fade left>
                <AdCard
                  edit={true}
                  key={ad?.id}
                  id={ad?.id}
                  name={ad?.Name}
                  userId={ad?.user.id}
                  user={ad?.user.username}
                  image={
                    ad.image !== ""
                      ? `https://joinsports.s3.eu-west-3.amazonaws.com/${ad.image}`
                      : `https://joinsports.s3.eu-west-3.amazonaws.com/logo.png`
                  }
                  userImage={ad?.user.image}
                  description={ad?.Description}
                  locationId={ad?.location.id}
                  fullLocation={`${ad?.location.Direction} (${ad?.location.Name})`}
                  requests={ad?.requests}
                  date={ad?.Date}
                  sport={ad?.sport.Name}
                  sportId={ad?.sport.id}
                  views={ad?.views}
                />
              </Fade>
            );
          })}
      </Grid>

      {isAcceptedAds?.length === 0 && myAds?.ads.length === 0 && (
        <Center
          justifyContent="center"
          textAlign="center"
          h={{ lg: "90.5vh", base: "70vh" }}
          w="auto"
        >
          <Flip left>
            <Text fontSize="3xl">
              No tienes anuncios (puedes crearlos pinchando{" "}
              <Link
                className={color !== "white" ? "link" : "link2"}
                to="/createad"
              >
                {" "}
                aquí
              </Link>
              )
            </Text>
          </Flip>
        </Center>
      )}
      <Footer />
    </>
  );
}

export default MyAds;
