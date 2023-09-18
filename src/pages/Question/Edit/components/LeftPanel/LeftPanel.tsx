import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons/lib/icons";
import { Tabs } from "antd";
import { ComponentLib } from "./ComponentLib";
import { Layer } from "./Layer";

export const LeftPanel = () => {
  const tabItems = [
    {
      key: "componentLib",
      label: (
        <span>
          <AppstoreOutlined />
          组件库
        </span>
      ),
      children: <ComponentLib />,
    },
    {
      key: "layers",
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: <Layer />,
    },
  ];
  return (
    <>
      <Tabs defaultActiveKey="componentLib" items={tabItems} />
    </>
  );
};
