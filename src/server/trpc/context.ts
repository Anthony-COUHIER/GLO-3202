import type { inferAsyncReturnType } from '@trpc/server';
import type { createSolidAPIHandlerContext } from 'solid-start-trpc';
import { prisma } from '~/server/db/clients';

export const createContextInner = async (opts: createSolidAPIHandlerContext) => {
    return {
        ...opts,
        prisma,
    }
}

export const createContext = async (opts: createSolidAPIHandlerContext) => {
    return await createContextInner(opts)
}

export type Context = inferAsyncReturnType<typeof createContext>
