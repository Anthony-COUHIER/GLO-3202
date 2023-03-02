import { router } from "../utils";
import authRouter from "./auth";

export const appRouter = router({
  authRouter,
});

export type IAppRouter = typeof appRouter;
