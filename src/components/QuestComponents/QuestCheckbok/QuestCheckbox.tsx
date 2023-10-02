/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-23 17:46:20
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-23 17:53:32
 */
import { Checkbox, Space } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { FC } from "react";
import { QuestCheckboxPropsType, QuestionCheckboxDefaultProps } from "./type";

export const QuestCheckbox: FC<QuestCheckboxPropsType> = (
  props: QuestCheckboxPropsType
) => {
  const {
    title,
    vertical,
    list = [],
  } = { ...QuestionCheckboxDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>

      <Space direction={vertical ? "vertical" : "horizontal"}>
        {list.map((item) => {
          const { text, value, checked } = item;
          return (
            <Checkbox checked={checked} value={value} key={value}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};
