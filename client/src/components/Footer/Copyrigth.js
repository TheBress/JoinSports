import { Text } from "@chakra-ui/layout";
import * as React from "react";

export const Copyright = (props) => (
  <Text fontSize="sm" color={props.color} {...props}>
    &copy; {new Date().getFullYear()} WeJoinSports, All rights reserved.
  </Text>
);
