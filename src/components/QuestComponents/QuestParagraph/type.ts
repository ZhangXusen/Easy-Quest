export type QuestionParagraphPropsType = {
  text?: string;
  center?: boolean;
  disabled?: boolean;
  onChange?: (newProps: QuestionParagraphPropsType) => void;
};

export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: "段落大意...",
  center: false,
};
