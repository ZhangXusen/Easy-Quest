/*
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-06 15:42:40
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-06 15:42:45
 */
export type QuestionInputPropsType = {
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (newProps: QuestionInputPropsType) => void;
};

export const QuestionInputDefaultProps: QuestionInputPropsType = {
  title: "输入框标题",
  placeholder: "请输入......",
};
