import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Graph, pathTo } from "./helpers/Graph";

export type Fact = {
  from: string;
  to: string;
  ratio: number;
};

export type Query = {
  from: string;
  to: string;
  value: number;
};

export interface UnitConverterState {
  facts: Fact[];
  queryAnswer?: number;
}

const initialState: UnitConverterState = {
  facts: [],
  queryAnswer: undefined,
};

export const converterSlice = createSlice({
  name: "converter",
  initialState,
  reducers: {
    addFact: (state, action: PayloadAction<Fact>) => {
      return { ...state, facts: [...state.facts, action.payload] };
    },
    convertUnit: (state, action: PayloadAction<Query>) => {
      const { from, to, value } = action.payload;

      const graph = new Graph<string, { ratio: number; operand: "/" | "*" }>();
      state.facts.forEach(({ from, to, ratio }) => {
        graph.addVertex({ value: from });
        graph.addVertex({ value: to });
        graph.addEdge({ from, to, data: { ratio, operand: "*" } });
        graph.addEdge({ from: to, to: from, data: { ratio, operand: "/" } });
      });

      const path = pathTo({ from, to, graph });

      if (path == null || path?.length < 1) return state;

      let queryAnswer = value;
      for (let i = 0; i < path?.length - 1; i++) {
        const neighbors = graph.adjacencyList.get(path[i]);
        const next = neighbors?.get(path[i + 1]);
        if (next == null) return state;
        if (next.operand == "*") queryAnswer = queryAnswer * next.ratio;
        if (next.operand == "/") queryAnswer = queryAnswer / next.ratio;
      }
      return { ...state, queryAnswer };
    },
  },
});

export default converterSlice.reducer;
export const { addFact, convertUnit } = converterSlice.actions;
