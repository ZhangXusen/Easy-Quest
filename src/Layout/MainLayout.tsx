/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-07-16 22:06:48
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-03 11:31:57
 */
import Logo from "@/components/Logo";
import UserInfo from "@/components/UserInfo";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <Layout className="">
      <Header className="header px-6 flex justify-between items-center">
        <div className="left inline-block">
          <Logo />
        </div>
        <div className="right inline-block">
          <UserInfo />
        </div>
      </Header>
      <Layout className="l-main">
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <Footer className="text-center bg-slate-100 border-t-2 border-gray-200">
        超级问卷 &copy;2023.Created by 小国际
      </Footer>
    </Layout>
  );
};

export default MainLayout;
