import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import HistoryPage from "../pages/HistoryPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPage, { RequestForgotPassword } from "../pages/ForgotPage";

const routes = [
  <Route path="/" element={<HomePage />}></Route>,
  <Route path="/history" element={<HistoryPage />}></Route>,
  <Route path="/login" element={<Login />}></Route>,
  <Route path="/register" element={<Register />}></Route>,
  <Route
    path="/forgot-password/request"
    key="request-forgot-password"
    element={<RequestForgotPassword />}
  ></Route>,
  <Route
    path="/forgot-password/:token"
    key="forgot-password"
    element={<ForgotPage />}
  ></Route>,
];

export default routes;
