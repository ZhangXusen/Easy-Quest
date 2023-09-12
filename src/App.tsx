/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-08-29 14:15:38
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-02 20:44:38
 */
import "antd/dist/reset.css";
import { RouterProvider } from "react-router-dom";
import routerConfig from "./router";
function App() {
  return <RouterProvider router={routerConfig}></RouterProvider>;
}

export default App;
