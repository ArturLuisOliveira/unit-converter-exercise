import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      // TODO: implement
      return { ...state, facts: [...state.facts, action.payload] };
    },
    convertUnit: (state, action: PayloadAction<Query>) => {
      // TODO: implement
      const { from, to, value } = action.payload;

      //in-order case
      const fact = state.facts.find((f) => f.from === from && f.to === to);
      const queryAnswer = fact ? value * fact.ratio : undefined;
      if (fact) return { ...state, queryAnswer };

      //inverse case
      const inverseFact = state.facts.find(
        (f) => f.from === to && f.to === from
      );
      const inverseQueryAnswer = inverseFact
        ? value / inverseFact.ratio
        : undefined;
      if (inverseFact) return { ...state, queryAnswer: inverseQueryAnswer };

      //units with intermediate
      //todo: improve this, currently it only accepts only one intermediate
      const fromFacts = state.facts.filter((f) => f.from === from);
      const toFacts = state.facts.filter((f) => f.to === to);
      const intermediate = fromFacts.find((f) =>
        toFacts.some((t) => t.from === f.to)
      );
      if (!intermediate) return { ...state, queryAnswer: undefined };
      const intermediateFact = state.facts.find(
        (f) => f.from === intermediate.to && f.to === to
      );
      const intermediateQueryAnswer = intermediateFact
        ? value * intermediate.ratio * intermediateFact.ratio
        : undefined;
      if (intermediateFact)
        return { ...state, queryAnswer: intermediateQueryAnswer };

      return state;
    },
  },
});

export default converterSlice.reducer;
export const { addFact, convertUnit } = converterSlice.actions;
