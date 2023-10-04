/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-08-29 15:27:56
 * @LastEditors: 小国际
 * @LastEditTime: 2023-10-04 16:06:53
 */

import { useGetPageInfo } from "@/hooks/useGetPageInfo";
import useLoadQuestData from "@/hooks/useLoadQuestData";
import { useTitle } from "ahooks";
import { Button, Result, Spin } from "antd";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComponentsList } from "./components/ComponentsList";
import { PageStat } from "./components/PageStat";
import { StatHeader } from "./components/StatHeader";

export const Stat: FC = () => {
  useTitle(`问卷编辑-${"超级问卷"}`);
  const nav = useNavigate();
  const { loading } = useLoadQuestData();
  const { isPublished, title } = useGetPageInfo();
  /* 控制组件列表的状态 */
  const [selectedComponentId, setSelectedComponentId] = useState("");
  const [selectedComponentType, setSelectedComponentType] = useState("");
  // 修改标题
  useTitle(`问卷统计-${title}`);
  const LoadingELem = (
    <div className="w-full h-full flex items-center justify-center">
      <Spin />
    </div>
  );

  function getContentEle() {
    if (typeof isPublished === "boolean" && !isPublished)
      return (
        <div className="flex-1">
          <Result
            status="warning"
            title="该页面尚未发布"
            subTitle="Sorry, the page you visited does not exist."
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回
              </Button>
            }
          />
        </div>
      );

    return (
      <div className="my-0 mx-6 flex h-full">
        <div className="w-[320px] mr-6">
          <ComponentsList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className="flex-1 bg-white py-3 px-4">
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className="w-[400px] ml-6 bg-white overflow-hidden py-3 px-4"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f2f5] relative">
      <StatHeader />
      {loading && LoadingELem}
      {!loading && (
        <div className="flex-auto py-3 px-0 h-stat-head">{getContentEle()}</div>
      )}
    </div>
  );
};
