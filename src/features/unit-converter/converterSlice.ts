import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';


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
};

const initialState: UnitConverterState = {
  facts: [],
  queryAnswer: undefined,
};

export const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    addFact: (state, action: PayloadAction<Fact>) => {
      // TODO: implement
    },
    convertUnit: (state, action: PayloadAction<Query>) => {
      // TODO: implement
    },
  },
});

export default converterSlice.reducer;
export const { addFact, convertUnit } = converterSlice.actions;
