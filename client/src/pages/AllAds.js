import {
  Grid,
  Center,
  Spinner,
  Input,
  Text,
  Checkbox,
  RadioGroup,
  Radio,
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import AdCard from "../components/AdCard";
import Header from "../components/Header";
import { Authentication, CompleteProfile } from "../functions/authentication";
import { AllAdsData } from "../hooks/ads";
import IsAuth from "../hooks/isAuth";
import { FaFilter } from "react-icons/fa";
import Footer from "../components/Footer";

function AllAds() {
  Authentication();
  CompleteProfile();
  const { allAds, loading } = AllAdsData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { me } = IsAuth();

  let dataUser = me?.meExtended;

  const [searchTerm, setSearchTerm] = useState("");
  const [isChecked, setisChecked] = useState(false);
  const [value, setValue] = useState("1");

  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangeCheckbox = () => {
    if (isChecked) setisChecked(false);
    else setisChecked(true);
  };

  const restartFilters = () => {
    setValue("1");
    setSearchTerm("");
    setisChecked(false);
  };

  useEffect(() => {
    let myAdsList = [];
    allAds?.ads?.forEach((ad) => {
      console.log(ad.user.id);
      if (ad.user.id !== dataUser.id && !isChecked) myAdsList.push(ad);
    });

    isChecked && (myAdsList = allAds?.ads);

    const results = myAdsList?.filter(
      (ad) =>
        ad?.user?.username?.includes(searchTerm) ||
        ad?.sport?.Name?.includes(searchTerm) ||
        ad?.location?.Name?.includes(searchTerm) ||
        ad?.Name?.includes(searchTerm)
    );

    if (value === "1") {
      results?.sort(function (a, b) {
        return b?.views - a?.views;
      });
    } else if (value === "2") {
      results?.sort(function (a, b) {
        return a?.views - b?.views;
      });
    } else if (value === "3") {
      results?.sort(function (a, b) {
        return b?.requests?.length - a?.requests?.length;
      });
    } else if (value === "4") {
      results?.sort(function (a, b) {
        return a?.requests?.length - b?.requests?.length;
      });
    } else if (value === "5") {
      results?.sort(function (a, b) {
        return new Date(a?.Date).getTime() - new Date(b?.Date).getTime();
      });
    } else if (value === "6") {
      results?.sort(function (a, b) {
        return new Date(b?.Date).getTime() - new Date(a?.Date).getTime();
      });
    }

    setSearchResults(results);
  }, [searchTerm, allAds?.ads, isChecked, dataUser?.id, value]);

  if (loading || !allAds)
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
      {}
      <Button
        ref={btnRef}
        colorScheme="red"
        mt="8"
        ml="3"
        position="fixed"
        zIndex="5"
        onClick={onOpen}
      >
        <FaFilter color="black" />
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filtros</DrawerHeader>

          <DrawerBody>
            <Checkbox
              mt="5"
              mb="5"
              isChecked={isChecked}
              onChange={handleChangeCheckbox}
            >
              Mostrar mis anuncios
            </Checkbox>

            <Input
              mb="5"
              type="text"
              value={searchTerm}
              placeholder="Nombre de anuncio, deporte , nombre de usuario o localización"
              onChange={handleChange}
            />

            <RadioGroup onChange={setValue} value={value} mb="5">
              Visitas:
              <Radio ml="2" value="1">
                Desc.
              </Radio>
              <Radio ml="2" value="2">
                Asc.
              </Radio>
            </RadioGroup>

            <RadioGroup onChange={setValue} value={value} mb="5">
              Solicitudes:
              <Radio ml="2" value="3">
                Desc.
              </Radio>
              <Radio ml="2" value="4">
                Asc.
              </Radio>
            </RadioGroup>

            <RadioGroup onChange={setValue} value={value} mb="5">
              Fecha evento:
              <Radio ml="2" value="5">
                Más cercano
              </Radio>
              <Radio ml="2" value="6">
                Más lejano
              </Radio>
            </RadioGroup>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={restartFilters}>
              Reiniciar filtros
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Grid
        p="5"
        templateColumns={{ lg: "repeat(3, 1fr)", base: "repeat(1, 1fr)" }}
        justifyContent="center"
        textAlign="center"
        gap={5}
      >
        {searchResults?.length > 0 ? (
          searchResults?.map((ad) => {
            return (
              <Fade left>
                <AdCard
                  edit={false}
                  key={ad.id}
                  id={ad.id}
                  name={ad.Name}
                  userId={ad.user.id}
                  user={ad.user.username}
                  image={
                    ad.image !== ""
                      ? `https://joinsports.s3.eu-west-3.amazonaws.com/${ad.image}`
                      : `https://joinsports.s3.eu-west-3.amazonaws.com/logo.png`
                  }
                  userImage={ad.user.image}
                  description={ad.Description}
                  locationId={ad.location.id}
                  fullLocation={`${ad.location.Direction} (${ad.location.Name})`}
                  requests={ad.requests}
                  date={ad.Date}
                  sport={ad.sport.Name}
                  sportId={ad.sport.id}
                  views={ad.views}
                />
              </Fade>
            );
          })
        ) : (
          <Center
            h="86vh"
            textAlign="center"
            w={{ base: "63.6vh", lg: "203.8vh" }}
          >
            <Text fontSize="4xl">No hay anuncios</Text>
          </Center>
        )}
      </Grid>
      <Footer />
    </>
  );
}

export default AllAds;
