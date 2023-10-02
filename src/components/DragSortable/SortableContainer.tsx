/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-27 17:11:40
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-27 17:22:48
 */
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FC } from "react";
type PropsType = {
  children: JSX.Element | JSX.Element[];
  items: Array<{ id: string; [key: string]: any }>;
  onDragEnd: (oldIndex: number, newIndex: number) => void;
};
export const SortableContainer: FC<PropsType> = (props: PropsType) => {
  const { children, items, onDragEnd } = props;
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        //活动限制 ，鼠标在8像素内移动，应该是误触，则不触发拖拽
        distance: 8, // 8px
      },
    })
  );
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over == null) return;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((c) => c.fe_id === active.id); //组件原本的位置
      const newIndex = items.findIndex((c) => c.fe_id === over.id); //组件新的位置
      onDragEnd(oldIndex, newIndex); //供外部组件使用oldIndex,newIndex
    }
  }
  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};
