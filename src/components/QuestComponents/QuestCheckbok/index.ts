/*
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-23 17:53:50
 * @LastEditors: 小国际
 * @LastEditTime: 2023-10-04 21:39:08
 */
import { PropComponent } from "./PropComponent";
import { QuestCheckbox } from "./QuestCheckbox";
import { StatComponent } from "./StatComponent";
import { QuestionCheckboxDefaultProps } from "./type";

export * from "./type";

export default {
  title: "多选",
  type: "questionCheckbox", // 要和后端统一好
  Component: QuestCheckbox,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
  StatComponent,
};
