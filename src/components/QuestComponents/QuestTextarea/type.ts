/*
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-06 15:42:40
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-17 20:32:56
 */
export type QuestionTextAreaPropsType = {
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (newProps: QuestionTextAreaPropsType) => void;
};

export const QuestionTextareaDefaultProps: QuestionTextAreaPropsType = {
  title: "输入框标题",
  placeholder: "请输入......",
};
