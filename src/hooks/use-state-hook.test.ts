import { renderHook, act } from "@testing-library/react-hooks";
import { useStateHook } from "./use-state-hook";

describe("Use state hook test cases", () => {
  it("Should throw an error, if state list is empty", () => {
    const { result } = renderHook(() => useStateHook({ states: [] }));

    expect(result.error).toBeDefined();
    expect(result.error.message).toBe("States list can't be empty");
  });

  it("Should throw an error, if at least one state value in not a number", () => {
    const testState = [100, 1, 'a', 66, 55, 78, 12, 16];

    const { result } = renderHook(() => useStateHook({ states: testState }));

    expect(result.error).toBeDefined();
    expect(result.error.message).toBe("Each states value should be a number");
  });

  it("Should throw an error, if at least one state value less than one", () => {
    const testState = [100, 1, -2, 66, 55, 78, 12, 16];

    const { result } = renderHook(() => useStateHook({ states: testState }));

    expect(result.error).toBeDefined();
    expect(result.error.message).toBe("Each states value should be >= 1");
  });


  it("Should set first possible state, if initial state is not from the list of states", () => {
    const testState = [100, 1, 22, 66, 55, 78, 12, 16];
    const { result: resultNumbers } = renderHook(() =>
      useStateHook({ states: testState as number[] })
    );

    expect(resultNumbers.current[0]).toEqual(testState[0]);
  });

  it("Should set initial state correctly", () => {
    const testState = [100, 1, 22, 66, 55, 78, 12, 16];
    const { result } = renderHook(() =>
        useStateHook({
          states: testState,
          initialState: testState[0],
        })
    );
    expect(result.current[0]).toEqual(testState[0]);
  });

  it("Should change current state if new state is valid", () => {
    const testState = [100, 1, 22, 66, 55, 78, 12, 16];
    const { result } = renderHook(() =>
      useStateHook({
        states: testState,
        initialState: testState[0],
      })
    );

    testState.forEach(value => {
      act(() => result.current[1](value));
      expect(result.current[0]).toEqual(value);
    })
  });

  it("Should not change current state if new state is invalid", () => {
    const testState = [100, 1, 22, 66, 55, 78, 12, 16];
    const { result } = renderHook(() =>
        useStateHook({
          states: testState,
          initialState: 3,
        })
    );
    act(() => result.current[1](3));
    expect(result.current[0]).toEqual(testState[0]);
  });

});
