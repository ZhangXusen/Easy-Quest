import {
  copyComponent,
  deleteSelectedComponent,
  pasteComponent,
  selectNextComponent,
  selectPrevComponent,
} from "@/store/components";
import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import { ActionCreators as UndoActionCreators } from "redux-undo";

/*
 * @Description: 绑定画布的快捷键
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-17 16:44:12
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-17 19:34:08
 */
export default function useKeyPressBindCanvas() {
  const dispatch = useDispatch();
  /* 删除组件 */
  useKeyPress(["backspace", "delete"], () => {
    if (!isActiveElementValid()) return;
    dispatch(deleteSelectedComponent());
  });
  /* 复制 */
  useKeyPress(["ctrl.c", "meta.c"], () => {
    if (!isActiveElementValid()) return;
    dispatch(copyComponent());
  });
  // 快捷键粘贴组件
  useKeyPress(["ctrl.v", "meta.v"], () => {
    if (!isActiveElementValid()) return;
    dispatch(pasteComponent());
  });
  // 选中上一个组件
  useKeyPress("uparrow", () => {
    if (!isActiveElementValid()) return;
    dispatch(selectPrevComponent());
  });

  // 选中下一个组件
  useKeyPress("downarrow", () => {
    if (!isActiveElementValid()) return;
    dispatch(selectNextComponent());
  });
  // 撤销
  useKeyPress(
    ["ctrl.z", "meta.z"],
    () => {
      if (!isActiveElementValid()) return;
      dispatch(UndoActionCreators.undo());
    },
    {
      exactMatch: true, // 严格匹配:必须只按了ctrl+z才能触发
    }
  );
  // 重做
  useKeyPress(["ctrl.shift.z", "meta.shift.z"], () => {
    if (!isActiveElementValid()) return;
    dispatch(UndoActionCreators.redo());
  });
}
/* 判断当前鼠标聚焦的元素是否合法 */
function isActiveElementValid() {
  const activeElement = document.activeElement;
  if (activeElement === document.body) return true; // 光标没有 focus 到 input

  if (activeElement?.matches("div[role='button']")) return true; //是否为dnd的拖拽元素
  return false;
}
