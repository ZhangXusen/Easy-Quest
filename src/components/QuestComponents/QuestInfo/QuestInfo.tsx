import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { FC } from "react";
import { QuestionInfoPropsType } from "./type";

export const QuestInfo: FC<QuestionInfoPropsType> = (
  props: QuestionInfoPropsType
) => {
  const { title = "问卷标题", desc = "问卷描述" } = props;
  const newDesc = desc?.split("\n");
  return (
    <div className="text-center">
      <Title className="text-2xl">{title}</Title>
      <Paragraph>
        {newDesc.map((d, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {newDesc}
          </span>
        ))}
      </Paragraph>
    </div>
  );
};
