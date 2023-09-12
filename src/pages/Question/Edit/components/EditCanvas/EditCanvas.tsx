/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-06 15:47:05
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-06 15:53:04
 */

import { QuestInput } from "@/components/QuestComponents/QuestInput/QuestInput";
import { QuestTitle } from "@/components/QuestComponents/QuestTitle/QuestTitle";
import { FC } from "react";

export const EditCanvas: FC = () => {
  return (
    <div className="bg-white min-h-full overflow-hidden">
      <div className="m-3 border-2 border-solid border-white p-3 rounded hover:border-slate-300">
        <div className="pointer-events-none">
          <QuestTitle></QuestTitle>
        </div>
      </div>
      <div className="m-3 border-2 border-solid border-white p-3 rounded hover:border-slate-300">
        <div className="pointer-events-none">
          <QuestInput></QuestInput>
        </div>
      </div>
    </div>
  );
};
