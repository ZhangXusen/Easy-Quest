/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-06 15:30:18
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-06 15:40:31
 */
import Title from "antd/es/typography/Title";
import { FC } from "react";
import { QuestTitlePropsType, QuestionTitleDefaultProps } from "./type";

export const QuestTitle: FC<QuestTitlePropsType> = (
  props: QuestTitlePropsType
) => {
  const {
    text = "",
    level = 1,
    center = false,
  } = { ...QuestionTitleDefaultProps, ...props };
  const getFontSize = (level: number) => {
    switch (level) {
      case 1:
        return "24px";
      case 2:
        return "20px";
      case 3:
        return "16px";
      default:
        return "16px";
    }
  };
  return (
    <div>
      <Title
        level={level}
        className={`${
          center ? "text-center" : "text-start"
        } m-0 mb-1 ${getFontSize(level)}`}
      >
        {text}
      </Title>
    </div>
  );
};
