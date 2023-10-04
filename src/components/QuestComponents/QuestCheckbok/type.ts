/*
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-23 17:44:18
 * @LastEditors: 小国际
 * @LastEditTime: 2023-10-04 21:31:59
 */
export type OptionType = {
  value: string;
  text: string;
  checked: boolean;
};

export type QuestCheckboxPropsType = {
  title?: string;
  vertical?: boolean;
  list?: OptionType[];
  disabled?: boolean;

  onChange?: (newProps: QuestCheckboxPropsType) => void;
};

export const QuestionCheckboxDefaultProps: QuestCheckboxPropsType = {
  title: "多选标题",
  vertical: false,
  list: [
    { value: "item1", text: "选项1", checked: false },
    { value: "item2", text: "选项2", checked: false },
    { value: "item3", text: "选项3", checked: false },
  ],
};

// 统计组件的属性类型
export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>;
};
