/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-08-29 15:27:56
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-17 20:47:22
 */
import useLoadQuestData from "@/hooks/useLoadQuestData";
import { changeSelectedId } from "@/store/components";
import { useTitle } from "ahooks";
import { Spin } from "antd";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { EditCanvas } from "./components/EditCanvas/EditCanvas";
import { EditHeader } from "./components/EditHeader/EditHeader";
import { LeftPanel } from "./components/LeftPanel/LeftPanel";
import { RightPanel } from "./components/RightPanel/RightPanel";

export const Edit: FC = () => {
  useTitle(`问卷编辑-${"超级问卷"}`);
  const { loading } = useLoadQuestData();
  const dispatch = useDispatch();
  function clearSelected() {
    dispatch(changeSelectedId(""));
  }
  return (
    <Spin spinning={loading}>
      <div className="flex flex-col h-screen bg-slate-200">
        <div>
          <EditHeader />
        </div>
        <div className="flex-auto py-3 px-0 overflow-auto">
          <div className="flex h-full mx-6 my-0">
            <div className="left w-72 bg-white pt-2 pb-0 px-2 rounded-r-xl overflow-auto">
              <LeftPanel />
            </div>
            <div
              className="main flex-1 relative h-full overflow-hidden"
              onClick={clearSelected}
            >
              <div className="canvas-wrapper absolute w-[400px] h-[640px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto shadow-md">
                <EditCanvas></EditCanvas>
              </div>
            </div>
            <div className="right w-80 bg-white pt-2 pb-0 px-2 rounded-l-xl">
              <RightPanel />
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};
