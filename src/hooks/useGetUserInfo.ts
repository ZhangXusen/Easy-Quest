import { StateType } from "@/store";
import { UerStateType } from "@/store/user";
import { useSelector } from "react-redux";

function useGetUserInfo() {
  const { username, nickname } = useSelector<StateType>(
    (state) => state.user
  ) as UerStateType;
  return { username, nickname };
}

export default useGetUserInfo;
