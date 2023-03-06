import { router } from "../utils";
import example from "./example";
import auth from "./auth";

export const appRouter = router({
  example,
  auth,
});

export type IAppRouter = typeof appRouter;
