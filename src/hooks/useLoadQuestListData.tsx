import { getQuestionListService } from "@/service/question";
import { useRequest } from "ahooks";
import { useSearchParams } from "react-router-dom";

type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
};
function useLoadQuestListData(option: Partial<OptionType> = {}) {
  const { isStar = false, isDeleted = false } = option;
  const [searchParams] = useSearchParams();
  async function getQuestListData() {
    const keyword = searchParams.get("keyword") || "";
    const data = await getQuestionListService({
      keyword,
      isStar,
      isDeleted,
    });
    return data;
  }
  const { loading, data, error, refresh } = useRequest(getQuestListData, {
    refreshDeps: [searchParams], //参数改变时重新请求
  });
  return { data, loading, error, refresh };
}
export default useLoadQuestListData;
