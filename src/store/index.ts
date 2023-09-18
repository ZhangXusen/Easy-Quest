import { configureStore } from "@reduxjs/toolkit";
import componentsReducer, { ComponentStateType } from "./components";
import userReducer, { UerStateType } from "./user";
export type StateType = {
  user: UerStateType;
  components: ComponentStateType;
};
export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,
  },
});
