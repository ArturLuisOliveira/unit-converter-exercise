import { useMemo } from "react";

import { useFacts } from "../hooks";

export const FactsList = () => {
  const facts = useFacts();
  const isEmpty = useMemo(() => facts.length < 1, [facts]);

  if (isEmpty) return <h6>Add facts to see the list of facts</h6>;

  return (
    <>
      <h4>Facts</h4>
      <table>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Ratio</th>
        </tr>
        {facts.map(({ from, to, ratio }) => (
          <tr>
            <td>{from}</td>
            <td>{to}</td>
            <td>{ratio}</td>
          </tr>
        ))}
      </table>
    </>
  );
};
