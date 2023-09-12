import { getToken } from "@/utils/userToken";
import { message } from "antd";
import axios from "axios";

const instance = axios.create({
  timeout: 10 * 1000,
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken() || "";
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use((res) => {
  const resData = (res.data || {}) as ResDataType;
  const { errno, data, msg } = resData;
  if (errno !== 0) {
    // 错误提示
    if (msg) {
      message.error(msg);
    }

    throw new Error(msg);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data as any;
});

export default instance;

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

export type ResDataType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
