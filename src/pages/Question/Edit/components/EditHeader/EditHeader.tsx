import { LeftOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { EditToolbar } from "./EditToolbar/EditToolbar";

/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-16 15:39:13
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-16 15:52:52
 */
export const EditHeader = () => {
  const navigator = useNavigate();

  return (
    <div className="bg-white  border-b border-b-slate-200 px-0 py-3">
      <div className="flex my-0 mx-6">
        <div className="flex-1 ">
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => navigator(-1)}
            >
              返回
            </Button>
            <Title level={3}>问卷标题</Title>
          </Space>
        </div>
        <div className="flex-1 text-center">
          <EditToolbar />
        </div>
        <div className="flex-1 text-right">
          <Space>
            <Button type="text" className="border-slate-200">
              保存
            </Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};
