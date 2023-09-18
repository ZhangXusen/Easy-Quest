/*
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-10 11:21:37
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-16 11:11:39
 */
import { PropComponent } from "./PropComponent";
import { QuestInput } from "./QuestInput";
import { QuestionInputDefaultProps } from "./type";
export * from "./type";
export default {
  title: "输入框",
  type: "questionInput", //和后端统一
  Component: QuestInput, //画布显示的组件
  defaultProps: QuestionInputDefaultProps, //默认的属性
  PropComponent, //修改属性的组件
};
