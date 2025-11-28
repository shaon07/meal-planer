import { useEffect, useMemo, useState } from "react";
import { getQueryParams, updateQueryParams } from "../utils";

const initialQueryString =
  typeof window !== "undefined" ? window.location.search : "";

export const useQueryParams = () => {
  const [queryString, setQueryString] = useState(initialQueryString);

  useEffect(() => {
    const update = () => {
      setQueryString(window.location.search);
    };

    window.addEventListener("popstate", update);

    const patch = (method: "pushState" | "replaceState") => {
      const original = history[method];
      history[method] = function (...args) {
        const res = original.apply(this, args);
        window.dispatchEvent(new Event("popstate"));
        return res;
      };
    };

    patch("pushState");
    patch("replaceState");

    return () => {
      window.removeEventListener("popstate", update);
    };
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const params = useMemo(() => getQueryParams(), [queryString]);

  const getParam = (key: string, fallback?: string) => {
    return params[key] ?? fallback;
  };

  const setParam = (key: string, value: string) => {
    updateQueryParams(key, value);
  };

  return { params, getParam, setParam };
};
