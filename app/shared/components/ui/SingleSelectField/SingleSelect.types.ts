import type { NativeSelectProps } from "@mantine/core";
import type { FormScope } from "@rvf/react-router";

export interface TSingleSelect<Type> extends NativeSelectProps {
  label: string;
  scope: FormScope<string>;
  options: Array<Type>;
}
