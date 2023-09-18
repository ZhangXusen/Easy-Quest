import { FC } from "react";
/*
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-10 11:25:22
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-17 20:40:39
 */

import QuestInfoConfig, { QuestionInfoPropsType } from "./QuestInfo";
import QuestInputConfig, { QuestionInputPropsType } from "./QuestInput";
import QuestParagraphConfig, {
  QuestionParagraphPropsType,
} from "./QuestParagraph";
import QuestTextareaConfig, {
  QuestionTextAreaPropsType,
} from "./QuestTextarea";
import QuestTitleConfig, { QuestTitlePropsType } from "./QuestTitle";

/* 各个组件的 prop 的type */
export type ComponentPropsType = QuestionInputPropsType &
  QuestTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextAreaPropsType;
/* 每个组件导出的配置 的type */
export type ComponentConfigType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
  PropComponent: FC<ComponentPropsType>;
};

/* 所有组件的配置的列表 */
const ComponentConfigList: ComponentConfigType[] = [
  QuestInputConfig,
  QuestTitleConfig,
  QuestParagraphConfig,
  QuestInfoConfig,
  QuestTextareaConfig,
];
/* 组件分组 */
export const ComponentConfigGroup = [
  {
    groupId: "textGroup",
    groupName: "文本显示",
    components: [QuestInfoConfig, QuestTitleConfig, QuestParagraphConfig],
  },
  {
    groupId: "inputGroup",
    groupName: "用户输入",
    components: [QuestInputConfig, QuestTextareaConfig],
  },
];
export const getComponentConfigByType = (type: string) => {
  return ComponentConfigList.find((c) => c.type === type);
};
