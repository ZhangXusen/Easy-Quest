import { useGetComponentInfo } from "@/hooks/useGetComponentsInfo";
import { getQuestStatListService } from "@/service/stat";
import { useRequest } from "ahooks";
import { Pagination, Spin, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { useParams } from "react-router-dom";

/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-10-04 16:05:25
 * @LastEditors: 小国际
 * @LastEditTime: 2023-10-04 17:50:40
 */
type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};
export const PageStat = (props: PropsType) => {
  const {
    selectedComponentId,
    setSelectedComponentId,
    setSelectedComponentType,
  } = props;
  const { id = "" } = useParams();
  /* 分页相关 */
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  /* 发送请求获取数据 */
  const { loading } = useRequest(
    async () => {
      const res = await getQuestStatListService(id, {
        page: pageNum,
        pageSize: pageSize,
      });
      return res;
    },
    {
      refreshDeps: [pageNum, pageSize, id],
      onSuccess: (res) => {
        // console.log(res);
        const { total, list = [] } = res.data.data;
        setTotal(total);
        setList(list);
      },
    }
  );

  const { componentList } = useGetComponentInfo();
  const columns = componentList.map((item) => {
    const { fe_id, title, props, type } = item;

    return {
      title: (
        <div
          className="cursor-pointer"
          onClick={() => {
            setSelectedComponentId(fe_id);
            setSelectedComponentType(type);
          }}
        >
          <span
            className={`${
              fe_id === selectedComponentId ? "text-[#1890ff]" : ""
            }`}
          >
            {props!.title || title}
          </span>
        </div>
      ),
      dataIndex: fe_id,
    };
  });

  const dataSourceList = list.map((i: any) => ({ ...i, key: i._id }));
  const TableEle = (
    <>
      <Table
        columns={columns}
        dataSource={dataSourceList}
        pagination={false}
      ></Table>
      <div className="mt-4 text-center">
        <Pagination
          total={total}
          pageSize={pageSize}
          current={pageNum}
          onChange={(pageNum) => {
            setPageNum(pageNum);
          }}
          onShowSizeChange={(pageNum, pageSize) => {
            setPageNum(pageNum);
            setPageSize(pageSize);
          }}
        ></Pagination>
      </div>
    </>
  );
  return (
    <div>
      <Title level={3}>答卷数量:{!loading && total}</Title>
      {loading && (
        <div className="text-center">
          <Spin />
        </div>
      )}
      {!loading && TableEle}
    </div>
  );
};
