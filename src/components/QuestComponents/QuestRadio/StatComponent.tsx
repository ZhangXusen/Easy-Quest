import Title from "antd/es/typography/Title";
import { FC, useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { QuestionRadioStatPropsType } from "./type";

/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-10-04 20:56:54
 * @LastEditors: 小国际
 * @LastEditTime: 2023-10-04 22:22:25
 */
export const StatComponent: FC<QuestionRadioStatPropsType> = (
  props: QuestionRadioStatPropsType
) => {
  const { stat = [] } = props;
  const sum = useMemo(() => {
    let s = 0;
    stat.forEach((i) => (s += i.count));
    return s;
  }, [stat]);
  return (
    <div className="w-[400px] h-[300px]">
      <Title level={3}>单选选项: {sum}</Title>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={stat}
            dataKey="count"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
            label={(i) => `${i.name} :${i.count}`}
          />
          {stat.map((i, idx) => {
            return <Cell key={idx} fill={"#8884d8"} />;
          })}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
