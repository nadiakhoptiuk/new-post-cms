import { Form } from "react-router";
// import { useTranslation } from "react-i18next";
import { useForm, type FormScope } from "@rvf/react-router";

import { PasswordField } from "~/shared/components/ui/PasswordInput";
import { TextInput } from "~/shared/components/ui/TextInput";
import { Button } from "~/shared/components/ui/Button";

// import { signupValidator } from "~/shared/utils/validators/signupValidator";
// import { loginValidator } from "~/shared/utils/validators/loginValidator";

// import type { TErrorsMessages } from "~/shared/types/react";
import s from "./AuthForm.module.css";
import { withZod } from "@rvf/zod";
import { z } from "zod";

export const AuthForm = ({ formType }: { formType: "signup" | "login" }) => {
  // const { t } = useTranslation(["auth", "common", "user"]);
  // const errorMessages = t("formErrorsMessages", {
  //   ns: "common",
  //   returnObjects: true,
  // }) as TErrorsMessages;

  const validator =
    formType === "login"
      ? withZod(
          z.object({
            email: z.string().trim().min(1).email("Must be a valid email"),
            password: z
              .string()
              .trim()
              .min(8, "At least 8 symbols")
              .max(12, "No more than 12 symbols"),
          })
        )
      : withZod(
          z.object({
            email: z.string().trim().min(1).email("Must be a valid email"),
            password: z
              .string()
              .trim()
              .min(8, "At least 8 symbols")
              .max(12, "No more than 12 symbols"),

            firstName: z
              .string()
              .trim()
              .min(1, "Required field")
              .max(30, "Too many symbols"),
            lastName: z
              .string()
              .trim()
              .min(1, "Required field")
              .max(30, "Too many symbols"),
          })
        );

  const defaults =
    formType === "signup"
      ? {
          email: "",
          password: "",
          lastName: "",
          firstName: "",
        }
      : {
          email: "",
          password: "",
        };

  const form = useForm({
    validator: validator,
    defaultValues: defaults,
    method: "POST",
  });

  return (
    <Form {...form.getFormProps()} className={s.form}>
      {formType === "signup" && (
        <>
          <TextInput
            label='first name'
            // label={t("userData.firstName", { ns: "user" })}
            scope={form.scope("firstName") as FormScope<string>}
          />
          <TextInput
            label='last name'
            // label={t("userData.lastName", { ns: "user" })}
            scope={form.scope("lastName") as FormScope<string>}
          />
        </>
      )}
      <TextInput
        label='email'
        // label={t("userData.email", { ns: "user" })}
        scope={form.scope("email")}
      />
      <PasswordField
        label='password'
        // label={t("userData.password", { ns: "user" })}
        scope={form.scope("password")}
      />

      <Button
        type='submit'
        loading={form.formState.isSubmitting}
        mt={15}
        w='100%'
      >
        submit
        {/* {formType === "signup"
          ? t("authForm.button.signup", { ns: "auth" })
          : t("authForm.button.login", { ns: "auth" })} */}
      </Button>
    </Form>
  );
};
