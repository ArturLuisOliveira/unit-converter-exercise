import converterReducer, {
  UnitConverterState,
  Fact,
  Query,
  addFact,
  convertUnit,
} from './converterSlice';

describe('converter reducer', () => {
  const initialState: UnitConverterState = {
    facts: [],
  };
  it('should handle initial state', () => {
    expect(converterReducer(undefined, { type: 'unknown' })).toEqual({ facts: [] });
  });

  it('should handle adding facts', () => {
    const firstFact: Fact = { from: 'm', to: 'cm', ratio: 100 }
    const oneFact = converterReducer(initialState, addFact(firstFact));
    expect(oneFact.facts).toContain(firstFact);

    const secondFact: Fact = { from: 'ft', to: 'in', ratio: 12 };
    const twoFacts = converterReducer(oneFact, addFact(secondFact));
    expect(twoFacts.facts).toContain(firstFact);
    expect(twoFacts.facts).toContain(secondFact);
  });

  it('should handle converting units direct', () => {
    const oneFact = converterReducer(initialState, addFact({ from: 'm', to: 'cm', ratio: 100 }));
    const actual = converterReducer(oneFact, convertUnit({ from: 'm', to: 'cm', value: 2 }));
    expect(actual.queryAnswer).toEqual(200);
  });

  it('should handle unconvertible units', () => {
    const oneFact = converterReducer(initialState, addFact({ from: 'm', to: 'cm', ratio: 100 }));
    const twoFacts = converterReducer(oneFact, addFact({ from: 'min', to: 'hr', ratio: 60 }));
    const actual = converterReducer(twoFacts, convertUnit({ from: 'm', to: 'min', value: 1 }));
    expect(actual.queryAnswer).toEqual(undefined);
  });

  it('should handle converting units inverse', () => {
    const oneFact = converterReducer(initialState, addFact({ from: 'm', to: 'cm', ratio: 100 }));
    const actual = converterReducer(oneFact, convertUnit({ from: 'cm', to: 'm', value: 1 }));
    expect(actual.queryAnswer).toEqual(.01);
  });

  it('should handle converting units with intermediate', () => {
    const oneFact = converterReducer(initialState, addFact({ from: 'm', to: 'cm', ratio: 100 }));
    const twoFacts = converterReducer(oneFact, addFact({ from: 'cm', to: 'mm', ratio: 10 }));
    const actual = converterReducer(twoFacts, convertUnit({ from: 'm', to: 'mm', value: 2 }));
    expect(actual.queryAnswer).toEqual(2000);
  });

  it.only('should handle converting units with multiple intermediates', () => {
    const oneFact = converterReducer(initialState, addFact({ from: 'km', to: 'm', ratio: 1000 }));
    const twoFacts = converterReducer(oneFact, addFact({ from: 'm', to: 'cm', ratio: 100 }));
    const treeFacts = converterReducer(twoFacts, addFact({ from: 'cm', to: 'mm', ratio: 10 }));
    const actual = converterReducer(treeFacts, convertUnit({ from: 'km', to: 'mm', value: 1 }));
    expect(actual.queryAnswer).toEqual(1e+6);
  });
});
