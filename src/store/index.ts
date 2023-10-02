/*
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-05 21:31:25
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-27 22:05:00
 */
import { configureStore } from "@reduxjs/toolkit";
import undoable, { StateWithHistory, excludeAction } from "redux-undo";
import componentsReducer, { ComponentStateType } from "./components";
import PageInfoReducer, { PageInfoType } from "./pageInfo";
import userReducer, { UerStateType } from "./user";
export type StateType = {
  user: UerStateType;
  components: StateWithHistory<ComponentStateType>;
  pageInfo: PageInfoType;
};
export default configureStore({
  reducer: {
    user: userReducer,
    // components: componentsReducer,
    components: undoable(componentsReducer, {
      limit: 20, //限制撤销20步
      filter: excludeAction([
        "components/resetAllComponents",
        "components/changeSelectedId",
        "components/selectPrevComponent",
        "components/selectNextComponent",
      ]),
    }),
    pageInfo: PageInfoReducer,
  },
});
