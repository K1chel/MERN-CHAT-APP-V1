import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";

export const publicRoutes = [
  {
    element: LoginPage,
    path: "/login",
  },
  {
    element: RegisterPage,
    path: "/register",
  },
];

export const privateRoutes = [
  {
    element: HomePage,
    path: "/",
  },
];
