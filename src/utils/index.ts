import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// export const debounce = (func, dalay) => {
//     let timeout;
//     return () => {
//         if(timeout) {
//             clearTimeout(timeout);
//         }
//         timeout = setTimeout(() => {
//             func();
//         }, dalay);
//     }
// }

export const useDebounce = <v>(value: v, dalay: number) => {
  const [debounceValue, setdebounceValue] = useState(value);
  useEffect(() => {
    // 每次value变化后，设置一个value
    const timeout = setTimeout(() => setdebounceValue(value), dalay);
    // 每次在上一次useEffect处理完以后在运行
    return () => clearTimeout(timeout);
  }, [value, dalay]);
  return debounceValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
