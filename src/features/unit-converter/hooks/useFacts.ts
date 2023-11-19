import { useSelector } from "react-redux";

import { Fact, UnitConverterState } from "../converterSlice";

export const useFacts = () => {
  const facts = useSelector<{ converter: UnitConverterState }, Fact[]>(
    (state) => state.converter.facts
  );

  return facts;
};
