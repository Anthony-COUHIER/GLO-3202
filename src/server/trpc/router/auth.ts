import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getPasswordStrength, isValidEmail } from "~/utils/auth/checkup";
import { procedure, router } from "../utils";

const authRouter = router({
  validStrongPassword: procedure
    .input(
      z.object({
        password: z.string(),
      })
    )
    .query(({ input }) => {
      try {
        return getPasswordStrength(input.password);
      } catch (e) {
        throw new Error("Invalid password");
      }
    }),
  isValidEmail: procedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(({ input }) => {
      return isValidEmail(input.email);
    }),
  register: procedure
    .input(
      z.object({
        email: z.string(),
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      console.log("email res: ", isValidEmail(email));
      if (!isValidEmail(email)) {
        throw new Error("Invalid email", { cause: "email" });
      }
      try {
        getPasswordStrength(password);
      } catch (e) {
        throw e;
      }

      const user = await ctx.prisma.user.create({
        data: {
          email: email,
          name: input.username,
        },
      });

      const account = await ctx.prisma.account.create({
        data: {
          provider: "credentials",
          providerAccountId: user.id,
          password: password,
          userId: user.id,
          type: "email",
        },
      });

      await ctx.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          accounts: {
            connect: {
              id: account.id,
            },
          },
        },
      });

      return user;
    }),
});

export default authRouter;
