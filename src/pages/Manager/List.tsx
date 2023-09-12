/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-08-29 15:27:56
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-04 00:04:55
 */
import { ListSearch } from "@/components/ListSearch/ListSearch";
import QuestionCard from "@/components/QuestionCard";
import { LIST_SEARCH_PARAM_KEY } from "@/constant";
import { getQuestionListService } from "@/service/question";
import { useDebounceFn, useRequest, useTitle } from "ahooks";
import { Empty, Spin } from "antd";
import Title from "antd/es/typography/Title";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const List: FC = () => {
  useTitle("我的问卷---超级问卷");
  // const { data = {}, loading, error } = useLoadQuestListData();
  // const { list = [], total = 0 } = data;
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]); //所有列表数据
  const [total, setTotal] = useState(0); //目前已经加载的数量
  const hasMoreData = total > list.length;
  const [searchParams] = useSearchParams();
  /* 监听url变化,初始化或重新搜索时加载数据 */
  useEffect(() => {
    loadMore();
  }, [searchParams]);

  /* 监听上滑滚动事件,加载更多数据 */
  useEffect(() => {
    if (hasMoreData) {
      window.addEventListener("scroll", loadMore);
    }
    return () => {
      //组件卸载解绑事件
      window.removeEventListener("scroll", loadMore);
    };
  }, [searchParams, hasMoreData]);

  /* 通过请求加载数据 */
  const { run: loadListData, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: 10,
        keyword: searchParams.get(LIST_SEARCH_PARAM_KEY) || "",
      });
      return data;
    },
    {
      manual: true,
      onSuccess(res) {
        const { list: l = [], total = 0 } = res;
        setList(list.concat(l));
        setTotal(total);
        setPage(page + 1);
      },
    }
  );
  /* 滑动触发加载,防抖 */
  const footerRef = useRef<HTMLDivElement>(null);
  const { run: loadMore } = useDebounceFn(
    () => {
      const ele = footerRef.current;
      if (ele == null) return;
      const domRect = ele.getBoundingClientRect();
      if (domRect == null) return;
      const { bottom } = domRect;
      if (bottom < document.body.clientHeight) {
        //触发加载请求
        loadListData();
      }
    },
    { wait: 1000 }
  );

  /* 加载更多的dom逻辑 */
  const loadMoreEle = useMemo(() => {
    if (loading) return <Spin></Spin>;
    if (list.length === 0) return <Empty description="暂无更多数据" />;
    if (!hasMoreData) return <span>暂无更多数据...</span>;
    return "上滑加载更多";
  }, [loading, hasMoreData]);
  return (
    <>
      <div className="header flex">
        <div className="left flex-1">
          <Title level={2} className="">
            我的问卷
          </Title>
        </div>
        <div className="right flex-1 text-right">
          <ListSearch />
        </div>
      </div>
      <div className="list mb-5">
        {list.length > 0 &&
          list.map((item: any) => {
            return <QuestionCard key={item._id} {...item} />;
          })}
      </div>
      <div className="footer text-center mt-1" ref={footerRef}>
        {loadMoreEle}
      </div>
    </>
  );
};
