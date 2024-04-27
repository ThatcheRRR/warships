import type { CardProps } from "./types";
import "./styles.css";

// можно сделать дженериком
export const Card = ({ item }: CardProps) => {
  const title = item.title || `title for ${item.nation.name} ${item.level} level ${item.type.name}`;
  const description = item.description || `description for ${item.nation.name} ${item.level} level ${item.type.name}`;

  return (
    <div className="card" style={{ borderColor: item.nation.color }}>
      <img src={item.icons.large} alt={title} />
      <span>Название: {title}</span>
      <span>Нация: {item.nation.name}</span>
      <span>Класс: {item.type.name}</span>
      <span>Уровень: {item.level}</span>
      <span>Описание: {description}</span>
    </div>
  );
};
