/*
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-09-05 00:10:42
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-05 00:11:06
 */
const KEY = "USER_TOKEN";

export function setToken(token: string) {
  localStorage.setItem(KEY, token);
}

export function getToken() {
  return localStorage.getItem(KEY) || "";
}

export function removeToken() {
  localStorage.removeItem(KEY);
}
