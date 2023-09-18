/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-17 20:30:26
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-17 20:33:35
 */
import TextArea from "antd/es/input/TextArea";
import Paragraph from "antd/es/typography/Paragraph";
import { FC } from "react";
import {
  QuestionTextAreaPropsType,
  QuestionTextareaDefaultProps,
} from "./type";

export const QuestTextarea: FC<QuestionTextAreaPropsType> = (
  props: QuestionTextAreaPropsType
) => {
  const { title, placeholder } = {
    ...QuestionTextareaDefaultProps,
    ...props,
  };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder} />
      </div>
    </div>
  );
};
