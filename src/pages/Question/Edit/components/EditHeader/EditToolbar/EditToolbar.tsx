/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-16 15:34:16
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-27 22:29:46
 */

import { useGetComponentInfo } from "@/hooks/useGetComponentsInfo";
import {
  changeComponentVisible,
  copyComponent,
  deleteSelectedComponent,
  moveComponent,
  pasteComponent,
  toggleComponentLocked,
} from "@/store/components";
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { ActionCreators as UndoActionCreators } from "redux-undo";
export const EditToolbar = () => {
  const { selectedId, selectedComponent, copiedComponent, componentList } =
    useGetComponentInfo();
  const componentLength = componentList.length;
  const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId);
  const isFirst = selectedIndex <= 0;
  const isLast = selectedIndex + 1 >= componentLength;
  const dispatch = useDispatch();
  function handleDelete() {
    dispatch(deleteSelectedComponent());
  }
  /* 隐藏组件 */
  function handleHidden() {
    dispatch(changeComponentVisible({ id: selectedId, isHidden: true }));
  }
  /* 锁定 */
  const { isLocked } = selectedComponent || {};
  function handleLocked() {
    dispatch(toggleComponentLocked({ id: selectedId }));
  }

  /* 复制 */
  function handleCopy() {
    dispatch(copyComponent());
  }
  /* 粘贴 */
  function handlePaste() {
    dispatch(pasteComponent());
  }

  /* 上移，下移 */

  function moveUp() {
    if (isFirst) return;
    dispatch(
      moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 })
    );
  }
  function moveDown() {
    if (isLast) return;
    dispatch(
      moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 })
    );
  }

  /* 撤销、重做 */
  // 撤销
  function undo() {
    dispatch(UndoActionCreators.undo());
  }

  // 重做
  function redo() {
    dispatch(UndoActionCreators.redo());
  }
  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        ></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={handleHidden}
        ></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLocked}
          type={isLocked ? "primary" : "default"}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button
          shape="circle"
          icon={<CopyOutlined />}
          onClick={handleCopy}
        ></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={copiedComponent == null}
        ></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button
          shape="circle"
          icon={<UpOutlined />}
          onClick={moveUp}
          disabled={isFirst}
        ></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          onClick={moveDown}
          disabled={isLast}
        ></Button>
      </Tooltip>

      <Tooltip title="撤销">
        <Button shape="circle" onClick={undo} icon={<UndoOutlined />} />
      </Tooltip>

      <Tooltip title="重做">
        <Button shape="circle" onClick={redo} icon={<RedoOutlined />} />
      </Tooltip>
    </Space>
  );
};
