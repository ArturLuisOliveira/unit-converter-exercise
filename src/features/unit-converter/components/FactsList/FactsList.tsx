import { useSelector } from "react-redux";
import { Fact, UnitConverterState } from "../../converterSlice";

export const FactsList = () => {
  const facts = useSelector<{ converter: UnitConverterState }, Fact[]>(
    (state) => state.converter.facts
  );
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
