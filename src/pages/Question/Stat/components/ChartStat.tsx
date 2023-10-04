import {
  ComponentConfigType,
  getComponentConfigByType,
} from "@/components/QuestComponents";
import { getComponentStatService } from "@/service/stat";
import { useRequest } from "ahooks";
import Title from "antd/es/typography/Title";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-10-04 17:55:51
 * @LastEditors: 小国际
 * @LastEditTime: 2023-10-04 21:42:26
 */
type PropsType = { selectedComponentId: string; selectedComponentType: string };
export const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, selectedComponentType } = props;

  const { id = "" } = useParams();
  const [stat, setStat] = useState<any[]>([]);
  const { loading, run } = useRequest(
    async (questionId, selectedId) => {
      return await getComponentStatService(questionId, selectedId);
    },
    {
      manual: true,
      onSuccess(res) {
        setStat(res.data.data.stat);
        console.log(stat);
      },
    }
  );

  /* 更换选中的组件时，重新获取数据 */
  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId);
  }, [id, selectedComponentId]);

  /* 生成图表 */
  function createChart() {
    if (!selectedComponentId) return <div>未选中组件</div>;
    const component =
      getComponentConfigByType(selectedComponentType) ||
      ({} as ComponentConfigType);
    const { StatComponent } = component;
    if (StatComponent == null) return <div>组件无统计图表</div>;
    return <StatComponent stat={stat} />;
  }
  return (
    <>
      <Title level={3}>图表统计</Title>
      <div>{createChart()}</div>
    </>
  );
};
