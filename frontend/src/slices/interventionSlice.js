import { INTERVENTIONS_URL, INSTALLATIONS_URL } from "../constants/constants";
import { apiSlice } from "./apiSlice";

export const interventionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInterventions: builder.query({
      query: () => ({
        url: INTERVENTIONS_URL,
      }),
      providesTags: ["Intervention"],
      keepUnusedDataFor: 5,
    }),
    getInstallationById: builder.query({
      query: (id) => ({
        url: `${INSTALLATIONS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createNewInterventionForInstallation: builder.mutation({
      query: ({ installationId, newIntervention }) => ({
        url: `${INSTALLATIONS_URL}/${installationId}/interventions`,
        method: "POST",
        body: newIntervention,
      }),
      invalidatesTags: ["Intervention"],
    }),
  }),
});

export const {
  useGetInterventionsQuery,
  useGetInstallationByIdQuery,
  useCreateNewInterventionForInstallationMutation,
} = interventionsApiSlice;
