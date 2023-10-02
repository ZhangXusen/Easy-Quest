import { StateType } from "@/store";
import { PageInfoType } from "@/store/pageInfo";
import { useSelector } from "react-redux";

export const useGetPageInfo = () => {
  const pageInfo = useSelector<StateType>(
    (state) => state.pageInfo
  ) as PageInfoType;
  return pageInfo;
};
