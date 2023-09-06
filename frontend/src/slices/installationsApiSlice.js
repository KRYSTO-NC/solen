import { INSTALLATIONS_URL } from "../constants/constants";
import { apiSlice } from "./apiSlice";

export const installationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInstallations: builder.query({
      query: () => ({
        url: INSTALLATIONS_URL,
      }),
      //indique que les données non utilisées seront conservées pendant 5 secondes avant d'être supprimées.Cela peut être utile pour le cache
      providesTags: ["Installation"],
      keepUnusedDataFor: 5,
    }),
    getInstallationDetails: builder.query({
      query: (id) => ({
        url: `${INSTALLATIONS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createInstallation: builder.mutation({
      query: () => ({
        url: INSTALLATIONS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Installation"],
    }),

    updateInstallation: builder.mutation({
      query: (data) => ({
        url: `${INSTALLATIONS_URL}/${data.installationId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),

    deleteInstallation: builder.mutation({
      query: (installationId) => ({
        url: `${INSTALLATIONS_URL}/${installationId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetInstallationsQuery,
  useGetInstallationDetailsQuery,
  useCreateInstallationMutation,
  useDeleteInstallationMutation,
  useUpdateInstallationMutation,

} = installationsApiSlice;
