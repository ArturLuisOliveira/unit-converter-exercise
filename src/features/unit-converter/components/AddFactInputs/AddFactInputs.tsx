import { useState } from "react";

import { useDisabled, useOnClick } from "./hooks";

export const AddFactsInputs = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [ratio, setRatio] = useState("");
  const onClick = useOnClick({ from, to, ratio, setFrom, setRatio, setTo });
  const disabled = useDisabled({ from, ratio, to });

  return (
    <>
      <h4>Add Fact</h4>
      <label>
        from:
        <input value={from} onChange={(e) => setFrom(e.target.value)} />
      </label>
      <label>
        to:
        <input value={to} onChange={(e) => setTo(e.target.value)} />
      </label>
      <label>
        ratio:
        <input value={ratio} onChange={(e) => setRatio(e.target.value)} />
      </label>

      <button onClick={onClick} disabled={disabled}>
        Add Fact
      </button>
    </>
  );
};
