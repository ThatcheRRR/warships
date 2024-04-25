import { Props } from "react-select";

export type SelectProps = Pick<Props, "isMulti" | "options" | "onChange" | "value" | "placeholder">;
export type SelectOption = {
  label: string | number;
  value: string | number;
};
