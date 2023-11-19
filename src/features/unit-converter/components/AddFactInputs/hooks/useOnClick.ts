import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { addFact } from "../../../converterSlice";

export const useOnClick = ({
  from,
  to,
  ratio,
  setFrom,
  setRatio,
  setTo,
}: {
  from: string;
  to: string;
  ratio: string;
  setFrom: (from: string) => void;
  setTo: (to: string) => void;
  setRatio: (ratio: string) => void;
}) => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(addFact({ from, to, ratio: Number(ratio) }));
    setFrom("");
    setTo("");
    setRatio("");
  }, [addFact, from, to, ratio, setFrom, setTo, setRatio]);

  return onClick;
};
