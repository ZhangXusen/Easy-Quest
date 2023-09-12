/*
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-05 21:32:21
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-10 11:18:36
 */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UerStateType = {
  username: string;
  nickname: string;
};

export const userSlice = createSlice({
  name: "user",
  initialState: { username: "", nickname: "" },
  reducers: {
    LoginReducer: (
      state: UerStateType,
      action: PayloadAction<UerStateType>
    ) => {
      return action.payload;
    },
    LogoutReducer: (state: UerStateType, action: PayloadAction) => {
      return { username: "", nickname: "" };
    },
  },
});

export const { LoginReducer, LogoutReducer } = userSlice.actions;
export default userSlice.reducer;
