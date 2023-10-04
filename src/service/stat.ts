import axios from "axios";
import { ResDataType } from "./request";
/*
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-10-04 15:58:04
 * @LastEditors: 小国际
 * @LastEditTime: 2023-10-04 16:01:54
 */
export async function getQuestStatListService(
  questionId: string,
  opt: { page: number; pageSize: number }
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}`;
  return (await axios.get(url, { params: opt })) as ResDataType;
}
