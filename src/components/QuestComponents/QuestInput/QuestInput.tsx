import Input from "antd/es/input/Input";
import Paragraph from "antd/es/typography/Paragraph";
import { FC } from "react";
import { QuestionInputDefaultProps, QuestionInputPropsType } from "./type";

/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-06 15:30:39
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-06 15:45:00
 */
export const QuestInput: FC<QuestionInputPropsType> = (
  props: QuestionInputPropsType
) => {
  const { title, placeholder } = {
    ...QuestionInputDefaultProps,
    ...props,
  };
  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  );
};
