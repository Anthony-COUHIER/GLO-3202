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
            // TODO CREATE TASK
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
            // TODO UPDATE TASK
        }),
    deleteTask: protectedProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            // TODO DELETE TASK
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
            // TODO GET TASKS
        }),
});

export default taskRouter;
