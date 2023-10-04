/*
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-18 22:49:37
 * @LastEditors: 小国际
 * @LastEditTime: 2023-10-04 21:07:25
 */
export type QuestRadioPropsType = {
  title?: string;
  vertical?: boolean;
  options?: OptionType[];
  value?: string; //默认选中的值
  onChange?: (newProps: QuestRadioPropsType) => void;
  disabled?: boolean;
};

export type OptionType = {
  value: string; //label
  text: string;
};

export const QuestionRadioDefaultProps: QuestRadioPropsType = {
  title: "单选标题",
  vertical: false,
  options: [
    { value: "item1", text: "选项1" },
    { value: "item2", text: "选项2" },
    { value: "item3", text: "选项3" },
  ],
  value: "",
};

// 统计组件的属性类型
export type QuestionRadioStatPropsType = {
  stat: Array<{ name: string; count: number }>;
};
