import { configureStore } from "@reduxjs/toolkit";
import componentsReducer from "./components";
import userReducer, { UerStateType } from "./user";
export type StateType = {
  user: UerStateType;
};
export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,
  },
});
