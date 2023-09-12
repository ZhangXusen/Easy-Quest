import useLoadQuestData from "@/hooks/useLoadQuestData";
import { useTitle } from "ahooks";
import { Spin } from "antd";
import { FC } from "react";

export const Stat: FC = () => {
  useTitle(`问卷编辑-${"超级问卷"}`);
  const { loading, questionData } = useLoadQuestData();
  return <Spin spinning={loading}>Stat</Spin>;
};
