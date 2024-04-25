import type { CardProps } from "./types";
import "./styles.css";

export const Card = ({ item }: CardProps) => {
  const title = item.title || `title for ${item.nation.name} ${item.level} level ${item.type.name}`;
  const description = item.description || `description for ${item.nation.name} ${item.level} level ${item.type.name}`;

  return (
    <div className="card" style={{ borderColor: item.nation.color }}>
      <img src={item.icons.large} alt={title} />
      <span>Title: {title}</span>
      <span>Nation: {item.nation.name}</span>
      <span>Type: {item.type.name}</span>
      <span>Level: {item.level}</span>
      <span>Description: {description}</span>
    </div>
  );
};
