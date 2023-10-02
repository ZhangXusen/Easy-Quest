import { getQuestionService } from "@/service/question";
import { resetAllComponents } from "@/store/components";
import { resetPageInfo } from "@/store/pageInfo";
import { useRequest } from "ahooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

/*
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-02 22:27:42
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-24 14:48:40
 */
function useLoadQuestData() {
  const { id = "" } = useParams();
  const dispatch = useDispatch();
  /*  const [loading, setLoading] = useState(true);
  const [questionData, setQuestionData] = useState({});
  useEffect(() => {
    async function fn() {
      const data = await getQuestionService(id);
      setQuestionData(data);
      setLoading(false);
    }
    fn();
  }, []);
  return { loading, questionData }; */
  async function getData(id: string) {
    if (!id) {
      throw new Error("没有问卷id");
    }
    const data = await getQuestionService(id);
    return data;
  }
  const { loading, data, error, run } = useRequest(getData, { manual: true });

  /* 存入store */
  useEffect(() => {
    if (!data) return;
    const {
      title = "",
      componentList = [],
      css = "",
      js = "",
      desc = "",
    } = data;
    //获取默认的selectedId
    let selectedId = "";
    //默认选中第一个组件
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id;
    }
    dispatch(
      resetAllComponents({ componentList, selectedId, copiedComponent: null })
    );
    dispatch(resetPageInfo({ title, desc, js, css }));
  }, [data]);
  /* id变化时，重新获取数据 */
  useEffect(() => {
    run(id);
  }, [id]);
  return { loading, error };
}

export default useLoadQuestData;
