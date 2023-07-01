import {
  Box,
  Center,
  Flex,
  Input,
  Button,
  Textarea,
  InputGroup,
  InputRightElement,
  Icon,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
export default function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    full_name: "",
    username: "",
    Company_id: "",
    address: "",
  });
  const [companyList, setCompanyList] = useState([]);
  const [seePassword, setSeePassword] = useState(true);
  const nav = useNavigate();

  const companyId = async () => {
    await axios
      .get("http://localhost:2001/company", companyList)
      .then((res) => {
        setCompanyList(res.data);
        console.log(companyList);
      });
  };

  useEffect(() => {
    companyId();
  }, []);

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  };

  const register = async () => {
    const result = await axios.post("http://localhost:2001/user", user);
    console.log(result);
    alert(result.data.message);
    return nav("/login");
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
            Daftar Absensi
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
                  onClick={() => setSeePassword(!seePassword)}
                ></Icon>
              </InputRightElement>
            </InputGroup>
          </Box>

          <Box>
            <Box fontWeight={"500"} paddingBottom={"10px"}>
              Full Name
            </Box>
            <Input id="full_name" onChange={inputHandler}></Input>
          </Box>
          <Box>
            <Box fontWeight={"500"} paddingBottom={"10px"}>
              Username
            </Box>
            <Input id="username" onChange={inputHandler}></Input>
          </Box>

          <Box>
            <Box fontWeight={"500"} paddingBottom={"10px"}>
              CompanyId
            </Box>
            <Select onChange={inputHandler} id="Company_id">
              {companyList.map((val) => (
                <option value={val.id}>{val.name}</option>
              ))}
            </Select>
          </Box>

          <Box>
            <Box fontWeight={"500"} paddingBottom={"10px"}>
              Address
            </Box>
            <Textarea id="address" onChange={inputHandler}></Textarea>
          </Box>

          <Button
            marginTop={"20px"}
            bgColor="#035EBF"
            color={"white"}
            onClick={register}
          >
            Register
          </Button>
          <Link to="/login">
            <Center fontWeight={"500"}>Have an account? Sign in</Center>
          </Link>
        </Flex>
      </Center>
    </Box>
  );
}
