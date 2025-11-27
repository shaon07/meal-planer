export const updateQueryParams = (tabValue: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set("tab", tabValue);
  window.history.pushState({}, "", url.toString());
};
