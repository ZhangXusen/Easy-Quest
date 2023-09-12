import { ListPagination } from "@/components/ListPagination.tsx/ListPagination";
import { ListSearch } from "@/components/ListSearch/ListSearch";
import useLoadQuestListData from "@/hooks/useLoadQuestListData";
import {
  deleteQuestionsService,
  updateQuestionService,
} from "@/service/question";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useRequest, useTitle } from "ahooks";
import { Button, Empty, Space, Spin, Table, Tag, message } from "antd";
import confirm from "antd/es/modal/confirm";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { useState } from "react";

export const Trash = () => {
  useTitle("回收站---超级问卷");
  const {
    loading,
    data = {},
    error,
    refresh,
  } = useLoadQuestListData({ isStar: true, isDeleted: true });
  const { list = [], total = 0 } = data;
  interface DataType {
    _id: string;
    title: string;
    isPublished: boolean;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "发布状态",
      dataIndex: "isPublished",
      render: (isPublished: boolean) =>
        isPublished ? (
          <Tag color="processing">已发布</Tag>
        ) : (
          <Tag color="magenta">未发布</Tag>
        ),
    },
    {
      title: "答卷",
      align: "center",
      dataIndex: "answerCount",
    },
    {
      title: "创建时间",
      align: "center",
      dataIndex: "createdAt",
    },
  ];
  /* 恢复 */
  const { run: Recover } = useRequest(
    async () => {
      for await (const id of selectedRowId) {
        await updateQuestionService(id, { isDeleted: false });
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess: () => {
        message.success("恢复完成!");
        refresh(); //手动刷新
      },
    }
  );

  /* 多选彻底删除 */
  const [selectedRowId, setSelectedRowId] = useState<string[]>([]);
  function handleDelete(): void {
    confirm({
      title: "确认彻底删除该问卷?",
      content: "删除后不可找回.",
      icon: <ExclamationCircleOutlined />,
      okText: "确认",
      cancelText: "取消",
      onOk: Delete,
    });
  }
  const { run: Delete } = useRequest(
    async () => {
      await deleteQuestionsService(selectedRowId);
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess: () => {
        message.success("删除成功");
        refresh();
        setSelectedRowId([]);
      },
    }
  );

  const TableEle = (
    <Table
      columns={columns}
      dataSource={list}
      pagination={false}
      rowKey={(i) => i._id}
      rowSelection={{
        type: "checkbox",
        onChange(selectedRowKeys, selectedRows, info) {
          setSelectedRowId(selectedRowKeys as string[]);
        },
      }}
    />
  );
  return (
    <>
      <div className="header mb-2 flex">
        <div className="left flex-1">
          <Title level={2} className="">
            ♻️回收站
          </Title>
        </div>

        <div className="right flex-1 text-right">
          <ListSearch />
        </div>
      </div>
      <div className="list mb-5">
        <div className="mb-5">
          <Space>
            <Button
              type="primary"
              disabled={selectedRowId.length === 0}
              onClick={Recover}
            >
              恢复
            </Button>

            <Button
              danger
              disabled={selectedRowId.length === 0}
              onClick={handleDelete}
            >
              彻底删除
            </Button>
          </Space>
        </div>

        <div className="text-center">
          <Spin spinning={loading}>
            {!loading && list.length === 0 && <Empty description="暂无数据" />}
            {list.length > 0 && TableEle}
          </Spin>
        </div>
      </div>
      <div className="footer text-center">
        {total > 0 && <ListPagination total={total} />}
      </div>
    </>
  );
};
