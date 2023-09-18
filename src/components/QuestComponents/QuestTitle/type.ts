export type QuestTitlePropsType = {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  center?: boolean;
  onChange?: (newProps: QuestTitlePropsType) => void;
  disabled?: boolean;
};
export const QuestionTitleDefaultProps: QuestTitlePropsType = {
  text: "二级标题",
  level: 2,
  center: false,
};
