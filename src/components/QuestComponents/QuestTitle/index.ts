import { PropComponent } from "./PropComponent";
import { QuestTitle } from "./QuestTitle";
import { QuestionTitleDefaultProps } from "./type";

export * from "./type";
export default {
  title: "标题",
  type: "questionTitle",
  defaultProps: QuestionTitleDefaultProps,
  Component: QuestTitle,
  PropComponent,
};
