import { PropComponent } from "./PropComponent";
import { QuestTextarea } from "./QuestTextarea";
import { QuestionTextareaDefaultProps } from "./type";

export * from "./type";
export default {
  title: "多行文本",
  type: "questionTextarea",
  defaultProps: QuestionTextareaDefaultProps,
  Component: QuestTextarea, // 画布显示的组件
  PropComponent,
};
