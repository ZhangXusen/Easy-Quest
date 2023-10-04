import axios from "axios";
import { ResDataType } from "./request";
/*
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-10-04 15:58:04
 * @LastEditors: 小国际
 * @LastEditTime: 2023-10-04 16:04:14
 */
export async function getQuestStatListService(
  questionId: string,
  opt: { page: number; pageSize: number }
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}`;
  return (await axios.get(url, { params: opt })) as ResDataType;
}

// 获取组件统计数据汇总
export async function getComponentStatService(
  questionId: string,
  componentId: string
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}/${componentId}`;

  return (await axios.get(url)) as ResDataType;
}
