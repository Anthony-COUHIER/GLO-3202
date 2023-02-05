import { t } from '../utils'
import authRouter from './auth'
import taskRouter from './task'

export const appRouter = t.router({
    auth: authRouter,
    task: taskRouter,
})

export type AppRouter = typeof appRouter
