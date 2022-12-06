import { z } from "zod";
import { procedure, router } from "../trpc";
import { userRouter } from "./user";

export const appRouter = router({
  countPerson: procedure.query(async ({ ctx }) => {
    const count = await ctx.prisma.person.count();
    return {
      count,
    };
  }),

  createPerson: procedure
    .input(
      z.object({
        name: z.string(),
        lastName: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.person.create({
        data: {
          name: input.name,
          lastName: input.lastName,
        },
      });
    }),

  users: userRouter,
});

export type AppRouter = typeof appRouter;
