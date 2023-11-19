import { useSelector } from "react-redux";

import { UnitConverterState } from "../converterSlice";

export const useQueryAnswer = () => {
  const queryAnswer = useSelector<
    { converter: UnitConverterState },
    number | undefined
  >((state) => state.converter.queryAnswer);

  return queryAnswer;
};
