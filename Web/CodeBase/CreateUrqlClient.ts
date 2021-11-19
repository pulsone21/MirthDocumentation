import { URQL_CLIENT_URL } from "config";
import { createClient } from "urql";
import { myExchange } from "./urqlExchangeSetUp";

export const client = createClient({
    url: URQL_CLIENT_URL,
    fetchOptions: {
        credentials: "include",
    },
    exchanges: myExchange,
});
