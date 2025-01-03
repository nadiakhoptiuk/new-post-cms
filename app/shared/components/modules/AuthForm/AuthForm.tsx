import { Form } from "react-router";
import { useTranslation } from "react-i18next";
import { useForm, type FormScope } from "@rvf/react-router";

import { PasswordInput } from "~/shared/components/ui/PasswordInput";
import { TextInput } from "~/shared/components/ui/TextInput";
import { Button } from "~/shared/components/ui/Button";

import { signupValidator } from "~/shared/utils/validators/signupValidator";
import { loginValidator } from "~/shared/utils/validators/loginValidator";

import type { TErrorsMessages } from "~/shared/types/react";
import s from "./AuthForm.module.css";

export const AuthForm = ({ formType }: { formType: "signup" | "login" }) => {
  const { t } = useTranslation(["auth", "common", "user"]);
  const errorMessages = t("formErrorsMessages", {
    ns: "common",
    returnObjects: true,
  }) as TErrorsMessages;

  const validator =
    formType === "login"
      ? loginValidator(errorMessages)
      : signupValidator(errorMessages);

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
            label={t("userData.firstName", { ns: "user" })}
            scope={form.scope("firstName") as FormScope<string>}
          />
          <TextInput
            label={t("userData.lastName", { ns: "user" })}
            scope={form.scope("lastName") as FormScope<string>}
          />
        </>
      )}
      <TextInput
        label={t("userData.email", { ns: "user" })}
        scope={form.scope("email")}
      />
      <PasswordInput
        label={t("userData.password", { ns: "user" })}
        scope={form.scope("password")}
      />

      <Button
        type='submit'
        loading={form.formState.isSubmitting}
        mt={15}
        w='100%'
      >
        {formType === "signup"
          ? t("authForm.button.signup", { ns: "auth" })
          : t("authForm.button.login", { ns: "auth" })}
      </Button>
    </Form>
  );
};
