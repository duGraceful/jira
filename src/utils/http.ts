import * as qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    methed: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.methed.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({
          message: "请重新登录",
        });
      }
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

// JS中的typeof，是在runtime时运行的
// return typeof 1 === number;

// TS中的typeof，是在静态环境运行
// return  (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})

export const useHttp = () => {
  const { user } = useAuth();
  // utility type 的用法：用泛型给他传入一个其他类型，然后utility type 对这个类型进行某种操作
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

// // 类型别名很多情况下可以和interface互换

// // 类型别名, interface在这种情况下没法代替type
// type FavoriteNumber = string | number;
// // 联合类型
// let myFavoriteNumber: FavoriteNumber = '6'

// // interface 也没办法实现utility type
// type Person  = {
//     name: string
// }
// const xiaoming: Person = { name: 'qqq'}

// type Partial<T> = {
//     [P in keyof T]?: T[P]
// }
