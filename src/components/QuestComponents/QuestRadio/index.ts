import { PropComponent } from "./PropComponent";
import { QuestRadio } from "./QuestRadio";
import { QuestionRadioDefaultProps } from "./type";

export * from "./type";

export default {
  title: "单选",
  type: "questionRadio",
  defaultProps: QuestionRadioDefaultProps,
  Component: QuestRadio,
  PropComponent,
};
