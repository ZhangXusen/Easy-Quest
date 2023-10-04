/*
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-23 16:31:52
 * @LastEditors: 小国际
 * @LastEditTime: 2023-10-04 21:57:47
 */
import { PropComponent } from "./PropComponent";
import { QuestRadio } from "./QuestRadio";
import { StatComponent } from "./StatComponent";
import { QuestionRadioDefaultProps } from "./type";

export * from "./type";

export default {
  title: "单选",
  type: "questionRadio",
  defaultProps: QuestionRadioDefaultProps,
  Component: QuestRadio,
  PropComponent,
  StatComponent,
};
