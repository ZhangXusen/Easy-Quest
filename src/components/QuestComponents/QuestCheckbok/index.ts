import { PropComponent } from "./PropComponent";
import { QuestCheckbox } from "./QuestCheckbox";
import { QuestionCheckboxDefaultProps } from "./type";

export * from "./type";

export default {
  title: "多选",
  type: "questionCheckbox", // 要和后端统一好
  Component: QuestCheckbox,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
};
