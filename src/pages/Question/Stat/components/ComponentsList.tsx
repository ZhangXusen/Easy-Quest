import { getComponentConfigByType } from "@/components/QuestComponents";
import { useGetComponentInfo } from "@/hooks/useGetComponentsInfo";
import { ComponentsInfoType } from "@/store/components";

/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-10-04 15:17:25
 * @LastEditors: 小国际
 * @LastEditTime: 2023-10-04 17:38:12
 */

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};
export const ComponentsList = (props: PropsType) => {
  const {
    selectedComponentId,
    setSelectedComponentId,
    setSelectedComponentType,
  } = props;
  const { componentList, selectedId } = useGetComponentInfo();
  /* 获取具体组件 */
  function getComponent(componentInfo: ComponentsInfoType) {
    const { type, props } = componentInfo;
    const ComponentConfig = getComponentConfigByType(type);
    if (ComponentConfig == null) return null;
    const { Component } = ComponentConfig;
    return <Component {...props} />;
  }
  return (
    <div className="h-full overflow-y-auto bg-white">
      {componentList
        .filter((c) => !c.isHidden)
        .map((item) => {
          const { fe_id, type } = item;

          return (
            <div
              key={fe_id}
              className={`${
                fe_id === selectedComponentId
                  ? "m-3 border-2 border-solid p-3 rounded border-blue-300 hover:border-blue-300"
                  : "m-3 border-2 border-solid border-white p-3 rounded hover:border-slate-300"
              } `}
              onClick={() => {
                setSelectedComponentId(fe_id);
                setSelectedComponentType(type);
              }}
            >
              <div className="pointer-events-none">{getComponent(item)}</div>
            </div>
          );
        })}
    </div>
  );
};
