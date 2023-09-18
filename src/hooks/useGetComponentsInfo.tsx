import { StateType } from "@/store";
import { ComponentStateType } from "@/store/components";
import { useSelector } from "react-redux";

/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-12 20:33:32
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-14 20:54:22
 */
/* 获取store中组件的信息 */
export const useGetComponentInfo = () => {
  const components = useSelector<StateType>(
    (state) => state.components
  ) as ComponentStateType;
  const { componentList = [], selectedId = "", copiedComponent } = components;
  //当前选中的组件
  const selectedComponent = componentList.find((c) => c.fe_id === selectedId);
  return { componentList, selectedId, selectedComponent, copiedComponent };
};
