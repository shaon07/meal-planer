import { createApi } from "@reduxjs/toolkit/query/react";
import useBaseApi from "../hooks/useApi";

export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: useBaseApi,
  endpoints: (builder) => ({
    searchRecipes: builder.query({
      query: (params) => ({
        url: `search.php`,
        method: "GET",
        params,
      }),
    }),

    getRecipeById: builder.query({
      query: (params) => ({
        url: `lookup.php`,
        method: "GET",
        params,
      }),
    }),

    getCategories: builder.query({
      query: () => ({
        url: `categories.php`,
        method: "GET",
      }),
    }),

    filterCategory: builder.query({
      query: (params) => ({
        url: `filter.php`,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useSearchRecipesQuery,
  useGetRecipeByIdQuery,
  useGetCategoriesQuery,
  useFilterCategoryQuery,

  // Lazy Queries
  useLazyFilterCategoryQuery,
  useLazyGetCategoriesQuery,
  useLazyGetRecipeByIdQuery,
  useLazySearchRecipesQuery,
} = recipesApi;
