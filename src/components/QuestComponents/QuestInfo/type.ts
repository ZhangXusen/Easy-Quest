/*
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-17 20:20:03
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-17 20:20:29
 */

export type QuestionInfoPropsType = {
  title?: string;
  desc?: string;
  disabled?: boolean;
  onChange?: (newProps: QuestionInfoPropsType) => void;
};

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: "问卷标题",
  desc: "问卷描述",
};
