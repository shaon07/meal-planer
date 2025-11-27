import { createApi } from "@reduxjs/toolkit/query/react";
import useBaseApi from "../hooks/useApi";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: useBaseApi,
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;
