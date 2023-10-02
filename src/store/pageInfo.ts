import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import produce from "immer";

/* 页面信息store */
export type PageInfoType = {
  title: string;
  desc?: string;
  js?: string;
  css?: string;
};
const INIT_STATE: PageInfoType = {
  title: "",
  desc: "",
  js: "",
  css: "",
};

export const PageInfoSlice = createSlice({
  name: "pageInfo",
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo: (
      state: PageInfoType,
      action: PayloadAction<PageInfoType>
    ) => {
      return action.payload;
    },
    changeTitle: produce(
      (draft: PageInfoType, { payload }: PayloadAction<string>) => {
        draft.title = payload;
      }
    ),
  },
});
export const { resetPageInfo, changeTitle } = PageInfoSlice.actions;
export default PageInfoSlice.reducer;
