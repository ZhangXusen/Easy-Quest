/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-16 10:30:28
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-24 14:33:13
 */
import { useGetComponentInfo } from "@/hooks/useGetComponentsInfo";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { ComponentAttrs } from "./ComponentAttrs";
import { PageSetting } from "./PageSetting";

export const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState("props");
  const { selectedId } = useGetComponentInfo();
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
  useEffect(() => {
    if (selectedId) setActiveKey("props");
    else setActiveKey("setting");
  }, [selectedId]);
  return (
    <>
      <Tabs activeKey={activeKey} items={tabItems} />
    </>
  );
};
