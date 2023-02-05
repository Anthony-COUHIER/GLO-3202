import { z } from "zod";
import { publicProcedure, router } from "../utils";

const authRouter = router({
    login: publicProcedure
        .input(
            z.object({
                email: z.string(),
                password: z.string(),
            })
        )
        .query(async ({ input, ctx }) => {
            const { email, password } = input;
            const user = await ctx.prisma.user.findUnique({
                where: {
                    email
                }
            })
            if (!user) {
                throw new Error("User not found")
            }
            if (user.password !== password) {
                throw new Error("Invalid password")
            }
            return user;
        }),
    register: publicProcedure
        .input(
            z.object({
                email: z.string().email(),
                username: z.string(),
                password: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { email, username, password } = input
            const user = await ctx.prisma.user.create({
                data: {
                    email: email,
                    username: username,
                    password: password,
                }
            })
            return user
        }),
});

export default authRouter;
