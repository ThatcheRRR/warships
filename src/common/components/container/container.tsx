import { ContainerProps } from "./types";
import "./styles.scss";

export const Container = ({ children }: ContainerProps) => <div className="container">{children}</div>;
