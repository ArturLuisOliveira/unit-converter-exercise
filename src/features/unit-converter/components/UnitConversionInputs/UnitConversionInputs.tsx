import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UnitConverterState, convertUnit } from "../../converterSlice";

export const UnitConversionInputs = () => {
  const queryAnswer = useSelector<
    { converter: UnitConverterState },
    number | undefined
  >((state) => state.converter.queryAnswer);
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
    setFrom("");
    setTo("");
    setValue("");
  }, [from, to, value, convertUnit, setFrom, setTo, setValue]);

  return (
    <>
      <h4>Unit Conversion</h4>

      <label>
        from:
        <input value={from} onChange={(e) => setFrom(e.target.value)} />
      </label>
      <label>
        to:
        <input value={to} onChange={(e) => setTo(e.target.value)} />
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
