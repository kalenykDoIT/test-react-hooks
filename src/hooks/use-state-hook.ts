import { useState, useCallback } from "react";

export type SetStateFunc<T> = [T, (value: T) => void];
export interface ISetStateArg<T> {
    states: T[];
    initialState?: T;
}

export const useStateHook = <T>({ states, initialState }: ISetStateArg<T>) : SetStateFunc<T> => {
    if (!states || !Array.isArray(states) || !states.length) {
        throw new Error("States list can't be empty");
    }

    states.forEach(value => {
        if (typeof value !== "number") {
            throw new Error("Each states value should be a number");
        }
        if (value < 1) {
            throw new Error("Each states value should be >= 1");
        }
    })
    if (!states || !Array.isArray(states) || !states.length) {
        throw new Error("States list can't be empty");
    }

    const initialStateIndex = states.findIndex((value) => initialState === value);
    // if we didnt find initial state, using first value
    let initialIndex = initialStateIndex === -1 ? 0 : initialStateIndex;
    const [state, setState] = useState<T>(states[initialIndex]);

    const setNewState = useCallback(
        (newState: T): void => {
            if (!newState) {
                const index = initialIndex + 1 >= states.length ? 0 : initialIndex + 1;

                initialIndex++;
                setState(states[index]);
            } else {
                const index = states.findIndex((value) => value === newState);

                if (index === -1) return;
                initialIndex = index;
                setState(newState);
            }
        },
        [states]
    );

    return [state, setNewState];
};
