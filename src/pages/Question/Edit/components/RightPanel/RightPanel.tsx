/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-16 10:30:28
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-16 10:32:56
 */
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { FC } from "react";
import { ComponentAttrs } from "./ComponentAttrs";
import { PageSetting } from "./PageSetting";

export const RightPanel: FC = () => {
  const tabItems = [
    {
      key: "props",
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentAttrs />,
    },
    {
      key: "setting",
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ];
  return (
    <>
      <Tabs defaultActiveKey="props" items={tabItems} />
    </>
  );
};
