export const updateQueryParams = (key: string, value: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, "", url.toString());
};

export const getQueryParams = () => {
  const map: Record<string, string> = {};

  if (typeof window === "undefined") return map;

  const searchParams = new URLSearchParams(window.location.search);

  searchParams.forEach((value, key) => {
    map[key] = value;
  });

  return map;
};
