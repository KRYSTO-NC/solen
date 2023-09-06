import {THIRDPARTIES_URL} from "../../constants/constants";
import { apiSlice } from "../apiSlice";

export const thirdPartiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getThirdParties: builder.query({
      query: () => ({
        url: THIRDPARTIES_URL,
      }),
      //indique que les données non utilisées seront conservées pendant 5 secondes avant d'être supprimées.Cela peut être utile pour le cache
      keepUnusedDataFor:5,
    }),
  }),
});



export const { useGetThirdPartiesQuery} = thirdPartiesApiSlice;