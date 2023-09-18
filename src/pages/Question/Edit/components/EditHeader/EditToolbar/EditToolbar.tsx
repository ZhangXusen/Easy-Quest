/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-16 15:34:16
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-17 16:27:50
 */

import { useGetComponentInfo } from "@/hooks/useGetComponentsInfo";
import {
  changeComponentVisible,
  copyComponent,
  deleteSelectedComponent,
  pasteComponent,
  toggleComponentLocked,
} from "@/store/components";
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { useDispatch } from "react-redux";

export const EditToolbar = () => {
  const { selectedId, selectedComponent, copiedComponent } =
    useGetComponentInfo();
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
    </Space>
  );
};
