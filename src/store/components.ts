import { PayloadAction, nanoid } from "@reduxjs/toolkit";
/*
 * @Description: 
import { produce } from "immer";
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-10 11:17:38
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-27 17:44:05
 */
import { ComponentPropsType } from "@/components/QuestComponents";
import { arrayMove } from "@dnd-kit/sortable";
import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import cloneDeep from "lodash.clonedeep";
import { getNextSelectedId, insertNewComponent } from "./utils";

export type ComponentsInfoType = {
  fe_id: string; // Todo
  type: string;
  title: string;
  isLocked?: boolean;
  isHidden?: boolean;
  props: ComponentPropsType;
};
export type ComponentStateType = {
  componentList: Array<ComponentsInfoType>;
  selectedId: string;
  copiedComponent: ComponentsInfoType | null;
};

const INIT_STATE: ComponentStateType = {
  componentList: [],
  selectedId: "",
  copiedComponent: null,
};
export const ComponentsSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    /* 重置所有组件 */
    resetAllComponents: (
      state: ComponentStateType,
      action: PayloadAction<ComponentStateType>
    ) => {
      return action.payload;
    },
    /* 修改selectedId: 使用immer,防止state不可变性 */
    changeSelectedId: produce(
      (draft: ComponentStateType, { payload }: PayloadAction<string>) => {
        draft.selectedId = payload;
      }
    ),
    addComponent: produce(
      (
        draft: ComponentStateType,
        { payload }: PayloadAction<ComponentsInfoType>
      ) => {
        // 如果画布中已经选中了组件，则放在选中组件的下面，如果画布中没有选中的组件，则放在最下面。
        const { selectedId, componentList } = draft;
        const index = componentList.findIndex(
          (item) => item.fe_id === selectedId
        );
        if (index < 0) {
          //未选中
          componentList.push(payload);
        } else {
          //有选中的,插入到index后面
          componentList.splice(index + 1, 0, payload);
        }
        //选中新插入的组件
        draft.selectedId = payload.fe_id;
      }
    ),
    /* 更改组件属性 */
    changeComponentProps: produce(
      (
        draft: ComponentStateType,
        { payload }: PayloadAction<{ id: string; newProps: ComponentPropsType }>
      ) => {
        const { id, newProps } = payload;
        const CurComponent = draft.componentList.find((c) => c.fe_id === id);
        if (CurComponent) {
          CurComponent.props = { ...CurComponent.props, ...newProps };
        }
      }
    ),
    /* 删除选中的组件 */
    deleteSelectedComponent: produce((draft: ComponentStateType) => {
      const index = draft.componentList.findIndex(
        (c) => c.fe_id === draft.selectedId
      );
      const nextSelectedId = getNextSelectedId(
        draft.componentList[index].fe_id,
        draft.componentList
      );
      draft.selectedId = nextSelectedId;
      draft.componentList.splice(index, 1);
    }),
    /* 隐藏/显示组件 */
    changeComponentVisible: produce(
      (
        draft: ComponentStateType,
        { payload }: PayloadAction<{ id: string; isHidden: boolean }>
      ) => {
        const { componentList = [] } = draft;
        /* 切换selectedId，让右侧属性面板也更换 */
        let nextSelectedId = "";
        if (payload.isHidden) {
          //要隐藏
          nextSelectedId = getNextSelectedId(payload.id, componentList);
        } else {
          //要显示
          nextSelectedId = payload.id;
        }

        draft.selectedId = nextSelectedId;
        const CurComponent = componentList.find((c) => c.fe_id === payload.id);
        if (CurComponent) {
          CurComponent.isHidden = payload.isHidden;
        }
      }
    ),
    /* 锁定/解锁组件 */
    toggleComponentLocked: produce(
      (
        draft: ComponentStateType,
        { payload }: PayloadAction<{ id: string }>
      ) => {
        const component = draft.componentList.find(
          (c) => c.fe_id === payload.id
        );
        if (component) {
          component.isLocked = !component.isLocked;
        }
      }
    ),
    /* 复制当前选中的组件 */
    copyComponent: produce((draft: ComponentStateType) => {
      const { selectedId, componentList } = draft;
      const selectedComponent = componentList.find(
        (c) => c.fe_id === selectedId
      );
      if (selectedComponent == null) return;
      /* 深拷贝 */
      draft.copiedComponent = cloneDeep(selectedComponent);
    }),
    /* 粘贴组件 */
    pasteComponent: produce((draft: ComponentStateType) => {
      const { copiedComponent, componentList = [] } = draft;
      if (copiedComponent == null) return;
      /* 修改组件fe_id */
      copiedComponent.fe_id = nanoid();
      //插入componentList
      insertNewComponent(draft, copiedComponent);
    }),
    /* 选中上一个组件 */
    selectPrevComponent: produce((draft: ComponentStateType) => {
      const { selectedId, componentList } = draft;
      const index = componentList.findIndex((c) => c.fe_id == selectedId);
      if (index <= 0) return;
      draft.selectedId = componentList[index - 1].fe_id;
    }),
    /* 选中上一个组件 */
    selectNextComponent: produce((draft: ComponentStateType) => {
      const { selectedId, componentList } = draft;
      const index = componentList.findIndex((c) => c.fe_id == selectedId);
      if (index + 1 > componentList.length) return;
      draft.selectedId = componentList[index + 1].fe_id;
    }),
    changeComponentTitle: produce(
      (
        draft: ComponentStateType,
        { payload }: PayloadAction<{ fe_id: string; title: string }>
      ) => {
        const CurComponent = draft.componentList.find(
          (c) => c.fe_id === payload.fe_id
        );
        if (CurComponent) {
          CurComponent.title = payload.title;
        }
      }
    ),
    /* 移动组件位置 */
    moveComponent: produce(
      (
        draft: ComponentStateType,
        { payload }: PayloadAction<{ newIndex: number; oldIndex: number }>
      ) => {
        const CurComponentList = draft.componentList;
        const { newIndex, oldIndex } = payload;
        draft.componentList = arrayMove(CurComponentList, oldIndex, newIndex);
      }
    ),
  },
});
export const {
  resetAllComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  deleteSelectedComponent,
  changeComponentVisible,
  toggleComponentLocked,
  copyComponent,
  pasteComponent,
  selectNextComponent,
  selectPrevComponent,
  changeComponentTitle,
  moveComponent,
} = ComponentsSlice.actions;
export default ComponentsSlice.reducer;
