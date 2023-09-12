/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-07-16 22:14:30
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-06 14:43:32
 */
import { Outlet } from "react-router-dom";

export const QuestionLayout = () => {
  return (
    <div className="h-screen">
      <p></p>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
