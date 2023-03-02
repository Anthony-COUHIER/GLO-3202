import { SolidAuth, type SolidAuthConfig } from "@auth/solid-start";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { serverEnv } from "~/env/server";
import { prisma } from "~/server/db/client";
import type { Adapter } from "@auth/core/adapters";
import Credentials from "@auth/core/providers/credentials";

export const authOpts: SolidAuthConfig = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("credentials", credentials);
        if (!credentials) return null;
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email: email },
        });
        if (!user) {
          return null;
        }
        // if (!account || account.password !== password) {
        //   return null;
        // }
        console.log("user: ", user);
        return user;
      },
    }),
  ],
  debug: false,
};

export const { GET, POST } = SolidAuth(authOpts);
