import { withZod } from "@rvf/zod";
import { z } from "zod";

import { TErrorsMessages } from "~/shared/types/remix";

export const signupValidator = (errorMessages: TErrorsMessages) =>
  withZod(
    z.object({
      firstName: z
        .string()
        .trim()
        .min(1, errorMessages.stringErrorMin)
        .max(30, errorMessages.stringErrorMax),
      lastName: z
        .string()
        .trim()
        .min(1, errorMessages.stringErrorMin)
        .max(30, errorMessages.stringErrorMax),
      email: z.string().trim().min(1).email(errorMessages.emailError),
      password: z
        .string()
        .trim()
        .min(8, errorMessages.passwordErrorMin)
        .max(12, errorMessages.passwordErrorMax),
    })
  );
