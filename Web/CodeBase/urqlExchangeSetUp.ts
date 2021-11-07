import { dedupExchange } from "@urql/core";
import { cacheExchange, Cache, QueryInput } from "@urql/exchange-graphcache";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import { MeDocument, MeQuery, LogOutMutation } from "../GraphQl/generated/graphgql";

function betterUpdateQuery<Result, Query>(cache: Cache, qi: QueryInput, result: any, fn: (r: Result, q: Query) => Query) {
    return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

export const myExchange = [
    dedupExchange,
    cacheExchange({
        updates: {
            Mutation: {
                LogOut: (_result: LogOutMutation, _, cache) => {
                    betterUpdateQuery<LogOutMutation, MeQuery>(cache, { query: MeDocument }, _result, () => ({ Me: null }));
                },
            },
        },
    }),
    multipartFetchExchange,
];
