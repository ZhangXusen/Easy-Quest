/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-16 10:31:39
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-17 16:08:43
 */
import {
  ComponentConfigType,
  ComponentPropsType,
  getComponentConfigByType,
} from "@/components/QuestComponents";
import { useGetComponentInfo } from "@/hooks/useGetComponentsInfo";
import { ComponentsInfoType, changeComponentProps } from "@/store/components";
import { FC } from "react";
import { useDispatch } from "react-redux";

export const ComponentAttrs: FC = () => {
  const { selectedComponent } = useGetComponentInfo();
  const dispatch = useDispatch();
  console.log("selectedComponent", selectedComponent);
  if (selectedComponent == null)
    return <div className="text-center">当前未选中组件</div>;
  const { type, props, isLocked, isHidden } =
    selectedComponent as ComponentsInfoType;
  const ComponentConfig = getComponentConfigByType(type) as ComponentConfigType;
  console.log("ComponentConfig", ComponentConfig);
  if (ComponentConfig == null)
    return <div className="text-center">当前未选中组件</div>;

  const { PropComponent } = ComponentConfig;
  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return;

    const { fe_id } = selectedComponent;
    console.log("新props======>", newProps);
    dispatch(changeComponentProps({ id: fe_id, newProps }));
  }
  return (
    <PropComponent
      {...props}
      onChange={changeProps}
      disabled={isLocked || isHidden}
    />
  );
};
