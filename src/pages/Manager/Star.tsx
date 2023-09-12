import { ListPagination } from "@/components/ListPagination.tsx/ListPagination";
import { ListSearch } from "@/components/ListSearch/ListSearch";
import QuestionCard from "@/components/QuestionCard";
import useLoadQuestListData from "@/hooks/useLoadQuestListData";
import { useTitle } from "ahooks";
import { Spin } from "antd";
import Title from "antd/es/typography/Title";
import { FC } from "react";

export const Star: FC = () => {
  useTitle("星标问卷---超级问卷");
  const { loading, data = {}, error } = useLoadQuestListData({ isStar: true });
  const { list, total } = data;
  return (
    <>
      <div className="header mb-2 flex">
        <div className="left flex-1">
          <Title level={2} className="">
            星标问卷
          </Title>
        </div>
        <div className="right flex-1 text-right">
          <ListSearch />
        </div>
      </div>
      <div className="list mb-5">
        {loading && (
          <div className="text-center">
            <Spin />
          </div>
        )}
        {!loading &&
          list.length > 0 &&
          list.map((item: any) => {
            return <QuestionCard key={item._id} {...item} />;
          })}
      </div>
      <div className="footer text-center">
        {" "}
        {!loading && list.length > 0 && <ListPagination total={total} />}
      </div>
    </>
  );
};
