import { Radio, Space } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { FC } from "react";
import { QuestRadioPropsType, QuestionRadioDefaultProps } from "./type";

export const QuestRadio: FC<QuestRadioPropsType> = (
  props: QuestRadioPropsType
) => {
  const {
    title,
    vertical,
    options = [],
    value,
  } = { ...QuestionRadioDefaultProps, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={vertical ? "vertical" : "horizontal"}>
          {options.map((opt) => {
            const { value, text } = opt;

            return (
              <Radio value={value} key={value}>
                {text}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};
