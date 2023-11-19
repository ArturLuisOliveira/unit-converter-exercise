import { useCallback, useMemo, useState } from "react";
import { addFact } from "../../converterSlice";
import { useDispatch } from "react-redux";

export const AddFactsInputs = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [ratio, setRatio] = useState("");
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(addFact({ from, to, ratio: Number(ratio) }));
    setFrom("");
    setTo("");
    setRatio("");
  }, [addFact, from, to, ratio, setFrom, setTo, setRatio]);

  const disabled = useMemo(() => {
    if (!from || !to || !ratio) return true;
    if (Number.isNaN(Number(ratio))) return true;
    return false;
  }, [from, to, ratio]);

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
