import { withZod } from "@rvf/zod";
import { z } from "zod";

import { ROLE_SELECT_OPTIONS } from "~/shared/constants/common";
import type { TErrorsMessages } from "~/shared/types/react";

const ROLES = ROLE_SELECT_OPTIONS as [string, ...string[]];

export const userFormValidator = (errors: TErrorsMessages) =>
  withZod(
    z.object({
      firstName: z
        .string()
        .trim()
        .min(1, errors.stringErrorMin)
        .max(30, errors.stringErrorMax),
      lastName: z
        .string()
        .trim()
        .min(1, errors.stringErrorMin)
        .max(30, errors.stringErrorMax),
      email: z.string().trim().min(1).email(errors.emailError),
      password: z
        .string()
        .trim()
        .min(8, errors.passwordErrorMin)
        .max(12, errors.passwordErrorMax),
      role: z.enum(ROLES),
    })
  );
