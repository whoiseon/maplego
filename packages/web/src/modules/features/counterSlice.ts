import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    reset: () => initialState,
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
  },
});

/** reselector */
const valueSelector = (state: RootState): number =>
  state.counter.value || initialState.value;

/**
 * createSelector는 n개의 파라미터를 받는다.
 * n - 1 번째 파라미터까지는 valueSelector와 같은 state를 받는다.
 * 마지막 n 번째 파라미터는 함수 형태로 넣어주는데 이 함수 리턴값이
 * 사용하고자 하는 새롭게 추론된 state이다.
 *
 * 주의할 점은 n - 1번 까지 넣어준 파라미터의 순서와
 * n 번째 마지막 파라미터 함수의 인자로 들어오는 순서는 똑같다.
 */
export const countSelector = createSelector(valueSelector, (value) => value);

export const {
  increment,
  incrementByAmount,
  decrement,
  decrementByAmount,
  reset,
} = counterSlice.actions;

export default counterSlice.reducer;
