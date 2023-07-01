import { Box, Center, Input, Icon } from "@chakra-ui/react";
import Footer from "../components/footer";
import { RiAddBoxLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";

export default function HistoryPage() {
  const [rowMapped, setRowMapped] = useState();
  const userSelector = useSelector((state) => state.auth);
  const mapping = async () => {
    const mapped = await axios.get("http://localhost:2001/attendance/all");
    setRowMapped(mapped.data);
  };
  useEffect(() => {
    mapping();
  }, []);
  useEffect(() => {
    console.log(rowMapped);
  }, [rowMapped]);

  return (
    <>
      <Box
        w={"100%"}
        h={"50px"}
        bg={"#bf2935"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        color={"white"}
        fontWeight={"semibold"}
        fontSize={"18px"}
      >
        Attendance Log
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-around"}
        alignItems={"center"}
        fontSize={"17px"}
        color={"grey"}
        fontWeight={"medium"}
        h={"55px"}
        borderBottom={"1px"}
      >
        <Box>Logs</Box>
        <Box>Attendance</Box>
        <Box>Shift</Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        padding={"0px 10px"}
      >
        <Input w={"100%"} type="month" h={"50px"} placeholder="January"></Input>
        {rowMapped?.map((val) => (
          <Box
            w={"100%"}
            h={"60px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            borderBottom={"1px"}
          >
            <Box fontWeight={"semibold"}>
              {moment(rowMapped.createdAt).format("DD MMM")}
            </Box>
            <Box fontWeight={"medium"}>{val?.clockIn}</Box>
            <Box fontWeight={"medium"}>{val?.clockOut}</Box>
            <Box>
              <Icon as={RiAddBoxLine} w={5} h={5}></Icon>
            </Box>
          </Box>
        ))}
      </Box>
      <Footer />
    </>
  );
}
