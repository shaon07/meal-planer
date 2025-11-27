import { useEffect, useMemo, useState } from "react";

export const useQueryParams = () => {
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    const update = () => {
      setQueryString(window.location.search);
    };

    update();

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

  const params = useMemo(() => {
    const map: Record<string, string> = {};
    const sp = new URLSearchParams(queryString);
    sp.forEach((v, k) => (map[k] = v));
    return map;
  }, [queryString]);

  const getParam = (key: string, fallback?: string) => {
    return params[key] ?? fallback;
  };

  return { params, getParam };
};
