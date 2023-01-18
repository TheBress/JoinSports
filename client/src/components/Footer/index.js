import { Box, Image, Stack, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { Copyright } from "./Copyrigth";

function Footer(props) {
  const color = useColorModeValue("white", "black");

  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      maxW="7xl"
      py="12"
      px={{ base: "4", md: "8" }}
    >
      <Stack>
        <Stack
          direction="row"
          spacing="4"
          align="center"
          justify="space-between"
        >
          <Image
            src={
              color !== "white"
                ? "https://joinsports.s3.eu-west-3.amazonaws.com/logo.png"
                : "https://joinsports.s3.eu-west-3.amazonaws.com/logodark.png"
            }
            w="200px"
          />
        </Stack>
        <Copyright alignSelf="start" />
      </Stack>
    </Box>
  );
}

export default Footer;
