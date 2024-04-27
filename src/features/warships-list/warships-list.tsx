import { useEffect, useState, useMemo } from "react";
import type { FC } from "react";
import { request } from "graphql-request";
import { Card } from "../../common/components/card";
import { Container } from "../../common/components/container";
import { Select } from "../../common/components/select";
import { Loader } from "../../common/components/loader";
import type { SelectOption } from "../../common/components/select";
import { HTTP_BASE } from "../../constants";
import { warshipsQuery } from "./query";
import type { Warship, WarshipsResponse } from "./types";

export const WarshipsList: FC = () => {
  const [loading, setLoading] = useState(false);
  const [warshipsList, setWarshipsList] = useState<Warship[]>([]);
  const [nationOptions, setNationOptions] = useState<SelectOption[]>([]);
  const [levelOptions, setLevelOptions] = useState<SelectOption[]>([]);
  const [typeOptions, setTypeOptions] = useState<SelectOption[]>([]);
  const [selectedNations, setSelectedNations] = useState<SelectOption[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<SelectOption[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<SelectOption[]>([]);
  const filteredWarshipsList = useMemo(
    () =>
      warshipsList.filter(
        (i) =>
          (!selectedNations.length ? true : !!selectedNations.find((j) => j.value === i.nation.name)) &&
          (!selectedLevels.length ? true : !!selectedLevels.find((j) => j.value === i.level)) &&
          (!selectedTypes.length ? true : !!selectedTypes.find((j) => j.value === i.type.name)),
      ),
    [warshipsList, selectedNations, selectedLevels, selectedTypes],
  );

  useEffect(() => {
    getWarshipsList();
  }, []);

  const getWarshipsList = async () => {
    try {
      setLoading(true);
      const warshipsResponse: WarshipsResponse = await request("https://vortex.korabli.su/api/graphql/glossary/", warshipsQuery);
      const formattedWarshipsList: Warship[] = [];
      const nationsSet = new Set<string>();
      const levelsSet = new Set<number>();
      const typesSet = new Set<string>();
      for (const warship of warshipsResponse.vehicles) {
        formattedWarshipsList.push({
          ...warship,
          icons: {
            large: `${HTTP_BASE}${warship.icons.large}`,
            medium: `${HTTP_BASE}${warship.icons.medium}`,
          },
        });
        nationsSet.add(warship.nation.name);
        levelsSet.add(warship.level);
        typesSet.add(warship.type.name);
      }
      setWarshipsList(formattedWarshipsList);
      setNationOptions(
        Array.from(nationsSet)
          .sort()
          .map((i) => ({ label: i, value: i })),
      );
      setLevelOptions(
        Array.from(levelsSet)
          .sort((a, b) => a - b)
          .map((i) => ({ label: i, value: i })),
      );
      setTypeOptions(
        Array.from(typesSet)
          .sort()
          .map((i) => ({ label: i, value: i })),
      );
    } catch (e: any) {
      // можно какой-нибудь попап добавить с ошибкой или просто какой-то текст
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Здесь отлично бы смотрелась виртуализация для списка
    <Container>
      <Select
        options={nationOptions}
        value={selectedNations}
        onChange={(opt) => setSelectedNations(opt as SelectOption[])}
        placeholder="Select nations"
        isMulti
      />
      <Select
        options={levelOptions}
        value={selectedLevels}
        onChange={(opt) => setSelectedLevels(opt as SelectOption[])}
        placeholder="Select levels"
        isMulti
      />
      <Select
        options={typeOptions}
        value={selectedTypes}
        onChange={(opt) => setSelectedTypes(opt as SelectOption[])}
        placeholder="Select types"
        isMulti
      />
      {!!filteredWarshipsList.length ? (
        filteredWarshipsList.map((i, ind) => (
          // Было бы лучше использовать какой-нибудь уникальный айдишник для key
          <Card item={i} key={ind} />
        ))
      ) : (
        // Можно сделать глобальный лодуер с помощью Redux выносом состояния лоудера на уровень App и сам компонент туда же
        <Loader loading={loading} />
      )}
    </Container>
  );
};
