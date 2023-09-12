import useLoadQuestData from "@/hooks/useLoadQuestData";
import { useTitle } from "ahooks";
import { Spin } from "antd";
import { FC } from "react";
import { EditCanvas } from "./components/EditCanvas/EditCanvas";

export const Edit: FC = () => {
  useTitle(`问卷编辑-${"超级问卷"}`);
  const { loading, data } = useLoadQuestData();
  return (
    <Spin spinning={loading}>
      <div className="flex flex-col h-screen bg-slate-200">
        <div>Header</div>
        <div className="flex-auto py-3 px-0">
          <div className="flex h-full mx-6 my-0">
            <div className="left w-72 bg-white pt-2 pb-0 px-2 rounded-r-xl overflow-auto">
              Left
            </div>
            <div className="main flex-1 relative h-full overflow-hidden">
              <div className="canvas-wrapper absolute w-[400px] h-[640px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto shadow-md">
                <EditCanvas></EditCanvas>
              </div>
            </div>
            <div className="right w-80 bg-white pt-2 pb-0 px-2 rounded-l-xl">
              Right
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};
