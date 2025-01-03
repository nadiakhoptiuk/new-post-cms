import { useId } from "react";
import { useField } from "@rvf/react-router";
import { PasswordInput as MPasswordInput } from "@mantine/core";
import "@mantine/core/styles/PasswordInput.css";

import type { TTextInput } from "~/shared/types/react";

export const PasswordInput = ({ label, scope, placeholder }: TTextInput) => {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();

  return (
    <MPasswordInput
      label={label}
      placeholder={placeholder}
      {...field.getInputProps({
        id: inputId,
        "aria-describedby": errorId,
        "aria-invalid": !!field.error(),
      })}
      size='md'
      error={field.error()}
      styles={{
        label: { fontWeight: "bold" },
        wrapper: { marginBottom: 10 },
        root: { position: "relative", flexGrow: 1, minWidth: "230px" },
        error: { position: "absolute", bottom: -10 },
      }}
    />
  );
};
