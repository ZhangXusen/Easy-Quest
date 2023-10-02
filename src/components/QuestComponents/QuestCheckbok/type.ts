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
