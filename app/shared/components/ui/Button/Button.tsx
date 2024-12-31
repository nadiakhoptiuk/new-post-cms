import { Button as MButton } from "@mantine/core";
import { TButton } from "./Button.types";

export const Button = ({
  children,
  type = "button",
  loading,
  ...rest
}: TButton) => {
  return (
    <MButton type={type} loading={loading} size="md" {...rest}>
      {children}
    </MButton>
  );
};
