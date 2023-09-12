import Search from "antd/es/input/Search";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

/**
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-01 00:09:36
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-01 13:34:08
 */
export const ListSearch: FC = () => {
  const [value, setValue] = useState<string>("");
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  function searchHandler(value: string) {
    console.log(value);
    navigator({
      pathname: pathname,
      search: `keyword=${value}`,
    });
  }
  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    console.log(value);
    setValue(event.target.value);
  }
  useEffect(() => {
    //监听searchParams
    const newVal = searchParams.get("keyword") || "";
    setValue(newVal);
    return () => {};
  }, [searchParams]);

  return (
    <>
      <Search
        placeholder="输入你想查询的问卷"
        allowClear
        enterButton="搜索"
        size="large"
        value={value}
        className="w-64"
        onSearch={searchHandler}
        onChange={changeHandler}
      />
    </>
  );
};
