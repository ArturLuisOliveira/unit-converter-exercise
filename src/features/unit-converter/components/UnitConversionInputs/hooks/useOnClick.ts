import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { convertUnit } from "../../../converterSlice";

export const useOnClick = ({
  from,
  to,
  value,
  setFrom,
  setTo,
  setValue,
}: {
  from: string;
  to: string;
  value: string;
  setFrom: (from: string) => void;
  setTo: (to: string) => void;
  setValue: (value: string) => void;
}) => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(convertUnit({ from, to, value: Number(value) }));
  }, [from, to, value, convertUnit, setFrom, setTo, setValue]);

  return onClick;
};
