import cn from "classnames";
import { LoaderProps } from "./types.ts";
import "./styles.scss";

export const Loader = ({ loading }: LoaderProps) => (
  <div className={cn("loader", { "loader--active": loading })}>
    <span />
  </div>
);
