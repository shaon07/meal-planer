import { useEffect, useRef, useState } from "react";
import {
  useLazyFilterCategoryQuery,
  useLazySearchRecipesQuery,
} from "../services/recipes.service";
import type { Recipe } from "../types";

export const useRecipes = (searchQuery: string, category: string) => {
  const hasCategory = category && category !== "all";
  const [lastTriggeredSource, setLastTriggeredSource] = useState<
    "search" | "filter"
  >("search");

  const [
    triggerSearch,
    { data: searchData, isFetching: isSearching, error: searchError },
  ] = useLazySearchRecipesQuery();

  const [
    triggerFilter,
    { data: filterData, isFetching: isFiltering, error: filterError },
  ] = useLazyFilterCategoryQuery();

  const initializedRef = useRef(false);
  const pendingSourceRef = useRef<"search" | "filter" | null>(null);

  useEffect(() => {
    if (!initializedRef.current) {
      triggerSearch({ s: "" });
      pendingSourceRef.current = "search";
      initializedRef.current = true;
    }
  }, [triggerSearch]);

  useEffect(() => {
    if (initializedRef.current && searchQuery !== "") {
      triggerSearch({ s: searchQuery });
      pendingSourceRef.current = "search";
    }
  }, [searchQuery, triggerSearch]);

  useEffect(() => {
    if (initializedRef.current && hasCategory) {
      triggerFilter({ c: category });
      pendingSourceRef.current = "filter";
    }
  }, [category, hasCategory, triggerFilter]);

  useEffect(() => {
    if (pendingSourceRef.current && (searchData || filterData)) {
      setLastTriggeredSource(pendingSourceRef.current);
    }
  }, [searchData, filterData]);

  const recipes: Recipe[] | undefined =
    lastTriggeredSource === "filter"
      ? (filterData?.meals as unknown as Recipe[])
      : (searchData?.meals as unknown as Recipe[]);

  const loading = isSearching || isFiltering;
  const error = searchError ?? filterError;

  return {
    recipes,
    loading,
    error: error ? "Failed to fetch recipes" : null,
  };
};
