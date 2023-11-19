import { useMemo } from "react";

import { useFacts } from "../../../hooks";

export const useUnits = () => {
  const facts = useFacts();
  const units = useMemo(
    () =>
      [
        "",
        ...new Set(
          facts.reduce((acc, cur) => [...acc, cur.from, cur.to], [] as string[])
        ),
      ].sort((a, b) => a.localeCompare(b)),
    [facts]
  );

  return units;
};
