import { PropComponent } from "./PropComponent";
import { QuestParagraph } from "./QuestParagraph";
import { QuestionParagraphDefaultProps } from "./type";
export * from "./type";
export default {
  title: "段落",
  type: "questionParagraph", //和后端统一
  Component: QuestParagraph, //画布显示的组件
  defaultProps: QuestionParagraphDefaultProps, //默认的属性
  PropComponent, //修改属性的组件
};
