/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-07-16 22:10:42
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-02 22:45:42
 */
import { createQuestionService } from "@/service/question";
import {
  BarsOutlined,
  DeleteOutlined,
  PlusOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Divider, Space, message } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const ManagerLayout = () => {
  const navigation = useNavigate();
  const { pathname } = useLocation();
  /*  const [loading, setLoading] = useState(false);
  async function handleCreateClick() {
    setLoading(true);
    const data = await createQuestionService();
    const { id } = data || {};
    if (id) {
      navigation(`/question/edit/${id}`);
      message.success("创建成功");
    } else {
      message.error("创建失败");
    }
    setLoading(false);
  } */

  const {
    loading,
    error,
    run: handlerCreateClick,
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess: (res) => {
      navigation(`/question/edit/${res.id}`);
      message.success("创建成功");
    },
    onError: () => {
      message.error("创建失败!");
    },
  });
  return (
    <div className="container flex py-6 my-0 mx-auto">
      <div className="left w-32">
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handlerCreateClick}
            disabled={loading}
          >
            创建问卷
          </Button>
          <Divider style={{ borderTop: "transparent", marginBottom: "16px" }} />
          <Button
            type={pathname.startsWith("/manage/star") ? "default" : "text"}
            size="large"
            icon={<StarOutlined />}
            onClick={() => navigation("/manage/star")}
          >
            星标问卷
          </Button>
          <Divider style={{ borderTop: "transparent", margin: "0" }} />
          <Button
            type={pathname.startsWith("/manage/list") ? "default" : "text"}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => navigation("/manage/list")}
          >
            我的问卷
          </Button>
          <Divider style={{ borderTop: "transparent", margin: "0" }} />
          <Button
            type={pathname.startsWith("/manage/trash") ? "default" : "text"}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => navigation("/manage/trash")}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className="right flex-1 ml-4">
        <Outlet />
      </div>
    </div>
  );
};
export default ManagerLayout;
