import { createCookieSessionStorage } from "solid-start";
import { clientEnv } from "~/env/client";

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: '_session',
        sameSite: 'lax',
        path: '/',
        // TODO CREATE A SECRET
        secrets: [clientEnv.START_BASE_URL],
        secure: import.meta.env.PROD,
        maxAge: 60 * 60 * 24,
    },
})
