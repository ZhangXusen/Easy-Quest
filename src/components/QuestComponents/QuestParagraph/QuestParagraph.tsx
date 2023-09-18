import Typography from "antd/es/typography/Typography";
import { FC } from "react";
import {
  QuestionParagraphDefaultProps,
  QuestionParagraphPropsType,
} from "./type";

/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-17 19:47:40
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-17 20:15:47
 */
export const QuestParagraph: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType
) => {
  const { text = "", center = false } = {
    ...QuestionParagraphDefaultProps,
    ...props,
  };
  const newText = text.split("\n");
  return (
    <Typography className={`${center ? "text-center" : "text-start"} mb-0`}>
      {newText.map((text, idx) => {
        return (
          <span key={idx}>
            {idx > 0 && <br />}
            {text}
          </span>
        );
      })}
    </Typography>
  );
};
