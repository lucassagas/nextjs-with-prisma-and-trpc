import { z } from "zod";
import { procedure, router } from "../trpc";

export const userRouter = router({
  create: procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.user.create({
        data: {
          name: input.name,
        },
      });
    }),
});
