import {
  duplicateQuestionService,
  updateQuestionService,
} from "@/service/question";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Divider, Popconfirm, Space, Tag, message } from "antd";
import confirm from "antd/es/modal/confirm";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
type PropsType = {
  _id: string;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
};
const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const navigator = useNavigate();

  const { _id, title, isStar, isPublished, answerCount, createdAt } = props;
  const [isStarState, setIsStarState] = useState<boolean>(isStar);
  /* 复制 */
  const { loading: duplicateLoading, run: Duplicate } = useRequest(
    async () => {
      const data = await duplicateQuestionService(_id);
      return data;
    },
    {
      manual: true,
      onSuccess: (res: any) => {
        message.success("复制成功");
        navigator(`/question/edit/${res.id}`);
      },
    }
  );

  /* 标星 */
  const { loading: starLoading, run: handleStar } = useRequest(
    async () => {
      const data = await updateQuestionService(_id, { isStar: !isStarState });
      return data;
    },
    {
      manual: true,
      onSuccess() {
        message.success("标星成功!");
        setIsStarState(!isStarState);
      },
    }
  );

  /* 删除 */
  /* 给每个卡片,在前端标记是否删除了 */
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const { loading: deletedLoading, run: DeleteAction } = useRequest(
    async () => {
      const data = await updateQuestionService(_id, { isDeleted: true });
      return data;
    },
    {
      manual: true,
      onSuccess: (res: any) => {
        message.success("删除成功");
        setIsDeleted(true);
      },
    }
  );
  function Delete() {
    confirm({
      title: "确认删除该问卷?",
      icon: <ExclamationCircleOutlined />,
      okText: "确认",
      cancelText: "取消",
      onOk: DeleteAction,
    });
  }

  /* 删除了,就不渲染 */
  if (isDeleted) return null;
  return (
    <>
      <div className="container bg-white my-5 py-3 rounded-lg hover:shadow-md">
        <div className="flex">
          <div className="flex-1">
            <Link
              to={
                isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`
              }
            >
              <Space className="ml-3">
                {isStarState && <StarFilled style={{ color: "red" }} />}
                {title}
              </Space>
            </Link>
          </div>
          <div className="right flex-1 text-right text-sm">
            <Space className="mr-3">
              {isPublished ? (
                <Tag color="processing">已发布</Tag>
              ) : (
                <Tag color="magenta">未发布</Tag>
              )}
              <span>答卷: {answerCount}</span>
              <span>{createdAt}</span>
            </Space>
          </div>
        </div>
        <Divider style={{ margin: "14px 0" }} />
        <div className="flex">
          <div className="flex-1">
            <Space>
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                onClick={() => navigator(`/question/edit/${_id}`)}
              >
                编辑问卷
              </Button>
              <Button
                type="text"
                size="small"
                icon={<LineChartOutlined />}
                onClick={() => navigator(`/question/stat/${_id}`)}
                disabled={!isPublished}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className="flex-1 text-right">
            <Space>
              <Button
                type="text"
                icon={<StarOutlined />}
                size="small"
                onClick={handleStar}
                disabled={starLoading}
              >
                {isStarState ? "取消标星" : "标星"}
              </Button>
              <Popconfirm
                title="确定复制该问卷？"
                okText="确定"
                cancelText="取消"
                onConfirm={() => Duplicate()}
              >
                <Button type="text" icon={<CopyOutlined />} size="small">
                  复制
                </Button>
              </Popconfirm>
              <Button
                onClick={Delete}
                type="text"
                icon={<DeleteOutlined />}
                size="small"
                className="text-gray-700"
                disabled={deletedLoading}
              >
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
