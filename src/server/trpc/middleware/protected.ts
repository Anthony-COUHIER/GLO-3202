import { TRPCError } from "@trpc/server";
import { middleware, t } from "../utils";

const authMiddleware = middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You are not authorized to access this resource',
        })
    }
    return next({ ctx: { ...ctx, user: ctx.user } })
});

export const protectedProcedure = t.procedure.use(authMiddleware);
