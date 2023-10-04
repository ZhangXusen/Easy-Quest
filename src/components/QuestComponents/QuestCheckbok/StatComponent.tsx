import { FC } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { QuestionCheckboxStatPropsType } from "./type";

export const StatComponent: FC<QuestionCheckboxStatPropsType> = ({
  stat,
}: QuestionCheckboxStatPropsType) => {
  return (
    <div className="w-[400px] h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={400}
          height={300}
          margin={{ top: 5, left: 0, right: 30, bottom: 5 }}
          data={stat}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
