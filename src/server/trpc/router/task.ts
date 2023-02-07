import { z } from "zod";
import { protectedProcedure } from "../middleware/protected";
import { router } from "../utils";

export const taskRouter = router({
    createTask: protectedProcedure
        .input(
            z.object({
                title: z.string(),
                description: z.string(),
                isFavorite: z.boolean().optional(),
                goalDate: z.date().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const newTask = await ctx.prisma.task.create({
                data: {
                    title: input.title,
                    content: input.description,
                    isFavorite: input.isFavorite,
                    goalDate: input.goalDate,
                    userId: ctx.user.id,
                },
            });
            return newTask;
        }),
    updateTask: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                title: z.string().optional(),
                description: z.string().optional(),
                isFavorite: z.boolean().optional(),
                goalDate: z.date().optional(),
                isCompleted: z.boolean().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
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
    deleteTask: protectedProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const deletedTask = await ctx.prisma.task.delete({
                where: {
                    id: input.id,
                },
            });
            return deletedTask;
        }),
    getTasks: protectedProcedure
        .input(
            z.object({
                searchQuery: z.string().optional(),
                isCompleted: z.boolean().optional(),
                isFavorite: z.boolean().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const tasks = await ctx.prisma.task.findMany({
                where: {
                    userId: ctx.user.id,
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
