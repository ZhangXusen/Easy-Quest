import { SortableContainer } from "@/components/DragSortable/SortableContainer";
import { SortableItem } from "@/components/DragSortable/SortableItem";
import { useGetComponentInfo } from "@/hooks/useGetComponentsInfo";
import {
  changeComponentTitle,
  changeComponentVisible,
  changeSelectedId,
  moveComponent,
  toggleComponentLocked,
} from "@/store/components";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Input, Space, message } from "antd";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";

export const Layer = () => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();
  //记录当前正在修改标题的组件
  const [changingTitleId, setChangingTitleId] = useState("");
  /* 点击选中组件 */
  function handleTitleClick(id: string) {
    const CurComp = componentList.find((c) => c.fe_id === id);
    if (CurComp && CurComp.isHidden) {
      message.info("不能选中隐藏的组件");
      return;
    }
    if (id !== selectedId) {
      // 当前组件未被选中，执行选中
      dispatch(changeSelectedId(id));
      setChangingTitleId("");
      return;
    }
    // 点击修改标题
    setChangingTitleId(id);
  }
  /* 修改标题 */
  function changeTitle(e: ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value.trim();
    if (!newTitle) return;
    if (!selectedId) return;
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }));
  }
  function changeHidden(fe_id: string, isHidden: boolean): void {
    dispatch(changeComponentVisible({ id: fe_id, isHidden }));
  }
  function changeLocked(fe_id: string): void {
    dispatch(toggleComponentLocked({ id: fe_id }));
  }

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
      {componentList.map((c) => {
        const { fe_id, title, isHidden, isLocked } = c;

        return (
          <SortableItem id={fe_id} key={fe_id}>
            <div className="py-2 border-b border-gray-800 flex group">
              <div
                className="flex-auto leading-loose"
                onClick={() => handleTitleClick(fe_id)}
              >
                {fe_id === changingTitleId ? (
                  <Input
                    value={title}
                    onChange={(e) => changeTitle(e)}
                    onBlur={() => setChangingTitleId("")}
                    onPressEnter={() => setChangingTitleId("")}
                  ></Input>
                ) : (
                  title
                )}
              </div>
              <div className="w-14 text-end">
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? "primary" : "text"}
                    onClick={() => changeHidden(fe_id, !isHidden)}
                    className={`${
                      !isHidden ? "opacity-60 group-hover:opacity-100" : ""
                    }`}
                  />
                  <Button
                    size="small"
                    shape="circle"
                    icon={<LockOutlined />}
                    type={isLocked ? "primary" : "text"}
                    onClick={() => changeLocked(fe_id)}
                    className={`${
                      !isLocked ? "opacity-60 group-hover:opacity-100" : ""
                    }`}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        );
      })}
    </SortableContainer>
  );
};
