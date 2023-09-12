import { ComponentPropsType } from "@/components/QuestComponents";
import { createSlice } from "@reduxjs/toolkit";
export type ComponentsInfoType = {
  fe_id: string; // Todo
  type: string;
  title: string;
  isLocked?: boolean;
  isHidden?: boolean;
  props: ComponentPropsType;
};
export const ComponentsSlice = createSlice({
  name: "components",
  initialState: {},
  reducers: {},
});

export default ComponentsSlice.reducer;
