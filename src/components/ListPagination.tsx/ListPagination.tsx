import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
} from "@/constant";
import { Pagination, PaginationProps } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-03 10:56:07
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-03 11:16:54
 */
type PropsType = {
  total: number;
};

export const ListPagination = (props: PropsType) => {
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchParams] = useSearchParams();
  const navigator = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") ||
      LIST_PAGE_SIZE;
    setCurrent(page);
    setPageSize(pageSize);
  }, [searchParams]);

  const handlePageChange: PaginationProps["onChange"] = (page, pageSize) => {
    console.log(page, pageSize);
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    navigator({ pathname, search: searchParams.toString() });
  };
  return (
    <>
      <Pagination
        total={props.total}
        showTotal={(total) => `共 ${total} 个问卷`}
        current={current}
        pageSize={pageSize}
        onChange={handlePageChange}
      ></Pagination>
    </>
  );
};
