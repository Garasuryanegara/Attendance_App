import { Box, Center, Icon } from "@chakra-ui/react";
import { GrHistory, GrHomeRounded, GrLogout } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Center>
      <Box
        maxW={"500px"}
        bg={"#bf2935"}
        w={"100%"}
        h={"70px"}
        display={"flex"}
        justifyContent={"space-around"}
        alignItems={"center"}
        padding={"5px 0px"}
        position={"fixed"}
        bottom={"0"}
      >
        <Link to="/">
          <Box
            fontWeight={"bold"}
            fontFamily={"heading"}
            alignItems={"center"}
            display={"flex"}
            flexDir={"column"}
          >
            <Icon as={GrHomeRounded} w={7} h={7}></Icon>
            <Box>HOME</Box>
          </Box>
        </Link>
        <Link to="/history">
          <Box
            fontWeight={"bold"}
            fontFamily={"heading"}
            alignItems={"center"}
            display={"flex"}
            flexDir={"column"}
          >
            <Icon as={GrHistory} w={7} h={7}></Icon>
            <Box>HISTORY</Box>
          </Box>
        </Link>
        <Link to="/login">
          <Box
            fontWeight={"bold"}
            fontFamily={"heading"}
            alignItems={"center"}
            display={"flex"}
            flexDir={"column"}
          >
            <Icon as={GrLogout} w={7} h={7}></Icon>
            <Box>LOGOUT</Box>
          </Box>
        </Link>
      </Box>
    </Center>
  );
}
