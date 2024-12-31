import { withZod } from "@rvf/zod";
import { z } from "zod";

import type { TErrorsMessages } from "~/shared/types/react";

export const loginValidator = (errorMessages: TErrorsMessages) =>
  withZod(
    z.object({
      email: z.string().trim().min(1).email(errorMessages.emailError),
      password: z
        .string()
        .trim()
        .min(8, errorMessages.passwordErrorMin)
        .max(12, errorMessages.passwordErrorMax),
    })
  );
