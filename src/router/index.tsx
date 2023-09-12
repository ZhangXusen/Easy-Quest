/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-08-29 15:07:02
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-01 14:00:35
 */
import ManagerLayout from "@/Layout/ManagerLayout.tsx";
import { QuestionLayout } from "@/Layout/QuestionLayout.tsx";
import NotFound from "@/pages/404/NotFound.tsx";
import { Home } from "@/pages/Home/index.tsx";
import { Login } from "@/pages/Login/index.tsx";
import { List } from "@/pages/Manager/List.tsx";
import { Star } from "@/pages/Manager/Star.tsx";
import { Trash } from "@/pages/Manager/Trash.tsx";
import { Edit } from "@/pages/Question/Edit/Index.tsx";
import { Stat } from "@/pages/Question/Stat/index.tsx";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout.tsx";
import { Register } from "@/pages/Register/index.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "manage",
        element: <ManagerLayout />,
        children: [
          {
            path: "list",
            element: <List />,
          },
          {
            path: "star",
            element: <Star />,
          },
          {
            path: "trash",
            element: <Trash />,
          },
        ],
      },
      {
        path: "*", // 404 路由配置，都写在最后（兜底）
        element: <NotFound />,
      },
    ],
  },
  {
    path: "question",
    element: <QuestionLayout />,
    children: [
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "stat/:id", // statistic 统计
        element: <Stat />,
      },
    ],
  },
]);

export default router;
