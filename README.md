# TEST REACT HOOKS
## 1. Task
Build a react hook that a programmer can use to toggle between n arbitrary states where n >= 1. I can feed the hook a set of possible states and an initial state. It returns the current state and a function to let me set a new state.
Use Typescript and write a test suite for it using jest.

## 2. Installation
1. Clone or download repository
2. Install dependencies `npm i` or `yarn`

## 3. Usage

1. Import `useStateHook` hook from [src/hooks/use-state-hook](src/hooks/use-state-hook.ts)
2. Use `useStateHook` hook like any other hook (Yo can read more about <a href="https://uk.reactjs.org/docs/hooks-reference.html">React hooks</a>)
Example:
```typescript
const [state, setState] = useStateHook({ states, initialState });
```

## 4. Test cases
1. Should throw an error, if state list is empty.
2. Should throw an error, if at least one state value in not a number.
3. Should throw an error, if at least one state value less than one.
4. Should set first possible state, if initial state is not from the list of states.
5. Should set initial state correctly.
6. Should change current state if new state is valid.
7. Should not change current state if new state is invalid.
