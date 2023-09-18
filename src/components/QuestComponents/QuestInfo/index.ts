import { PropComponent } from "./PropComponent";
import { QuestInfo } from "./QuestInfo";
import { QuestionInfoDefaultProps } from "./type";

export * from "./type";

export default {
  title: "问卷信息",
  type: "questionInfo",
  Component: QuestInfo,
  PropComponent,
  defaultProps: QuestionInfoDefaultProps,
};
