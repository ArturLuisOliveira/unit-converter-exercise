import { useCallback, useEffect, useState } from "react";
import { Fact, UnitConverterState, addFact } from "../../converterSlice";
import { useDispatch, useSelector } from "react-redux";

/**
 * @todo add input validation
 * @todo improve styling
 */
export const AddFactsInputs = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [ratio, setRatio] = useState("");
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(addFact({ from, to, ratio: Number(ratio) }));
  }, [addFact, from, to, ratio]);

  const facts = useSelector<{ converter: UnitConverterState }, Fact[]>(
    (state) => state.converter.facts
  );
  useEffect(() => {
    console.log({ facts });
  }, [facts]);
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

      <button onClick={onClick}>Add Fact</button>
    </>
  );
};
