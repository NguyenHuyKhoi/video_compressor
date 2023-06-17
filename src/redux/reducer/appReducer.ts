import {createSlice} from '@reduxjs/toolkit';
export interface AppState {}
const initialState: AppState = {};
const slice = createSlice({
  name: 'APP_STATE',
  initialState: initialState,
  reducers: {
    // onSetToken: (state, {payload}: PayloadAction<string>) => {
    //   state.token = payload;
    // },
  },
});
const appReducer = slice.reducer;
export default appReducer;
export const {} = slice.actions;
