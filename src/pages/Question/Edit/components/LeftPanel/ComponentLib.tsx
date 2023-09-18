import {
  ComponentConfigGroup,
  ComponentConfigType,
} from "@/components/QuestComponents";
import { addComponent } from "@/store/components";
import { nanoid } from "@reduxjs/toolkit";
import Title from "antd/es/typography/Title";
import { useDispatch } from "react-redux";

/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-14 21:22:33
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-14 22:01:00
 */
function getComponent(c: ComponentConfigType) {
  const { Component, type, title, defaultProps: props } = c;
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(addComponent({ type, title, props, fe_id: nanoid() }));
  }
  return (
    <div
      key={type}
      onClick={handleClick}
      className="mb-3 cursor-pointer bg-slate-100 border border-solid border-slate-200 p-3 rounded hover:border-slate-400"
    >
      <div className="pointer-events-none">
        <Component />
      </div>
    </div>
  );
}

export const ComponentLib = () => {
  return (
    <>
      {ComponentConfigGroup.map((group, index) => {
        const { components, groupName, groupId } = group;
        return (
          <div key={groupId}>
            <div>
              <Title level={4}>{groupName}</Title>
            </div>
            <div
              className={`${index > 0 ? "mt-4" : "mt-0"} text-base important`}
            >
              {components.map((c) => getComponent(c))}
            </div>
          </div>
        );
      })}
    </>
  );
};
