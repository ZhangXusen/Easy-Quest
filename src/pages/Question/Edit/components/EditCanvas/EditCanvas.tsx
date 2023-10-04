/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-06 15:47:05
 * @LastEditors: 小国际
 * @LastEditTime: 2023-10-04 15:24:11
 */

import { SortableContainer } from "@/components/DragSortable/SortableContainer";
import { SortableItem } from "@/components/DragSortable/SortableItem";
import { getComponentConfigByType } from "@/components/QuestComponents";
import { useGetComponentInfo } from "@/hooks/useGetComponentsInfo";
import useKeyPressBindCanvas from "@/hooks/useKeyPressBindCanvas";
import {
  ComponentsInfoType,
  changeSelectedId,
  moveComponent,
} from "@/store/components";
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

  /* 排序相关逻辑 */
  //SortableContainer组件items的每个组件都需要id
  const componentListWithId = componentList.map((c) => {
    return { ...c, id: c.fe_id };
  });

  function handleDragEnd(oldIndex: number, newIndex: number): void {
    dispatch(moveComponent({ oldIndex, newIndex }));
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className="bg-white min-h-full overflow-hidden">
        {componentList
          .filter((c) => !c.isHidden)
          .map((item) => {
            const { fe_id, isLocked } = item;
            return (
              <SortableItem id={fe_id} key={fe_id}>
                <div
                  className={`${
                    fe_id === selectedId
                      ? "m-3 border-2 border-solid p-3 rounded border-blue-300 hover:border-blue-300"
                      : "m-3 border-2 border-solid border-white p-3 rounded hover:border-slate-300"
                  } ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={(e: any) => handleClick(e, fe_id)}
                >
                  <div className="pointer-events-none">
                    {getComponent(item)}
                  </div>
                </div>
              </SortableItem>
            );
          })}
      </div>
    </SortableContainer>
  );
};
