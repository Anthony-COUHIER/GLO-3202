import { z } from "zod";
import { publicProcedure, router } from "../utils";

async function userExist(ctx, userId: string) {
   const res = await ctx.prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    console.log("res", res);
}

export const taskRouter = router({
    createTask: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                title: z.string(),
                description: z.string(),
                isFavorite: z.boolean().optional(),
                goalDate: z.date().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (userExist(ctx, input.userId) === null) {
                throw new Error("User does not exist");
            }
            const newTask = await ctx.prisma.task.create({
                data: {
                    title: input.title,
                    content: input.description,
                    isFavorite: input.isFavorite,
                    goalDate: input.goalDate,
                    userId: input.userId,
                },
            });
            return newTask;
        }),
    updateTask: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                id: z.string(),
                title: z.string().optional(),
                description: z.string().optional(),
                isFavorite: z.boolean().optional(),
                goalDate: z.date().optional(),
                isCompleted: z.boolean().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (userExist(ctx, input.userId) === null) {
                throw new Error("User does not exist");
            }
            const updatedTask = await ctx.prisma.task.update({
                where: {
                    id: input.id,
                },
                data: {
                    title: input.title,
                    content: input.description,
                    isFavorite: input.isFavorite,
                    goalDate: input.goalDate,
                    completed: input.isCompleted,
                },
            });
            return updatedTask;
        }),
    deleteTask: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                id: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (userExist(ctx, input.userId) === null) {
                throw new Error("User does not exist");
            }
            const deletedTask = await ctx.prisma.task.delete({
                where: {
                    id: input.id,
                },
            });
            return deletedTask;
        }),
    getTasks: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                searchQuery: z.string().optional(),
                isCompleted: z.boolean().optional(),
                isFavorite: z.boolean().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            if (userExist(ctx, input.userId) === null) {
                throw new Error("User does not exist");
            }
            const tasks = await ctx.prisma.task.findMany({
                where: {
                    userId: input.userId,
                    title: {
                        contains: input.searchQuery,
                    },
                    completed: input.isCompleted,
                    isFavorite: input.isFavorite,
                },
            });
            return tasks;
        }),
});

export default taskRouter;
