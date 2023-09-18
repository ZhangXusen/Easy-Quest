/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-06 15:47:05
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-17 15:38:48
 */

import { getComponentConfigByType } from "@/components/QuestComponents";
import { useGetComponentInfo } from "@/hooks/useGetComponentsInfo";
import useKeyPressBindCanvas from "@/hooks/useKeyPressBindCanvas";
import { ComponentsInfoType, changeSelectedId } from "@/store/components";
import { FC } from "react";
import { useDispatch } from "react-redux";

type PropType = {
  loading?: boolean;
};
function getComponent(componentInfo: ComponentsInfoType) {
  const { type, props } = componentInfo;
  const ComponentConfig = getComponentConfigByType(type);
  if (ComponentConfig == null) return null;
  const { Component } = ComponentConfig;
  return <Component {...props} />;
}

export const EditCanvas: FC<PropType> = (props: PropType) => {
  const { componentList, selectedId } = useGetComponentInfo();
  console.log("id", selectedId);
  // console.log("componentList========>\n", componentList);
  /* 选中组件，共享状态 */
  const dispatch = useDispatch();
  function handleClick(e: MouseEvent, id: string) {
    // 阻止事件冒泡
    e.stopPropagation();
    dispatch(changeSelectedId(id));
  }

  useKeyPressBindCanvas();
  return (
    <div className="bg-white min-h-full overflow-hidden">
      {componentList
        .filter((c) => !c.isHidden)
        .map((item, index) => {
          const { fe_id, isLocked } = item;
          return (
            <div
              key={fe_id}
              className={`${
                fe_id === selectedId
                  ? "m-3 border-2 border-solid p-3 rounded border-blue-300 hover:border-blue-300"
                  : "m-3 border-2 border-solid border-white p-3 rounded hover:border-slate-300"
              } ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={(e: any) => handleClick(e, fe_id)}
            >
              <div className="pointer-events-none">{getComponent(item)}</div>
            </div>
          );
        })}
    </div>
  );
};
