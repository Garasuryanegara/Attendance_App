import logo from "./logo.svg";
import "./App.css";
import routes from "./routes/Routes";
import { Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Center, Spinner } from "@chakra-ui/react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(setIsLoading(false));
      }, 1000);
    });
  }, []);
  return (
    <>
      {isLoading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Routes>{routes.map((val) => val)}</Routes>
      )}
    </>
  );
}

export default App;
