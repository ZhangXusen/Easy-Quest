/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-16 15:39:13
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-27 20:42:32
 */
import { useGetComponentInfo } from "@/hooks/useGetComponentsInfo";
import { useGetPageInfo } from "@/hooks/useGetPageInfo";
import { updateQuestionService } from "@/service/question";
import { changeTitle } from "@/store/pageInfo";
import { EditOutlined, LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDebounceEffect, useKeyPress, useRequest } from "ahooks";
import { Button, Input, Space, message } from "antd";
import Title from "antd/es/typography/Title";
import { ChangeEvent, FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { EditToolbar } from "./EditToolbar/EditToolbar";
const TitleEle: FC = () => {
  const { title } = useGetPageInfo();
  const [edit, setEdit] = useState<boolean>(false);
  const dispatch = useDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value.trim();
    if (!newTitle) return;
    dispatch(changeTitle(newTitle));
  }
  if (edit) {
    return (
      <Input
        value={title}
        onChange={handleChange}
        onPressEnter={() => {
          setEdit(false);
        }}
        onBlur={() => {
          setEdit(false);
        }}
      />
    );
  }
  return (
    <Space>
      <Title level={3}>{title}</Title>
      <Button
        icon={<EditOutlined />}
        type="text"
        onClick={() => {
          setEdit(true);
        }}
      ></Button>
    </Space>
  );
};

/* 保存按钮 */
const SaveButton: FC = () => {
  const { id } = useParams();
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...pageInfo, componentList });
    },
    { manual: true }
  );
  useKeyPress(["ctrl.s"], (event: KeyboardEvent) => {
    event.preventDefault();
    if (!loading) save();
  });

  useDebounceEffect(
    () => {
      save();
    },
    [componentList, pageInfo],
    { wait: 1000 }
  );

  return (
    <Button
      onClick={save}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      保存
    </Button>
  );
};
/* 发布按钮 */
const PublishButton: FC = () => {
  const { id } = useParams();
  const { componentList = [] } = useGetComponentInfo();
  const navigator = useNavigate();
  const pageInfo = useGetPageInfo();

  const { loading, run: publish } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
        isPublished: true,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success("发布成功");
        navigator("/question/stat/" + id);
      },
    }
  );
  return (
    <Button type="primary" onClick={publish} disabled={loading}>
      发布
    </Button>
  );
};
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
            <TitleEle />
          </Space>
        </div>
        <div className="flex-1 text-center">
          <EditToolbar />
        </div>
        <div className="flex-1 text-right">
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
};
