import { Box, Button, Center, Icon, Avatar, Input } from "@chakra-ui/react";
import Footer from "../components/footer";
import { AiFillInfoCircle } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import moment from "moment";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { auth_types } from "../redux/types";
export default function HomePage() {
  const userSelector = useSelector((state) => state.auth);

  const inputFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const [clock, setClock] = useState();
  const fetchData = async () => {
    if (userSelector.id) {
      const fetch = await axios.get(
        "http://localhost:2001/attendance/" + userSelector.id
      );
      setClock(fetch);
    }
  };
  const clockIn = async () => {
    if (userSelector.id) {
      const result = await axios.post(
        "http://localhost:2001/attendance/" + userSelector.id
      );
      alert(result.data.message);
      fetchData();
    }
  };

  const clockOut = async () => {
    if (userSelector.id) {
      const result = await axios.patch(
        "http://localhost:2001/attendance/" + userSelector.id
      );
      alert(result.data.message);
      fetchData();
    }
  };

  useEffect(() => {
    if (userSelector.id) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    console.log(clock);
  }, [clock]);

  const LiveTime = () => {
    const [time, setTime] = useState(moment().format("hh:mm:ss")); //11 25 11

    useEffect(() => {
      setTime(moment().format("hh:mm:ss")); //11 25 12
    }, []);

    useEffect(() => {
      setTimeout(() => {
        setTime(moment().format("hh:mm:ss")); //11 25 13
      }, 1000);
    }, [time]);
  };
  const LiveJam = () => {
    LiveTime();
    return <> {moment().format("hh:mm")} </>;
  };
  const LiveHari = () => {
    LiveTime();
    return <> {moment().format("ddd, DD MMMM YYYY")} </>;
  };
  const Schedule = () => {
    LiveTime();
    return <>{moment().format("DD MMMM YYYY")}</>;
  };
  const uploadAvatar = async () => {
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    await axios
      .post("http://localhost:2001/user/image/v1/" + userSelector.id, formData)
      .then((res) => res.data);
    const token = localStorage.getItem("token");
    await axios
      .get("http://localhost:2001/user/v3", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(token);
        console.log(res.data);

        if (token) {
          dispatch({ type: auth_types.login, payload: res.data });
        }
        alert("upload berhasil");
        // res.send("upload berhasil");
      });
  };

  return (
    <>
      <Center>
        <Box maxW={"500px"} bg={"#ffffff"} h={"100vh"} w={"100%"}>
          <Box
            bg={"#bf2935"}
            h={"60%"}
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            paddingTop={"30px"}
          >
            <Box color={"white"} fontWeight={"semi bold"}>
              Live Attendance
            </Box>
            <Avatar marginY={"5px"} src={userSelector.avatar_url} />
            <Box fontSize={"48px"} fontWeight={"bold"} color={"white"}>
              <LiveJam />
            </Box>
            <Box fontSize={"20px"} color={"white"} paddingBottom={"20px"}>
              <LiveHari />
            </Box>
            <Box
              bg={"#ffffff"}
              borderRadius={"lg"}
              maxW={"380px"}
              width={"100%"}
              height={"250px"}
              display={"flex"}
              alignItems={"center"}
              flexDir={"column"}
              padding={"10px"}
            >
              <Box color={"grey"} fontSize={"14px"}>
                Schedule: <Schedule />
              </Box>
              <Box fontSize={"36px"} fontWeight={"bold"} paddingBottom={"10px"}>
                08:00 - 17:00
              </Box>

              <Box
                w={"100%"}
                h={"25px"}
                bg={"#e0ebf7"}
                color={"grey"}
                borderRadius={"5px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                fontSize={"12px"}
              >
                <Icon as={AiFillInfoCircle} w={3} h={3}></Icon>
                <Box paddingLeft={"10px"}>
                  Selfie photo is required to Clock In/Out
                </Box>
              </Box>
              <Box
                w={"100%"}
                display={"flex"}
                justifyContent={"space-around"}
                paddingTop={"50px"}
              >
                <Button
                  color={"white"}
                  bgColor={"#035ebf"}
                  w={"40%"}
                  h={"55px"}
                  onClick={clock?.data.clockIn ? null : clockIn}
                >
                  Clock In
                </Button>
                <Button
                  color={"white"}
                  bgColor={"#035ebf"}
                  w={"40%"}
                  h={"55px"}
                  onClick={clock?.data.clockOut ? null : clockOut}
                >
                  Clock Out
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            padding={"20px"}
          >
            <Box fontWeight={"semibold"} fontSize={"18px"}>
              Attendance Log
            </Box>
            <Input
              accept="image/png,image/jpeg"
              type="file"
              ref={inputFileRef}
              display={"none"}
              onChange={handleFile}
            />
            {/* <Button
              onClick={() => inputFileRef.current.click()}
              colorScheme="teal"
            >
              Change Avatar
            </Button>
            <Button onChange={handleFile} onClick={uploadAvatar}>
              Select Avatar
            </Button> */}
            <Box color={"grey"} fontSize={"18px"}>
              View Log
            </Box>
          </Box>
          {clock?.data.clockIn ? (
            <Box
              display={"flex"}
              w={"100%"}
              h={"60px"}
              justifyContent={"space-between"}
              padding={"0px 20px"}
              alignItems={"center"}
              borderBottom={"1px"}
            >
              <Box>
                <Box fontWeight={"bold"}>{clock.data.clockIn}</Box>
                <Box fontWeight={"bold"} color={"grey"}>
                  {moment(clock.data.createdAt).format("DD MMM")}
                </Box>
              </Box>
              <Box fontWeight={"semibold"}>Clock In</Box>
              <Box>
                <Icon as={MdKeyboardArrowRight} w={7} h={7}></Icon>
              </Box>
            </Box>
          ) : null}
          {clock?.data.clockOut ? (
            <Box
              display={"flex"}
              w={"100%"}
              h={"60px"}
              justifyContent={"space-between"}
              padding={"0px 20px"}
              alignItems={"center"}
              borderBottom={"1px"}
            >
              <Box>
                <Box fontWeight={"bold"}>{clock.data.clockOut}</Box>
                <Box fontWeight={"bold"} color={"grey"}>
                  {moment(clock?.data.updatedAt).format("DD MMM")}
                </Box>
              </Box>
              <Box fontWeight={"semibold"}>Clock Out</Box>
              <Box>
                <Icon as={MdKeyboardArrowRight} w={7} h={7}></Icon>
              </Box>
            </Box>
          ) : null}
        </Box>
      </Center>
      <Footer />
    </>
  );
}
