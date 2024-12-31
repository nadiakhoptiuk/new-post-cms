import type { ButtonProps } from "@mantine/core";

export interface TButton extends ButtonProps {
  type?: "submit" | "button";
  onClick?: () => void;
}
