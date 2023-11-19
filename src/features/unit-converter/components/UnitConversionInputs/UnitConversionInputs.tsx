import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UnitConverterState, convertUnit } from "../../converterSlice";
import { useFacts } from "../../hooks";

export const UnitConversionInputs = () => {
  const queryAnswer = useSelector<
    { converter: UnitConverterState },
    number | undefined
  >((state) => state.converter.queryAnswer);
  const facts = useFacts();
  const froms = useMemo(() => ["", ...facts.map((fact) => fact.from)], [facts]);
  const tos = useMemo(() => ["", ...facts.map((fact) => fact.to)], [facts]);
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
          {froms.map((from) => (
            <option value={from}>{from}</option>
          ))}
        </select>
      </label>
      <label>
        to:
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          {tos.map((to) => (
            <option value={to}>{to}</option>
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
