import { useState } from "react";

import { useQueryAnswer } from "../../hooks";
import { useDisabled, useOnClick, useUnits } from "./hooks";

export const UnitConversionInputs = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [value, setValue] = useState("");
  const units = useUnits();
  const queryAnswer = useQueryAnswer();
  const disabled = useDisabled({ from, to, value });
  const onClick = useOnClick({ from, setFrom, setTo, setValue, to, value });

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
