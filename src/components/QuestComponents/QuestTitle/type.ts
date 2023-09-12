export type QuestTitlePropsType = {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  center?: boolean;
};
export const QuestionTitleDefaultProps: QuestTitlePropsType = {
  text: "一级标题",
  level: 1,
  center: false,
};
