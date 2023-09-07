import { DOLIBAR_URL } from "../../constants/constants";
import { apiSlice } from "../apiSlice";
const dolApiKey = process.env.REACT_APP_DOLAPIKEY;
export const dolliApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: `${DOLIBAR_URL}/contacts`,
        headers: {
          DOLAPIKEY: "wbiW1Eio3OTqDew5483J3QRTx1aOyQ92",
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getContactDetails: builder.query({
        query: (id) => ({
            url: `${DOLIBAR_URL}/contacts/${id}`,
            headers: {
                DOLAPIKEY: "wbiW1Eio3OTqDew5483J3QRTx1aOyQ92",
            },
          }),
        keepUnusedDataFor: 5,
      }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactDetailsQuery
  // Ajoutez d'autres exports ici pour les autres queries, mutations, etc.
} = dolliApiSlice;
