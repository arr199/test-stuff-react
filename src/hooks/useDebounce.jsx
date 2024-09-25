import { useEffect } from "react";

export function useDebounce(callback, duration, dependencies = []) {
  useEffect(() => {
    let timer;
    timer = setTimeout(callback, duration);
    return () => clearTimeout(timer);
  }, dependencies);
}
