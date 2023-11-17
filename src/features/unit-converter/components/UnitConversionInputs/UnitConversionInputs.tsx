import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UnitConverterState, convertUnit } from "../../converterSlice";

/**
 * @todo add input validation
 * @todo improve styling
 */
export const UnitConversionInputs = () => {
  const queryAnswer = useSelector<
    { converter: UnitConverterState },
    number | undefined
  >((state) => state.converter.queryAnswer);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(convertUnit({ from, to, value: Number(value) }));
  }, [from, to, value, convertUnit]);

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

      <button onClick={onClick}>Convert</button>
      <h6>{queryAnswer}</h6>
    </>
  );
};
