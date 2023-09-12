import { getQuestionService } from "@/service/question";
import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";

/*
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-02 22:27:42
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-02 22:37:51
 */
function useLoadQuestData() {
  const { id = "" } = useParams();
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
  async function getData() {
    const data = await getQuestionService(id);
    return data;
  }
  const { loading, data, error } = useRequest(getData);
  return { loading, data, error };
}

export default useLoadQuestData;
