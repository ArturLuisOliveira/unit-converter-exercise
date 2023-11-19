import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { convertUnit } from "../converterSlice";
import { useFacts, useQueryAnswer } from "../hooks";

export const UnitConversionInputs = () => {
  const queryAnswer = useQueryAnswer();
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
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const disabled = useMemo(() => {
    if (!from || !to || !value) return true;
    if (Number.isNaN(Number(value))) return true;
    return false;
  }, [from, to, value]);
  const onClick = useCallback(() => {
    dispatch(convertUnit({ from, to, value: Number(value) }));
  }, [from, to, value, convertUnit, setFrom, setTo, setValue]);

  return (
    <>
      <h4>Unit Conversion</h4>

      <label>
        from:
        <select value={from} onChange={(e) => setFrom(e.target.value)}>
          {units.map((unit) => (
            <option value={unit}>{unit}</option>
          ))}
        </select>
      </label>
      <label>
        to:
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          {units.map((unit) => (
            <option value={unit}>{unit}</option>
          ))}
        </select>
      </label>
      <label>
        value:
        <input value={value} onChange={(e) => setValue(e.target.value)} />
      </label>

      <button disabled={disabled} onClick={onClick}>
        Convert
      </button>
      <h6>{queryAnswer}</h6>
    </>
  );
};
