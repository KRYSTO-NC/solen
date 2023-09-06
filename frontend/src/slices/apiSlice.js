import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants/constants";
import { DOLI_URL } from "../constants/constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });
const doliBaseQuery = fetchBaseQuery({ baseUrl: DOLI_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Intallation", "User", "Contract", "Intervention", "TypeIntervention"],
  endpoints: (builder) => ({}),
});

export const dolibarrApiSlice = createApi({
  baseQuery: doliBaseQuery,
  tagTypes: ["ThirdParty"],
  endpoints: (builder) => ({}),
});
