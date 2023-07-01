import {
  Box,
  Center,
  Flex,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Icon,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/middleware/userauth";

export default function Login() {
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const [seePassword, setSeePassword] = useState(true);
  const nav = useNavigate();
  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...account };
    tempUser[id] = value;
    setAccount(tempUser);
    console.log(tempUser);
  };
  const toast = useToast();
  const dispatch = useDispatch();
  const login = async () => {
    // const result = await axios.post("http://localhost:2001/user/v2", user);
    // alert(result.data.message);
    // if (result.status == 200) {
    //   nav("/");
    // }
    // return;
    toast.closeAll();
    const status = await dispatch(userLogin(account));

    if (status) {
      toast({
        title: `Hi, You're Successfully Logged In!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      return nav("/");
    }
    return toast({
      title: `Login failed, wrong Email/Password.`,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const forgotPassword = async () => {
    await axios
      .post("http://localhost:2001/user/forgot")
      .then((res) =>
        localStorage.setItem("token", JSON.stringify(res.data.token))
      );
  };

  return (
    <Box w="100vw" h="100vh" bgColor={"#F2F4F7"}>
      <Center w="100%" h="100%">
        <Flex
          bgColor={"white"}
          w="300px"
          flexDir={"column"}
          padding="20px"
          gap="10px"
          borderRadius={"10px"}
        >
          <Box fontWeight={"500"} fontSize={"30px"} fontFamily={"sans-serif"}>
            Absensi App
          </Box>
          <Box>
            <Box fontWeight={"500"} paddingBottom={"10px"}>
              Email
            </Box>
            <Input id="email" onChange={inputHandler}></Input>
          </Box>
          <Box>
            <Box fontWeight={"500"} paddingBottom={"10px"}>
              Password
            </Box>
            <InputGroup>
              <Input
                type={seePassword ? "password" : "text"}
                id="password"
                onChange={inputHandler}
              ></Input>
              <InputRightElement>
                <Icon
                  as={seePassword ? AiOutlineEyeInvisible : AiOutlineEye}
                  onClick={() => {
                    setSeePassword(!seePassword);
                  }}
                ></Icon>
              </InputRightElement>
            </InputGroup>
            <Link to="/forgot-password/request">
              <Box>Forgot password</Box>
            </Link>
          </Box>
          <Button
            marginTop={"25px"}
            bgColor="#035EBF"
            color={"white"}
            w="100%"
            onClick={login}
          >
            Sign In
          </Button>

          <Link to="/register">
            <Center>don't have an account? register</Center>
          </Link>
        </Flex>
      </Center>
    </Box>
  );
}
