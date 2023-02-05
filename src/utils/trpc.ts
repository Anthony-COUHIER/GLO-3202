import {
    createTRPCProxyClient, httpLink, loggerLink
} from '@trpc/client';
import { clientEnv } from '~/env/client';
import type { AppRouter } from "~/server/trpc/router/_app";

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        loggerLink(),
        httpLink({
            url: `${clientEnv.START_BASE_URL}/api/trpc`,
        }),
    ],
});
